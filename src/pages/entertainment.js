import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=${API_KEY}`;

export default function Entertainment() {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dateFilter, setDateFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [sources, setSources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const filterNewsByDate = useCallback((articles) => {
    if (!articles || !Array.isArray(articles)) return [];
    if (dateFilter === 'all') return articles;
    
    const now = new Date();
    const filterDate = new Date();
    
    switch(dateFilter) {
      case 'today':
        filterDate.setHours(now.getHours() - 24);
        break;
      case 'week':
        filterDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        filterDate.setMonth(now.getMonth() - 1);
        break;
      default:
        return articles;
    }
    
    return articles.filter(article => {
      const articleDate = new Date(article.publishedAt);
      return articleDate >= filterDate && articleDate <= now;
    });
  }, [dateFilter]);

  const updateTotalPages = useCallback((filtered) => {
    const totalFilteredResults = filtered.length;
    const calculatedPages = Math.ceil(totalFilteredResults / 10);
    setTotalPages(calculatedPages || 1);
    
    if (currentPage > calculatedPages) {
      setCurrentPage(1);
    }
  }, [currentPage]);

  const getPaginatedNews = useCallback((filteredNews) => {
    return filteredNews.slice((currentPage - 1) * 10, currentPage * 10);
  }, [currentPage]);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}&pageSize=100`);
        const data = await response.json();
        
        if (data && data.articles) {
          const filteredArticles = data.articles.filter(article => article.title !== '[Removed]');
          setNews(filteredArticles);
          const uniqueSources = [...new Set(filteredArticles.map(article => article.source.name))];
          setSources(uniqueSources);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setNews([]);
        setSources([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const filtered = filterNewsByDate(news || []).filter(article => 
      sourceFilter === 'all' || (article?.source?.name && article.source.name === sourceFilter)
    );
    updateTotalPages(filtered);
  }, [news, dateFilter, sourceFilter, filterNewsByDate, updateTotalPages]);

  const filteredNews = filterNewsByDate(news || []).filter(article => 
    sourceFilter === 'all' || (article?.source?.name && article.source.name === sourceFilter)
  );

  const paginatedNews = getPaginatedNews(filteredNews || []);

  const NewsCardSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md transition-shadow duration-300 overflow-hidden flex flex-col sm:flex-row border border-gray-200 dark:border-gray-700 animate-pulse">
      <div className="relative w-full sm:w-48 h-48 sm:h-full flex-shrink-0 bg-gray-200 dark:bg-gray-700" />
      <div className="p-4 flex flex-col flex-1 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mt-2 sm:mt-0" />
        </div>
        <div className="space-y-2 flex-grow">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6" />
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full sm:w-24" />
        </div>
      </div>
    </div>
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const changePage = (page) => {
    setCurrentPage(page);
    scrollToTop();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-full sm:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md transition-shadow duration-300 p-4 border border-gray-200 dark:border-gray-700 sticky top-4">
              <h2 className="text-lg font-bold mb-4 dark:text-white">Filters</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-sm font-semibold mb-2 dark:text-gray-300">Date</h3>
                  <select 
                    disabled={isLoading}
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  >
                    <option value="all">All Time</option>
                    <option value="today">Last 24 Hours</option>
                    <option value="week">Last Week</option>
                    <option value="month">Last Month</option>
                  </select>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-2 dark:text-gray-300">Source</h3>
                  <select 
                    disabled={isLoading}
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={sourceFilter}
                    onChange={(e) => setSourceFilter(e.target.value)}
                  >
                    <option value="all">All Sources</option>
                    {sources.map((source, index) => (
                      <option key={index} value={source}>{source}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {isLoading ? (
                [...Array(6)].map((_, index) => (
                  <NewsCardSkeleton key={index} />
                ))
              ) : (
                paginatedNews.map((article, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col sm:flex-row border border-gray-200 dark:border-gray-700"
                  >
                    <div className="relative w-full sm:w-48 h-48 sm:h-full flex-shrink-0">
                      <Image
                        src={article.urlToImage || '/images/placeholder.jpg'}
                        alt={article.title}
                        layout="fill"
                        objectFit="cover"
                        className="w-full h-full object-cover"
                      />
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
                          className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500/70 dark:hover:bg-blue-600/80 text-white text-sm font-medium rounded-md transition-colors duration-300 text-center"
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
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
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
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
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
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 