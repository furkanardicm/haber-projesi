import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import SearchForm from './SearchForm';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { theme, setTheme, systemTheme } = useTheme();

  // After mounting, we can show the theme toggle
  useEffect(() => setMounted(true), []);

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const navigation = [
    { name: 'Anasayfa', href: '/' },
    { name: 'Genel', href: '/general' },
    { name: 'İş', href: '/business' },
    { name: 'Sağlık', href: '/health' },
    { name: 'Bilim', href: '/science' },
    { name: 'Spor', href: '/sports' },
    { name: 'Teknoloji', href: '/technology' },
    { name: 'Hakkımda', href: '/about' },
  ];

  if (!mounted) {
    return (
      <button
        className="w-10 h-10 p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-theme duration-300"
        aria-label="Toggle dark mode"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </button>
    );
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-theme duration-300">
      {/* Üst Bar */}
      <div className="w-full border-b border-gray-200 dark:border-gray-700 transition-theme duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/about" className="-m-1.5 p-1.5">
                <span className="text-xl font-bold text-gray-900 dark:text-white transition-theme duration-300">Muhammed Furkan Ardıç</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex md:items-center space-x-4">
                <SearchForm />
                <button
                  onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-theme duration-300"
                  aria-label="Toggle dark mode"
                >
                  {currentTheme === 'dark' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
              </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              >
                <span className="sr-only">{isOpen ? 'Menüyü kapat' : 'Menüyü aç'}</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Alt Navigasyon */}
      <nav className="hidden md:block border-b border-gray-200 dark:border-gray-700 transition-theme duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center -mb-px">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  router.pathname === item.href
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                } inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium transition-all duration-300 animate-slide-in`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobil Menü */}
      {isOpen && (
        <div className="md:hidden pb-4 animate-slide-in-up transition-theme duration-300">
          <div className="flex flex-col space-y-2">
            <div className="px-3 py-2 animate-slide-in" style={{ animationDelay: '50ms' }}>
              <SearchForm />
            </div>
            <button
              onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
              className="flex items-center px-3 py-2 text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 animate-slide-in"
              style={{ animationDelay: '100ms' }}
            >
              <span className="mr-3">
                {currentTheme === 'dark' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </span>
              {currentTheme === 'dark' ? 'Açık Mod' : 'Koyu Mod'}
            </button>
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  router.pathname === item.href
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                } block px-3 py-2 text-base font-medium transition-colors duration-200 animate-slide-in`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
} 