import Link from 'next/link';

export default function NoNews() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
      <svg
        className="w-24 h-24 mb-6 text-gray-400 dark:text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15M9 11l3 3m0 0l3-3m-3 3V8"
        />
      </svg>
      <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        Haber Bulunamadı
      </h3>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        Aradığınız kriterlere uygun haber bulunamadı. Lütfen farklı bir arama yapmayı deneyin.
      </p>
      <Link
        href="/"
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-500/70 dark:hover:bg-blue-600/80 transition-colors duration-300"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
} 