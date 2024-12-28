import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export default function Search() {
  const router = useRouter();
  const { q: searchQuery } = router.query;

  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dateFilter, setDateFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [sources, setSources] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      const API_URL = `https://newsapi.org/v2/top-headlines?country=us&q=${encodeURIComponent(searchQuery)}&apiKey=${API_KEY}&page=${currentPage}`;
      
      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          const filteredArticles = data.articles.filter(article => article.title !== '[Removed]');
          setNews(filteredArticles);
          setTotalPages(Math.ceil(data.totalResults / 20));
          
          const uniqueSources = [...new Set(filteredArticles.map(article => article.source.name))];
          setSources(uniqueSources);
        })
        .catch((error) => console.error('Error fetching news:', error));
    }
  }, [searchQuery, currentPage]);

  const filterNewsByDate = (articles) => {
    if (dateFilter === 'all') return articles;
    
    const now = new Date();
    const filterDate = new Date();
    
    switch(dateFilter) {
      case 'today':
        filterDate.setDate(now.getDate() - 1);
        break;
      case 'week':
        filterDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        filterDate.setMonth(now.getMonth() - 1);
        break;
    }
    
    return articles.filter(article => new Date(article.publishedAt) >= filterDate);
  };

  const filteredNews = filterNewsByDate(news).filter(article => 
    sourceFilter === 'all' || article.source.name === sourceFilter
  );

  const changePage = (page) => {
    setCurrentPage(page);
  };

  if (!searchQuery) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Search results for: &quot;{searchQuery}&quot;
        </h1>

        {/* Filters - Moved to top for mobile */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <h2 className="text-lg font-bold mb-4">Filters</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Date Filter */}
              <div>
                <h3 className="text-sm font-semibold mb-2">Date</h3>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="today">Last 24 Hours</option>
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                </select>
              </div>

              {/* Source Filter */}
              <div>
                <h3 className="text-sm font-semibold mb-2">Source</h3>
                <select 
                  className="w-full p-2 border rounded-md"
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

        {/* News Grid */}
        <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
          {filteredNews.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row border border-gray-200"
            >
              <div className="relative w-full md:w-48 h-48 md:h-auto flex-shrink-0">
                {article.urlToImage ? (
                  <Image
                    src={article.urlToImage}
                    alt={article.title}
                    width={200}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-gray-800">
                    {article.title}
                  </h2>
                  <span className="text-xs text-gray-500 ml-2">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 flex-grow">
                  {article.description}
                </p>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <span className="text-sm text-gray-500">
                    Source: {article.source.name}
                  </span>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-300 text-center"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 space-x-1">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => changePage(index + 1)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${
                currentPage === index + 1
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 