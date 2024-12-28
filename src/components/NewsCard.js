import Image from 'next/image';

// Haber kartı bileşeni
export default function NewsCard({ article }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col sm:flex-row border border-gray-200 dark:border-gray-700">
      {/* Haber görseli */}
      <div className="relative w-full sm:w-48 h-48 sm:h-full flex-shrink-0">
        <Image
          src={article.urlToImage || '/images/placeholder.jpg'}
          alt={article.title}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Haber içeriği */}
      <div className="p-4 flex flex-col flex-1">
        {/* Başlık ve tarih */}
        <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-0">
            {article.title}
          </h2>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
        </div>

        {/* Haber açıklaması */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow text-sm sm:text-base">
          {article.description}
        </p>

        {/* Alt bilgiler ve buton */}
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
  );
} 