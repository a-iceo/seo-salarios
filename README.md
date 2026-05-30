# ◈ SalaryGlobal — SEO Programático Global
**Nicho:** Sueldos y Coste de Vida · **Framework:** Next.js 14 App Router · **Idiomas:** 10 · **URLs:** ~15,000+

---

## 📁 Estructura del Proyecto

```
seo-salarios/
├── app/
│   ├── layout.tsx              ← Layout raíz (header, footer, fuentes)
│   ├── globals.css             ← Design system completo
│   ├── page.tsx                ← Homepage con combinaciones populares
│   ├── robots.ts               ← robots.txt dinámico
│   ├── sitemap.ts              ← Sitemap XML con ~15,000 URLs
│   └── [lang]/
│       └── [...slug]/
│           └── page.tsx        ← Página dinámica con ISR
├── lib/
│   └── config.ts               ← Matriz multi-idioma completa
├── next.config.js              ← Performance + headers de caché
├── tsconfig.json
├── package.json
└── .env.example
```

---

## 🚀 Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local con tu dominio

# 3. Desarrollo local
npm run dev

# 4. Build para producción
npm run build
npm start
```

---

## 🌐 Estructura de URLs

| Formato | Ejemplo | Tipo |
|---------|---------|------|
| `/{lang}/{profession}/{city}` | `/es/software-engineer/madrid` | Principal |
| `/{lang}/{profession}/{city}/{experience}` | `/en/doctor/dubai/senior` | Long-tail |
| `/{lang}/{profession}` | `/fr/data-scientist` | Hub profesión |
| `/{lang}/city/{city}` | `/de/city/berlin` | Hub ciudad |

---

## 💰 Integración Adsterra

Los **4 espacios de anuncio** están marcados con comentarios en `app/[lang]/[...slug]/page.tsx`:

### 1. Banner Header (728×90)
```tsx
{/* ADSTERRA BANNER 728×90 — PEGA TU SCRIPT AQUÍ */}
// Línea ~165 en page.tsx
```

### 2. In-Article / Native
```tsx
{/* ADSTERRA IN-ARTICLE / NATIVE — PEGA TU SCRIPT AQUÍ */}
// Línea ~210 en page.tsx
```

### 3. Sidebar 300×250
```tsx
{/* ADSTERRA SIDEBAR 300×250 — PEGA TU SCRIPT AQUÍ */}
// Línea ~250 en page.tsx
```

### 4. Social Bar (sticky)
```tsx
{/* ADSTERRA SOCIAL BAR / PUSH — PEGA TU SCRIPT AQUÍ */}
// Línea ~265 en page.tsx
```

### Reemplazar el placeholder:
```tsx
// ANTES (placeholder):
<div className="ad-slot">
  <span>[ Adsterra Banner 728×90 ]</span>
</div>

// DESPUÉS (con script real):
<div className="ad-slot">
  <script
    async
    data-cfasync="false"
    src="//cdn.adsterra.com/invoke.js"
    data-key="TU_CLAVE_ADSTERRA"
  />
</div>
```

---

## ⚡ Performance (PageSpeed 98+)

- **ISR:** `revalidate = 604800` (7 días) — páginas servidas como estáticas
- **Fuentes:** IBM Plex Sans via Google Fonts con `display=swap`
- **CSS:** Sin frameworks pesados, solo variables CSS nativas
- **Headers:** Cache-Control agresivo para assets estáticos
- **Sin JS de cliente:** Todo renderizado en servidor (RSC)
- **Imágenes:** Formato AVIF/WebP optimizado con Next Image

---

## 📊 Datos y Algoritmo

El motor de cálculo en `lib/config.ts` → `calculateSalaryData()`:

```
salario_anual = baseSalario × multiplicadorCiudad × multiplicadorExperiencia × jitter
```

- **baseSalario:** Referencia USD mid-level por profesión
- **multiplicadorCiudad:** Ajuste de mercado local (0.3× Mumbai → 2.4× San Francisco)
- **multiplicadorExperiencia:** Junior 0.65× → Lead 1.85×
- **jitter:** ±7% hash determinístico (misma URL = mismo valor, sin Math.random)

---

## 🌍 Idiomas Soportados

| Código | Idioma | Código | Idioma |
|--------|--------|--------|--------|
| `en` | English | `zh` | 中文 |
| `es` | Español | `ru` | Русский |
| `fr` | Français | `ja` | 日本語 |
| `pt` | Português | `hi` | हिन्दी |
| `de` | Deutsch | `it` | Italiano |

---

## 📈 Escalar a Millones de URLs

Para escalar más allá de las ~15,000 URLs base:

1. **Añadir profesiones** en `lib/config.ts` → objeto `PROFESSIONS`
2. **Añadir ciudades** en `lib/config.ts` → objeto `CITIES`
3. **Dividir sitemap** cuando supere 50,000 URLs:
   - Crear `app/sitemap-[lang]/route.ts` por idioma
   - Usar `app/sitemap.ts` como índice de sitemaps

---

## 🚀 Deploy Recomendado

**Vercel** (óptimo para Next.js ISR):
```bash
vercel --prod
```

**Variables en Vercel:**
- `NEXT_PUBLIC_BASE_URL` = `https://tu-dominio.com`

---

*Generado para SEO Programático Global — Nicho: Sueldos y Coste de Vida*
