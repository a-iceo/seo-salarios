// app/[lang]/[...slug]/page.tsx
// Ruta dinámica: /{lang}/{profession}-salary-{city}
// ISR: revalidate cada 7 días (604800s)
// Genera metadatos dinámicos y datos de salario algorítmico

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  SUPPORTED_LANGS,
  PROFESSIONS,
  CITIES,
  EXPERIENCE_LEVELS,
  UI_STRINGS,
  calculateSalaryData,
  type Lang,
} from '../../../lib/config';
import { getPageContent } from '../../../lib/getPageContent';

// ─── ISR: regeneración incremental cada 7 días ────────────
export const revalidate = 604800;

// ─── TIPOS ───────────────────────────────────────────────
interface PageProps {
  params: { lang: string; slug: string[] };
}

// ─── PARSE SLUG ───────────────────────────────────────────
// Formato esperado: {profession-slug}-salary-{city-slug}
// o: {profession-slug}-salary-{city-slug}-{experience-slug}
function parseSlug(slugParts: string[]): {
  professionSlug: string | null;
  citySlug: string | null;
  experienceSlug: string;
} {
  // Unir las partes del slug
  const fullSlug = slugParts.join('/');
  // Buscar separadores conocidos (salary, sueldo, salaire, gehalt, salario, stipendio)
  const salaryKeywords = ['salary', 'sueldo', 'salaire', 'gehalt', 'salario', 'stipendio', 'zarplata', 'kyuyo', 'vetan', 'gongzi'];
  
  let professionSlug: string | null = null;
  let citySlug: string | null = null;
  let experienceSlug = 'mid-level';

  // Si hay múltiples partes de slug (ruta anidada)
  if (slugParts.length >= 2) {
    // Intentar: /profession/city o /profession/city/experience
    const possibleProf = slugParts[0];
    const possibleCity = slugParts[1];
    const possibleExp = slugParts[2];

    if (PROFESSIONS[possibleProf]) professionSlug = possibleProf;
    if (CITIES[possibleCity]) citySlug = possibleCity;
    if (possibleExp && EXPERIENCE_LEVELS[possibleExp]) experienceSlug = possibleExp;
  }

  // Si no se encontró via ruta, intentar por slug unificado con keyword
  if (!professionSlug || !citySlug) {
    const segment = slugParts[0] || '';
    for (const keyword of salaryKeywords) {
      const idx = segment.indexOf(`-${keyword}-`);
      if (idx > -1) {
        const profPart = segment.substring(0, idx);
        const rest = segment.substring(idx + keyword.length + 2);
        // rest puede ser: city o city-experience
        // buscar qué ciudad o experiencia coincide
        for (const cityKey of Object.keys(CITIES)) {
          if (rest.startsWith(cityKey)) {
            professionSlug = profPart;
            citySlug = cityKey;
            const expPart = rest.slice(cityKey.length + 1);
            if (expPart && EXPERIENCE_LEVELS[expPart]) experienceSlug = expPart;
            break;
          }
        }
        if (professionSlug && citySlug) break;
      }
    }
  }

  // Fallback: buscar directamente por claves conocidas en el slug
  if (!professionSlug) {
    for (const key of Object.keys(PROFESSIONS)) {
      const segment = slugParts.join('-');
      if (segment.includes(key)) { professionSlug = key; break; }
    }
  }
  if (!citySlug) {
    for (const key of Object.keys(CITIES)) {
      const segment = slugParts.join('-');
      if (segment.includes(key)) { citySlug = key; break; }
    }
  }

  return { professionSlug, citySlug, experienceSlug };
}

// ─── GENERATE STATIC PARAMS ──────────────────────────────
// Genera TODAS las combinaciones de idioma × profesión × ciudad × experiencia
export async function generateStaticParams() {
  const params: { lang: string; slug: string[] }[] = [];
  const profKeys = Object.keys(PROFESSIONS);
  const cityKeys = Object.keys(CITIES);
  const expKeys = Object.keys(EXPERIENCE_LEVELS);

  for (const lang of SUPPORTED_LANGS) {
    for (const prof of profKeys) {
      for (const city of cityKeys) {
        // Agregar versión sin experiencia (mid-level implícito)
        params.push({ lang, slug: [prof, city] });
        // Agregar versiones con experiencia
        for (const exp of expKeys) {
          if (exp !== 'mid-level') {
            params.push({ lang, slug: [prof, city, exp] });
          }
        }
      }
    }
  }
  return params;
}

