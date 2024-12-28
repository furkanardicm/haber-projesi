import Head from 'next/head';
import Image from 'next/image';

// Hakkımda sayfasının ana bileşeni
export default function About() {
  return (
    <>
      {/* Head bileşeni ile sayfa başlığı ve meta bilgileri */}
      <Head>
        <title>Hakkımda - Muhammed Furkan Ardıç</title>
        <meta name="description" content="Muhammed Furkan Ardıç hakkında bilgiler" />
      </Head>

      {/* Ana içerik alanı */}
      <main className="bg-gray-100 dark:bg-gray-900 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profil kartı container */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
            {/* Profil başlık alanı - gradient arka plan */}
            <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
              {/* Profil fotoğrafı */}
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                <Image
                  src="https://images.flowcv.com/img/eyJpbWFnZUlkIjoiYXZhdGFyL1g1SWxvWTc1WEpJQUxuMzdrWTc0SC5qcGVnIiwidHJhbnNmb3JtYXRpb25zIjp7ImNyb3AiOnsieVBjdCI6MC4xNTI4NDY1MzQ2NTM0NjUzNywieFBjdCI6MCwid2lkdGhQY3QiOjAuOTkwMDk5MDA5OTAwOTkwMSwiaGVpZ2h0UGN0IjowLjU1NjkzMDY5MzA2OTMwN30sIndpZHRoIjo2MDAsImZvcm1hdCI6ImpwZWcifX0=.jpg"
                  alt="Muhammed Furkan Ardıç"
                  width={128}
                  height={128}
                  className="rounded-full border-4 border-white dark:border-gray-800"
                />
              </div>
            </div>

            {/* Profil bilgileri bölümü */}
            <div className="pt-20 pb-8 px-8">
              {/* İsim ve ünvan */}
              <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
                Muhammed Furkan Ardıç
              </h1>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-2">
                Frontend Developer
              </p>
              
              {/* Kişisel tanıtım */}
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                Konya Teknik Üniversitesi Bilgisayar Mühendisliği mezunuyum. Modern web teknolojileri ve yapay zeka alanlarında kendimi geliştirmeye odaklanıyorum. Frontend geliştirme konusunda React ve Next.js ekosisteminde projeler geliştiriyor, kullanıcı deneyimini ön planda tutan çözümler üretiyorum.
              </p>

              {/* Sosyal medya linkleri */}
              <div className="flex justify-center space-x-4 mb-8">
                {/* GitHub linki */}
                <a
                  href="https://github.com/furkanardicm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                >
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                {/* LinkedIn linki */}
                <a
                  href="https://www.linkedin.com/in/furkanardicm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>

              {/* İş deneyimi bölümü */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Deneyim
                </h2>
                {/* Deneyim listesi */}
                <div className="space-y-4">
                  {/* Yalın Software deneyimi */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Yalın Software, Staj
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Fullstack Web Geliştirici Stajı • Bursa, Türkiye
                    </p>
                  </div>
                  {/* TTK deneyimi */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Türkiye Taşkömürü Kurumu, Staj
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Veritabanı ve Donanım üzerine Staj • Zonguldak, Türkiye
                    </p>
                  </div>
                </div>
              </div>

              {/* Eğitim bilgileri bölümü */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Eğitim
                </h2>
                {/* Eğitim listesi */}
                <div className="space-y-4">
                  {/* Üniversite bilgileri */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Konya Teknik Üniversitesi
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Bilgisayar Mühendisliği • 2020 - 2024
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      GPA: 3.7/4
                    </p>
                  </div>
                </div>
              </div>

              {/* Teknik yetenekler bölümü */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Yetenekler
                </h2>
                {/* Yetenek etiketleri */}
                <div className="flex flex-wrap gap-2">
                  {[
                    'JavaScript',
                    'React.js',
                    'Next.js',
                    'TypeScript',
                    'Express.js',
                    'Flask',
                    'TailwindCSS',
                    'CSS',
                    'HTML',
                    'Python',
                    'Git & GitHub',
                    'Algoritmik Düşünme',
                    'MySQL',
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projeler bölümü */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Projeler
                </h2>
                {/* Proje listesi */}
                <div className="space-y-4">
                  {/* Melodious projesi */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      Yapay Zeka ile Duygu Durumu Tabanlı Şarkı Önerisi
                      <a 
                        href="https://github.com/furkanardicm/MelodiousV2" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Kullanıcı yüz ifadelerindeki şekiller göz dikkate alınarak dört farklı duygusal durumdan (üzgün, mutlu, enerjik, sakin) birini seçebilecek veya kamera kullanarak duygusunu belirleyerek şarkı önerileri sunan React.js projesi
                    </p>
                  </div>
                  {/* Envanter projesi */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      Akıllı Envanter Yönetim Sistemi
                      <a 
                        href="https://github.com/furkanardicm/envanterys" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Yapay Zeka destekli kullanıcıların CRUD işlemlerini yapabildiği çeşitli filtreleme ve sıralama işlemlerinin yanı sıra ileriye dönük ürün miktarı ve ürün önerileri alabileceği envanter yönetim sistemi
                    </p>
                  </div>
                  {/* Disney+ Clone projesi */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      Disney+ Clone
                      <a 
                        href="https://github.com/furkanardicm/disney-plus-clone" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      NextJS ve TypeScript kullanarak basit Disney+ Clone&apos;u. TailwindCSS kullanarak yapıldı ve Dark Mode ve Responsive desteği mevcut.
                    </p>
                  </div>
                  {/* Haber Portalı projesi */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      Modern Haber Portalı
                      <a 
                        href="https://github.com/furkanardicm/haber-projesi" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Next.js ve TailwindCSS kullanılarak geliştirilmiş modern bir haber portalı. Dark mode desteği, responsive tasarım ve kategori bazlı haber listeleme özellikleri ile kullanıcı dostu bir deneyim sunar.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sertifikalar bölümü */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Sertifikalar
                </h2>
                {/* Sertifika listesi */}
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  <li>Huawei ICT Competition Python Programming Basic</li>
                  <li>GlobalAIHub Introduction to Python</li>
                  <li>Turkcell Web Programming 101</li>
                  <li>Turkcell - Web Programming 201</li>
                  <li>Turkcell - Web Programming 301</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 