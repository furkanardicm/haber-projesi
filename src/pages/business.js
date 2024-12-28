import NewsCard from '../components/NewsCard';
import NewsCardSkeleton from '../components/NewsCardSkeleton';
import NewsFilters from '../components/NewsFilters';
import Pagination from '../components/Pagination';
import NoNews from '../components/NoNews';
import useNews from '../hooks/useNews';

export default function Business() {
  const {
    news,
    currentPage,
    totalPages,
    dateFilter,
    sourceFilter,
    sources,
    isLoading,
    setDateFilter,
    setSourceFilter,
    changePage
  } = useNews('business');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row gap-6">
          <NewsFilters
            dateFilter={dateFilter}
            sourceFilter={sourceFilter}
            sources={sources}
            isLoading={isLoading}
            onDateFilterChange={setDateFilter}
            onSourceFilterChange={setSourceFilter}
          />

          <div className="flex-1">
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {isLoading ? (
                [...Array(5)].map((_, index) => (
                  <NewsCardSkeleton key={index} />
                ))
              ) : news.length === 0 ? (
                <NoNews />
              ) : (
                news.map((article, index) => (
                  <NewsCard key={index} article={article} />
                ))
              )}
            </div>

            {news.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                isLoading={isLoading}
                onPageChange={changePage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 