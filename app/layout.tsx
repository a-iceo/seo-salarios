// app/layout.tsx
// Layout raíz — Next.js 14 App Router
// Diseño corporativo: blanco, azul marino (#0F2044), gris
// Performance optimizado: fuentes locales, CSS mínimo, sin JS innecesario
import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://salaryglobal.io'),
  title: {
    default: 'Salary & Cost of Living Global — Real Data by City & Profession',
    template: '%s | SalaryGlobal',
  },
  description: 'Compare salaries and cost of living for any profession in any city worldwide. Updated data, tax estimates, and quality of life index.',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: 'bYtU1NUr1KSo1e0UBMcxEKNFAY9YqmgVFlWWg05kxF0',
  },
  other: {
    'google-adsense-account': 'ca-pub-9493845506774755',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'SalaryGlobal',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect para performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Google Fonts — IBM Plex Sans */}
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>

        {/* Google Analytics 4 */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-VX0ZP4CX9M"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VX0ZP4CX9M');
            `,
          }}
        />

        <header className="site-header">
          <div className="container header-inner">
            <a href="/" className="logo" aria-label="SalaryGlobal Home">
              <span className="logo-icon" aria-hidden="true">◈</span>
              <span className="logo-text">SalaryGlobal</span>
            </a>
            <nav className="header-nav">
              <a href="/blog">Blog</a>
              <a href="/about">About</a>
            </nav>
          </div>
        </header>

        <main id="main-content">
          {children}
        </main>

        <footer className="site-footer">
          <div className="container footer-inner">
            <p className="footer-brand">◈ SalaryGlobal</p>
            <p className="footer-copy">
              © {new Date().getFullYear()} SalaryGlobal. Data for informational purposes only.
            </p>
            <div className="footer-links">
              <a href="/about">About</a>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/sitemap.xml">Sitemap</a>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
