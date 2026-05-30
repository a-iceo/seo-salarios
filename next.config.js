// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── PERFORMANCE: headers de caché ──────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        // Fuentes y assets estáticos: caché agresivo
        source: '/(.*)\\.(woff2|woff|ttf|otf|ico|png|jpg|webp|svg)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Páginas con ISR: caché razonable
        source: '/:lang/:slug*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=604800, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },

  // ─── REDIRECTS: www → non-www ────────────────────────
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: false,
        has: [{ type: 'header', key: 'accept-language', value: '(?!en)(.*)' }],
      },
    ];
  },

  // ─── OPTIMIZACIONES ──────────────────────────────────
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // Compilación más rápida con SWC
  swcMinify: true,

  // Optimización de imágenes (si se usan)
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },
};

module.exports = nextConfig;
