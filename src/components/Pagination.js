// Sayfalama bileşeni
export default function Pagination({ currentPage, totalPages, isLoading, onPageChange }) {
  return (
    <div className="flex justify-center mt-6 sm:mt-8 space-x-1 overflow-x-auto pb-2">
      {/* Önceki sayfa butonu */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
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

      {/* Sayfa numaraları */}
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
              onClick={() => onPageChange(index + 1)}
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

      {/* Sonraki sayfa butonu */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
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
  );
} 