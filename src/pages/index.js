import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import NoNews from '../components/NoNews';

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

// Boş resim bileşeni
const EmptyImage = ({ className = "h-full w-full" }) => (
  <div className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}>
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-20 w-20 text-gray-400 dark:text-gray-500" 
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path 
        fillRule="evenodd" 
        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
        clipRule="evenodd" 
      />
    </svg>
  </div>
);

const NewsCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col sm:flex-row border border-gray-200 animate-pulse">
    <div className="relative w-full sm:w-48 h-48 sm:h-full flex-shrink-0 bg-gray-200" />
    <div className="p-4 flex flex-col flex-1 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start">
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-20 mt-2 sm:mt-0" />
      </div>
      <div className="space-y-2 flex-grow">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="h-4 bg-gray-200 rounded w-32" />
        <div className="h-8 bg-gray-200 rounded w-full sm:w-24" />
      </div>
    </div>
  </div>
);

export default function Home() {
  const [allNews, setAllNews] = useState([]);
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sliderNews, setSliderNews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const ITEMS_PER_PAGE = 20;

  // Tüm verileri bir kerede çek
  useEffect(() => {
    const fetchAllNews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}&pageSize=100`);
        const data = await response.json();
        
        if (data && data.articles) {
          const filteredArticles = data.articles.filter(article => article.title !== '[Removed]');
          setAllNews(filteredArticles);
          
          // İlk 3 haberi slider için ayır
          setSliderNews(filteredArticles.slice(0, 3));
          
          // Toplam sayfa sayısını hesapla (slider hariç)
          const remainingArticles = filteredArticles.slice(3);
          setTotalPages(Math.max(1, Math.ceil(remainingArticles.length / ITEMS_PER_PAGE)));
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setAllNews([]);
        setSliderNews([]);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllNews();
  }, []);

  // Sayfa değiştiğinde haberleri güncelle
  useEffect(() => {
    if (allNews.length === 0) return;

    const remainingArticles = allNews.slice(3); // Slider haberlerini çıkar
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    
    setNews(remainingArticles.slice(startIndex, endIndex));
  }, [currentPage, allNews]);

  const changePage = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const nextSlide = useCallback(() => {
    if (sliderNews.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % sliderNews.length);
    }
  }, [sliderNews]);

  const prevSlide = useCallback(() => {
    if (sliderNews.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + sliderNews.length) % sliderNews.length);
    }
  }, [sliderNews]);

  // Slider otomatik geçiş için useEffect
  useEffect(() => {
    if (sliderNews.length === 0) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 10000); // 10 saniye

    // Component unmount olduğunda timer'ı temizle
    return () => clearInterval(timer);
  }, [sliderNews, nextSlide]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-theme duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Featured News Slider */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 animate-fade-in">
          <div className="relative h-[400px]">
            {isLoading ? (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            ) : (
              <>
                {sliderNews[currentSlide]?.urlToImage ? (
                  <Image
                    src={sliderNews[currentSlide].urlToImage}
                    alt={sliderNews[currentSlide]?.title}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <EmptyImage />
                )}

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">{sliderNews[currentSlide]?.title}</h2>
                  <p className="text-gray-200">{sliderNews[currentSlide]?.description}</p>
                  
                  {/* Slider Dots */}
                  <div className="flex justify-center space-x-2 mt-4">
                    {sliderNews.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          currentSlide === index 
                            ? 'bg-white scale-110' 
                            : 'bg-white/50 hover:bg-white/70'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <button 
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/75 text-white rounded-full flex items-center justify-center transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/75 text-white rounded-full flex items-center justify-center transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {isLoading ? (
            [...Array(6)].map((_, index) => (
              <NewsCardSkeleton key={index} />
            ))
          ) : news.length === 0 ? (
            <NoNews />
          ) : (
            news.map((article, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col sm:flex-row border border-gray-200 dark:border-gray-700 animate-slide-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative w-full sm:w-48 h-48 sm:h-full flex-shrink-0">
                  {article.urlToImage ? (
                    <Image
                      src={article.urlToImage}
                      alt={article.title}
                      layout="fill"
                      objectFit="cover"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <EmptyImage />
                  )}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-0">
                      {article.title}
                    </h2>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow text-sm sm:text-base">
                    {article.description}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Source: {article.source.name}
                    </span>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 dark:bg-blue-500/70 dark:hover:bg-blue-600/80 transition-colors duration-300 text-center"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-center mt-6 sm:mt-8 space-x-1 overflow-x-auto pb-2">
          <button
            onClick={() => changePage(Math.max(1, currentPage - 1))}
            disabled={isLoading || currentPage === 1}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${
              currentPage === 1 || isLoading
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          {[...Array(totalPages)].map((_, index) => {
            if (
              index === 0 ||
              index === totalPages - 1 ||
              (index >= currentPage - 2 && index <= currentPage) ||
              (index <= currentPage + 2 && index >= currentPage)
            ) {
              return (
                <button
                  key={index}
                  onClick={() => changePage(index + 1)}
                  disabled={isLoading}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 min-w-[2.5rem] ${
                    currentPage === index + 1
                      ? 'bg-blue-600 dark:bg-blue-500/70 text-white shadow-sm'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {index + 1}
                </button>
              );
            } else if (
              (index === 1 && currentPage - 2 > 1) ||
              (index === totalPages - 2 && currentPage + 2 < totalPages - 1)
            ) {
              return (
                <span key={index} className="px-2 py-1 text-gray-500 dark:text-gray-400">
                  ...
                </span>
              );
            }
            return null;
          })}

          <button
            onClick={() => changePage(Math.min(totalPages, currentPage + 1))}
            disabled={isLoading || currentPage === totalPages}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${
              currentPage === totalPages || isLoading
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}


