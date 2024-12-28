import { ThemeProvider } from 'next-themes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system">
      <div className="font-helvetica antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default MyApp; 