// ─── METADATA DINÁMICA ────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = params;
  const validLang = (SUPPORTED_LANGS as readonly string[]).includes(lang) ? (lang as Lang) : 'en';
  const { professionSlug, citySlug, experienceSlug } = parseSlug(slug);

  if (!professionSlug || !citySlug) {
    return { title: 'Page Not Found' };
  }

  const data = calculateSalaryData(professionSlug, citySlug, experienceSlug);
  if (!data) return { title: 'Not Found' };

  const ui = UI_STRINGS[validLang];
  const profName = data.profession.names[validLang];
  const cityName = data.city.names[validLang];
  const year = new Date().getFullYear();

  const title = ui.metaTitle
    .replace('{profession}', profName)
    .replace('{city}', cityName)
    .replace('{year}', String(year));

  const description = ui.metaDesc
    .replace('{profession}', profName)
    .replace('{city}', cityName)
    .replace('{year}', String(year));

  const canonical = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://salaryglobal.io'}/${lang}/${slug.join('/')}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        SUPPORTED_LANGS.map(l => [l, `${process.env.NEXT_PUBLIC_BASE_URL || 'https://salaryglobal.io'}/${l}/${professionSlug}/${citySlug}`])
      ),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
    },
  };
}

// ─── FORMATEO DE NÚMEROS ──────────────────────────────────
function formatCurrency(amount: number, currency: string, lang: string): string {
  try {
    return new Intl.NumberFormat(lang, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount.toLocaleString()} ${currency}`;
  }
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────
export default function SalaryPage({ params }: PageProps) {
  const { lang, slug } = params;
  const validLang = (SUPPORTED_LANGS as readonly string[]).includes(lang) ? (lang as Lang) : 'en';
  const { professionSlug, citySlug, experienceSlug } = parseSlug(slug);

  if (!professionSlug || !citySlug) notFound();

  const data = calculateSalaryData(professionSlug, citySlug, experienceSlug);
  if (!data) notFound();

  const ui = UI_STRINGS[validLang];
  const profName = data.profession.names[validLang];
  const cityName = data.city.names[validLang];
  const countryName = data.city.country[validLang];
  const expName = data.experience.names[validLang];
  const year = new Date().getFullYear();

  // Obtener contenido generado (si existe)
  const pageContent = getPageContent(validLang, professionSlug!, citySlug!);

  // Multiplicador local de moneda (aproximado)
  const currencyMultipliers: Record<string, number> = {
    USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149, AED: 3.67,
    SGD: 1.34, CAD: 1.36, AUD: 1.55, BRL: 4.97, INR: 83,
    MXN: 17.1, CNY: 7.25, RUB: 88, ARS: 900,
  };
  const fx = currencyMultipliers[data.currency] || 1;

  const localAnnual = Math.round(data.annualSalaryUSD * fx);
  const localMonthlyNet = Math.round(data.monthlyNetUSD * fx);
  const localMonthlyCost = Math.round(data.monthlyCostUSD * fx);
  const localMin = Math.round(data.salaryMinUSD * fx);
  const localMax = Math.round(data.salaryMaxUSD * fx);

  // Quality of life color
  const qolColor =
    data.qualityOfLife >= 75 ? 'stat-green' :
    data.qualityOfLife >= 60 ? 'stat-amber' : 'stat-red';

  // Purchasing power rating
  const ppRating =
    data.purchasingPowerRatio >= 1.8 ? { label: '★★★★★', cls: 'badge-green' } :
    data.purchasingPowerRatio >= 1.2 ? { label: '★★★★', cls: 'badge-green' } :
    data.purchasingPowerRatio >= 0.9 ? { label: '★★★', cls: 'badge-amber' } :
    data.purchasingPowerRatio >= 0.6 ? { label: '★★', cls: 'badge-amber' } :
                                         { label: '★', cls: 'badge-navy' };

  // Datos de desglose de gastos (estimados)
  const expenses = [
    { label: lang === 'es' ? 'Vivienda' : lang === 'fr' ? 'Logement' : lang === 'de' ? 'Wohnen' : 'Housing', pct: 35 },
    { label: lang === 'es' ? 'Alimentación' : lang === 'fr' ? 'Alimentation' : lang === 'de' ? 'Lebensmittel' : 'Food', pct: 20 },
    { label: lang === 'es' ? 'Transporte' : lang === 'fr' ? 'Transport' : lang === 'de' ? 'Transport' : 'Transport', pct: 15 },
    { label: lang === 'es' ? 'Salud' : lang === 'fr' ? 'Santé' : lang === 'de' ? 'Gesundheit' : 'Healthcare', pct: 10 },
    { label: lang === 'es' ? 'Ocio' : lang === 'fr' ? 'Loisirs' : lang === 'de' ? 'Freizeit' : 'Leisure', pct: 12 },
    { label: lang === 'es' ? 'Otros' : lang === 'fr' ? 'Autres' : lang === 'de' ? 'Sonstiges' : 'Other', pct: 8 },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${profName} Salary in ${cityName} ${year}`,
    description: `Estimated salary for ${profName} in ${cityName}: ${formatCurrency(localAnnual, data.currency, lang)}`,
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://salaryglobal.io'}/${lang}/${slug.join('/')}`,
    inLanguage: validLang,
    dateModified: new Date().toISOString().split('T')[0],
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section className="hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href={`/${validLang}`}>Home</a>
            <span aria-hidden>›</span>
            <a href={`/${validLang}/${professionSlug}`}>{profName}</a>
            <span aria-hidden>›</span>
            <span aria-current="page">{cityName}</span>
          </nav>

          <div className="hero-badge">
            <span>◈</span> {ui.updated} {year}
          </div>

          <h1>
            <em>{profName}</em> — {ui.salaryLabel}{' '}
            {lang === 'es' ? 'en' : lang === 'fr' ? 'à' : lang === 'de' ? 'in' : lang === 'pt' ? 'em' : 'in'}{' '}
            {cityName}
          </h1>
          <p>{ui.subtitle}</p>

          <div className="hero-meta">
            <span>📍 <strong>{cityName}, {countryName}</strong></span>
            <span>💼 <strong>{expName}</strong> · {data.experience.yearsRange} {lang === 'es' ? 'años' : lang === 'de' ? 'Jahre' : lang === 'fr' ? 'ans' : 'years'}</span>
            <span>💱 <strong>{data.currency}</strong></span>
          </div>
        </div>
      </section>

      {/* ══ MAIN CONTENT ══════════════════════════════════ */}
      <div className="salary-page">
        <div className="container">
          <div className="page-grid">

            {/* ─── LEFT COLUMN ─────────────────────────── */}
            <div>
              {/* Salary Hero Card */}
              <div className="card salary-hero-card">
                <p className="card-title">{ui.salaryLabel}</p>
                <div className="salary-amount">
                  {formatCurrency(localAnnual, data.currency, lang)}
                </div>
                <div className="salary-currency">
                  {lang === 'es' ? 'al año' : lang === 'fr' ? 'par an' : lang === 'de' ? 'pro Jahr' : 'per year'} · {data.currency}
                </div>
                <div className="salary-range">
                  <span>{formatCurrency(localMin, data.currency, lang)}</span>
                  <div className="range-bar" role="presentation">
                    <div className="range-fill" />
                  </div>
                  <span>{formatCurrency(localMax, data.currency, lang)}</span>
                </div>
                <p style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.5)' }}>
                  {ui.salaryRange}: {formatCurrency(localMin, data.currency, lang)} – {formatCurrency(localMax, data.currency, lang)}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="stats-grid">
                <div className="card stat-card stat-green">
                  <div className="stat-label">{ui.netSalary}</div>
                  <div className="stat-value">{formatCurrency(localMonthlyNet, data.currency, lang)}</div>
                  <div className="stat-sub">{lang === 'es' ? 'después de impuestos' : lang === 'fr' ? 'après impôts' : 'after tax'}</div>
                </div>
                <div className="card stat-card stat-amber">
                  <div className="stat-label">{ui.costLabel}</div>
                  <div className="stat-value">{formatCurrency(localMonthlyCost, data.currency, lang)}</div>
                  <div className="stat-sub">{lang === 'es' ? 'gasto mensual típico' : 'typical monthly spend'}</div>
                </div>
                <div className="card stat-card">
                  <div className="stat-label">{ui.taxRate}</div>
                  <div className="stat-value">{data.taxRate}%</div>
                  <div className="stat-sub">{lang === 'es' ? 'tasa efectiva' : 'effective rate'}</div>
                </div>
                <div className={`card stat-card ${qolColor}`}>
                  <div className="stat-label">{ui.qualityOfLife}</div>
                  <div className="stat-value">{data.qualityOfLife}/100</div>
                  <div className="stat-sub">{lang === 'es' ? 'índice global' : 'global index'}</div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="card" style={{ marginTop: 'var(--gap)' }}>
                <p className="card-title">{ui.monthlyExpenses} — {cityName}</p>
                {expenses.map(exp => (
                  <div className="progress-item" key={exp.label}>
                    <div className="progress-header">
                      <span>{exp.label}</span>
                      <span>{formatCurrency(Math.round(localMonthlyCost * exp.pct / 100), data.currency, lang)} · {exp.pct}%</span>
                    </div>
                    <div className="progress-bar" role="presentation">
                      <div className="progress-fill" style={{ width: `${exp.pct * 3.5}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Comparison by Experience */}
              <div className="card" style={{ marginTop: 'var(--gap)' }}>
                <p className="card-title">{ui.experienceLabel} — {profName} {lang === 'es' ? 'en' : 'in'} {cityName}</p>
                <table className="compare-table">
                  <thead>
                    <tr>
                      <th>{ui.experienceLabel}</th>
                      <th style={{ textAlign: 'right' }}>{lang === 'es' ? 'Años' : 'Years'}</th>
                      <th style={{ textAlign: 'right' }}>{ui.salaryLabel}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(EXPERIENCE_LEVELS).map(([key, exp]) => {
                      const d = calculateSalaryData(professionSlug!, citySlug!, key);
                      if (!d) return null;
                      const localAmt = Math.round(d.annualSalaryUSD * fx);
                      return (
                        <tr key={key}>
                          <td>
                            <a href={`/${validLang}/${professionSlug}/${citySlug}/${key}`}>
                              {exp.names[validLang]}
                            </a>
                          </td>
                          <td className="td-num">{exp.yearsRange}</td>
                          <td className="td-num">{formatCurrency(localAmt, data.currency, lang)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Same Profession in Other Cities */}
              <div className="card" style={{ marginTop: 'var(--gap)' }}>
                <p className="card-title">{profName} — {ui.comparison}</p>
                <table className="compare-table">
                  <thead>
                    <tr>
                      <th>{lang === 'es' ? 'Ciudad' : 'City'}</th>
                      <th style={{ textAlign: 'right' }}>{lang === 'es' ? 'Salario Anual' : 'Annual Salary'}</th>
                      <th style={{ textAlign: 'right' }}>{lang === 'es' ? 'Poder Adquisitivo' : 'Purchasing Power'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(CITIES).slice(0, 8).map(([key, city]) => {
                      const d = calculateSalaryData(professionSlug!, key, experienceSlug);
                      if (!d) return null;
                      const cityFx = currencyMultipliers[city.currency] || 1;
                      const amt = Math.round(d.annualSalaryUSD * cityFx);
                      const pp = d.purchasingPowerRatio >= 1.2 ? 'badge-green' : d.purchasingPowerRatio >= 0.8 ? 'badge-amber' : 'badge-navy';
                      return (
                        <tr key={key}>
                          <td>
                            <a href={`/${validLang}/${professionSlug}/${key}`}>
                              {city.names[validLang]}, {city.country[validLang]}
                            </a>
                          </td>
                          <td className="td-num">
                            {new Intl.NumberFormat(lang, { style: 'currency', currency: city.currency, maximumFractionDigits: 0 }).format(amt)}
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <span className={`badge ${pp}`}>{d.purchasingPowerRatio.toFixed(1)}×</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <p className="disclaimer">{ui.disclaimer}</p>

              {/* Contenido generado para AdSense */}
              {pageContent && (
                <div className="card" style={{ marginTop: 'var(--gap)' }}>
                  <p className="card-title">
                    {validLang === 'es' ? 'Mercado Laboral' : 'Job Market Overview'}
                  </p>
                  <p style={{ lineHeight: 1.7, color: 'var(--gray-600)' }}>
                    {pageContent.content}
                  </p>
                </div>
              )}
            </div>

            {/* ─── SIDEBAR ─────────────────────────────── */}
            <aside className="sidebar">

              {/* Purchasing Power Card */}
              <div className="card">
                <p className="card-title">{lang === 'es' ? 'Poder Adquisitivo' : lang === 'fr' ? 'Pouvoir d\'Achat' : 'Purchasing Power'}</p>
                <div style={{ textAlign: 'center', padding: '.5rem 0 1rem' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>
                    {data.purchasingPowerRatio >= 1.5 ? '🟢' : data.purchasingPowerRatio >= 0.9 ? '🟡' : '🔴'}
                  </div>
                  <div style={{ fontSize: '2rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--navy)' }}>
                    {data.purchasingPowerRatio.toFixed(2)}×
                  </div>
                  <div style={{ fontSize: '.8rem', color: 'var(--gray-400)', marginTop: '.4rem' }}>
                    {lang === 'es' ? 'ratio neto/gastos mensuales' : 'net/monthly expenses ratio'}
                  </div>
                  <span className={`badge ${ppRating.cls}`} style={{ marginTop: '.75rem', fontSize: '.8rem' }}>
                    {ppRating.label}
                  </span>
                </div>
              </div>

              {/* Related professions */}
              <div className="card">
                <p className="card-title">{lang === 'es' ? 'Profesiones Similares' : lang === 'fr' ? 'Professions Similaires' : lang === 'de' ? 'Ähnliche Berufe' : 'Related Professions'}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                  {Object.entries(PROFESSIONS).slice(0, 6).map(([key, prof]) => {
                    if (key === professionSlug) return null;
                    const d = calculateSalaryData(key, citySlug!, experienceSlug);
                    if (!d) return null;
                    const amt = Math.round(d.annualSalaryUSD * fx);
                    return (
                      <a
                        key={key}
                        href={`/${validLang}/${key}/${citySlug}`}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '.5rem .75rem',
                          background: 'var(--gray-50)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '.82rem',
                          color: 'var(--navy)',
                          textDecoration: 'none',
                          transition: 'background .15s',
                        }}
                      >
                        <span>{prof.names[validLang]}</span>
                        <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>
                          {data.currencySymbol}{(amt / 1000).toFixed(0)}K
                        </strong>
                      </a>
                    );
                  })}
                </div>
              </div>


              {/* Languages */}
              <div className="card">
                <p className="card-title">{lang === 'es' ? 'Otros Idiomas' : 'Other Languages'}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
                  {SUPPORTED_LANGS.map(l => (
                    <a
                      key={l}
                      href={`/${l}/${professionSlug}/${citySlug}`}
                      style={{
                        padding: '.25rem .6rem',
                        background: l === validLang ? 'var(--navy)' : 'var(--gray-100)',
                        color: l === validLang ? 'var(--white)' : 'var(--gray-600)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '.78rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                      }}
                    >
                      {l}
                    </a>
                  ))}
                </div>
              </div>

            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
