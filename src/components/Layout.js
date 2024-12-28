import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-100 dark:bg-gray-900">{children}</main>
      <Footer />
    </div>
  );
} 