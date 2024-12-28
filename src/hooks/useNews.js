import { useState, useEffect, useCallback } from 'react';

// Haber yönetimi için özel hook
export default function useNews(category) {
  // State tanımlamaları
  const [originalNews, setOriginalNews] = useState([]); // Orijinal haber verileri
  const [news, setNews] = useState([]); // Filtrelenmiş ve sayfalanmış haberler
  const [currentPage, setCurrentPage] = useState(1); // Mevcut sayfa
  const [totalPages, setTotalPages] = useState(1); // Toplam sayfa sayısı
  const [dateFilter, setDateFilter] = useState('all'); // Tarih filtresi
  const [sourceFilter, setSourceFilter] = useState('all'); // Kaynak filtresi
  const [sources, setSources] = useState([]); // Haber kaynakları listesi
  const [isLoading, setIsLoading] = useState(true); // Yükleniyor durumu
  const [searchTerm, setSearchTerm] = useState(''); // Arama terimi
  const [totalResults, setTotalResults] = useState(0); // Toplam sonuç sayısı

  // Sayfa başına gösterilecek haber sayısı
  const ITEMS_PER_PAGE = 20;

  // API URL oluşturma
  const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  const API_URL = `https://newsapi.org/v2/top-headlines?country=us${category ? `&category=${category}` : ''}${searchTerm ? `&q=${encodeURIComponent(searchTerm)}` : ''}&apiKey=${API_KEY}`;

  // Haberleri filtrele
  const filterNews = useCallback((articles) => {
    if (!articles || !Array.isArray(articles)) return [];
    
    let filtered = [...articles];

    // Tarih filtreleme
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch(dateFilter) {
        case 'today':
          filterDate.setHours(now.getHours() - 24); // Son 24 saat
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7); // Son 1 hafta
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1); // Son 1 ay
          break;
        default:
          break;
      }
      
      filtered = filtered.filter(article => {
        const articleDate = new Date(article.publishedAt);
        return articleDate >= filterDate && articleDate <= now;
      });
    }

    // Kaynak filtreleme
    if (sourceFilter !== 'all') {
      filtered = filtered.filter(article => 
        article?.source?.name === sourceFilter
      );
    }

    return filtered;
  }, [dateFilter, sourceFilter]);

  // Sayfalama işlemi
  const paginateNews = useCallback((articles) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return articles.slice(startIndex, endIndex);
  }, [currentPage]);

  // Filtreleme ve sayfalama değişikliklerini izle
  useEffect(() => {
    const filteredNews = filterNews(originalNews);
    setTotalResults(filteredNews.length);
    setTotalPages(Math.ceil(filteredNews.length / ITEMS_PER_PAGE));
    const paginatedResults = paginateNews(filteredNews);
    setNews(paginatedResults);

    // Debug bilgilerini yazdır
    console.group(`Kategori: ${category}`);
    console.log('Orijinal Haber Sayısı:', originalNews.length);
    console.log('Filtrelenmiş Haber Sayısı:', filteredNews.length);
    console.log('Sayfa Başına Haber:', ITEMS_PER_PAGE);
    console.log('Mevcut Sayfa:', currentPage);
    console.log('Toplam Sayfa:', Math.ceil(filteredNews.length / ITEMS_PER_PAGE));
    console.log('Tarih Filtresi:', dateFilter);
    console.log('Kaynak Filtresi:', sourceFilter);
    console.log('Gösterilen Haberler:', paginatedResults);
    console.groupEnd();

  }, [originalNews, dateFilter, sourceFilter, currentPage, filterNews, paginateNews, category]);

  // API'den haberleri çek
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}&pageSize=100`);
        const data = await response.json();
        
        if (data && data.articles) {
          // Geçersiz haberleri filtrele
          const validArticles = data.articles.filter(article => 
            article.title !== '[Removed]' && 
            article.urlToImage && 
            article.description
          );
            
          setOriginalNews(validArticles);
          const uniqueSources = [...new Set(validArticles.map(article => article.source.name))];
          setSources(uniqueSources);

          // API yanıtını yazdır
          console.group(`API Yanıtı - ${category}`);
          console.log('Ham Veri:', data.articles);
          console.log('Geçerli Haberler:', validArticles);
          console.log('Benzersiz Kaynaklar:', uniqueSources);
          console.groupEnd();
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setOriginalNews([]);
        setSources([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [API_URL, category]);

  // Arama terimini güncelle
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Aramada ilk sayfaya dön
  }, []);

  // Sayfanın en üstüne kaydır
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Sayfa değiştirme işlemi
  const changePage = useCallback((page) => {
    setCurrentPage(page);
    scrollToTop();
  }, []);

  // Hook'un dışa aktardığı değerler ve fonksiyonlar
  return {
    news,
    currentPage,
    totalPages,
    dateFilter,
    sourceFilter,
    sources,
    isLoading,
    totalResults,
    setDateFilter,
    setSourceFilter,
    changePage,
    handleSearch
  };
} 