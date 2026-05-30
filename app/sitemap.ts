// app/sitemap.ts
// Sitemap dinámico — Next.js 14 MetadataRoute.Sitemap
// Genera TODAS las combinaciones: idioma × profesión × ciudad × experiencia
// Total estimado: 10 langs × 15 profs × 20 cities × 4 exp = 12,000 URLs
// + variantes sin experiencia: 10 × 15 × 20 = 3,000 URLs
// TOTAL: ~15,000 URLs en el sitemap XML

import { MetadataRoute } from 'next';
import { SUPPORTED_LANGS, PROFESSIONS, CITIES, EXPERIENCE_LEVELS } from '../lib/config';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://salaryglobal.io';

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  const now = new Date();
  const profKeys = Object.keys(PROFESSIONS);
  const cityKeys = Object.keys(CITIES);
  const expKeys = Object.keys(EXPERIENCE_LEVELS);

  // ─── 1. HOMEPAGE (todos los idiomas) ─────────────────
  for (const lang of SUPPORTED_LANGS) {
    urls.push({
      url: `${BASE_URL}/${lang}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  }

  // ─── 2. PÁGINAS: profesión + ciudad (sin experiencia = mid-level implícito) ──
  // Máxima prioridad SEO: captura búsquedas como
  // "software engineer salary san francisco"
  for (const lang of SUPPORTED_LANGS) {
    for (const prof of profKeys) {
      for (const city of cityKeys) {
        urls.push({
          url: `${BASE_URL}/${lang}/${prof}/${city}`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.85,
          // hreflang alternates se manejan en generateMetadata de cada page
        });
      }
    }
  }

  // ─── 3. PÁGINAS: profesión + ciudad + experiencia ─────
  // Captura long-tail: "senior software engineer salary berlin"
  for (const lang of SUPPORTED_LANGS) {
    for (const prof of profKeys) {
      for (const city of cityKeys) {
        for (const exp of expKeys) {
          if (exp === 'mid-level') continue; // ya cubierto arriba sin sufijo
          urls.push({
            url: `${BASE_URL}/${lang}/${prof}/${city}/${exp}`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.75,
          });
        }
      }
    }
  }

  // ─── 4. PÁGINAS DE PROFESIÓN (hub pages) ─────────────
  // "/en/software-engineer" — lista todas las ciudades para esa profesión
  for (const lang of SUPPORTED_LANGS) {
    for (const prof of profKeys) {
      urls.push({
        url: `${BASE_URL}/${lang}/${prof}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.80,
      });
    }
  }

  // ─── 5. PÁGINAS DE CIUDAD (hub pages) ────────────────
  // "/en/city/san-francisco" — lista todas las profesiones en esa ciudad
  for (const lang of SUPPORTED_LANGS) {
    for (const city of cityKeys) {
      urls.push({
        url: `${BASE_URL}/${lang}/city/${city}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.78,
      });
    }
  }

  return urls;
}

// ─── SITEMAP ÍNDICE (para sitemaps > 50,000 URLs) ────────
// Si escala más allá de 50k URLs, dividir en sitemaps por idioma:
//
// export default function sitemap() {
//   // Retorna un array de MetadataRoute.Sitemap.index entries
//   return SUPPORTED_LANGS.map(lang => ({
//     url: `${BASE_URL}/sitemap-${lang}.xml`,
//     lastModified: new Date(),
//   }));
// }
//
// Y crear app/sitemap-[lang]/route.ts para cada idioma.
