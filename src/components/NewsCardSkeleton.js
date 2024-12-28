// Yükleme durumunda gösterilen iskelet bileşeni
export default function NewsCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md transition-shadow duration-300 overflow-hidden flex flex-col sm:flex-row border border-gray-200 dark:border-gray-700 animate-pulse">
      {/* Görsel alanı */}
      <div className="relative w-full sm:w-48 h-48 sm:h-full flex-shrink-0 bg-gray-200 dark:bg-gray-700" />

      {/* İçerik alanı */}
      <div className="p-4 flex flex-col flex-1 space-y-4">
        {/* Başlık ve tarih */}
        <div className="flex flex-col sm:flex-row justify-between items-start">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mt-2 sm:mt-0" />
        </div>

        {/* Açıklama metni */}
        <div className="space-y-2 flex-grow">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6" />
        </div>

        {/* Alt bilgiler */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full sm:w-24" />
        </div>
      </div>
    </div>
  );
} 