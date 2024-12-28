// Haber filtreleme bileşeni
export default function NewsFilters({ dateFilter, sourceFilter, sources, isLoading, onDateFilterChange, onSourceFilterChange }) {
  return (
    <div className="w-full sm:w-64 flex-shrink-0">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md transition-shadow duration-300 p-4 border border-gray-200 dark:border-gray-700 sticky top-20">
        <h2 className="text-lg font-bold mb-4 dark:text-white">Filters</h2>
        <div className="flex flex-col gap-4">
          {/* Tarih filtresi */}
          <div>
            <h3 className="text-sm font-semibold mb-2 dark:text-gray-300">Date</h3>
            <select 
              disabled={isLoading}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={dateFilter}
              onChange={(e) => onDateFilterChange(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="today">Last 24 Hours</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>
          </div>

          {/* Kaynak filtresi */}
          <div>
            <h3 className="text-sm font-semibold mb-2 dark:text-gray-300">Source</h3>
            <select 
              disabled={isLoading}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={sourceFilter}
              onChange={(e) => onSourceFilterChange(e.target.value)}
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
  );
} 