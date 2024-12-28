import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navigation() {
  const router = useRouter();

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

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center -mb-px">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${
                router.pathname === item.href
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
              } inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium transition-colors duration-200`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
} 