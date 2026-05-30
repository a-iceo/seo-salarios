// app/[lang]/page.tsx
import { PROFESSIONS, CITIES, SUPPORTED_LANGS, calculateSalaryData, type Lang } from '../../lib/config';

export const revalidate = 86400; // 24h

export async function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

interface PageProps {
  params: { lang: string };
}

export default function LangHomePage({ params }: PageProps) {
  const { lang } = params;
  const validLang = (SUPPORTED_LANGS as readonly string[]).includes(lang) ? (lang as Lang) : 'en';
  
  const fx: Record<string, number> = {
    USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149, AED: 3.67,
    SGD: 1.34, CAD: 1.36, AUD: 1.55, BRL: 4.97, INR: 83,
    MXN: 17.1, CNY: 7.25, RUB: 88, ARS: 900,
  };

  const FEATURED = [
    { prof: 'software-engineer', city: 'san-francisco', exp: 'senior' },
    { prof: 'data-scientist', city: 'new-york', exp: 'mid-level' },
    { prof: 'product-manager', city: 'london', exp: 'senior' },
    { prof: 'doctor', city: 'dubai', exp: 'senior' },
    { prof: 'lawyer', city: 'tokyo', exp: 'mid-level' },
    { prof: 'software-engineer', city: 'berlin', exp: 'mid-level' },
    { prof: 'financial-analyst', city: 'singapore', exp: 'senior' },
    { prof: 'nurse', city: 'sydney', exp: 'mid-level' },
    { prof: 'teacher', city: 'madrid', exp: 'mid-level' },
    { prof: 'mechanical-engineer', city: 'toronto', exp: 'senior' },
    { prof: 'graphic-designer', city: 'amsterdam', exp: 'mid-level' },
    { prof: 'pharmacist', city: 'paris', exp: 'senior' },
  ];

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-badge"><span>◈</span> Global Salary Data {new Date().getFullYear()}</div>
          <h1><em>Salaries & Cost of Living</em> — Any City, Any Profession</h1>
          <p>Real algorithmic data for 15 professions × 20 cities × 10 languages. Updated continuously.</p>
          <div className="hero-meta">
            <span>🌍 <strong>20 Cities</strong></span>
            <span>💼 <strong>15 Professions</strong></span>
            <span>🌐 <strong>10 Languages</strong></span>
          </div>
        </div>
      </section>

      <div className="home-section">
        <div className="container">
          <h2 className="section-title">Popular Salary Comparisons</h2>
          <p className="section-sub">Click any card to see full salary breakdown, costs, and tax estimates.</p>
          <div className="home-grid">
            {FEATURED.map(({ prof, city, exp }) => {
              const data = calculateSalaryData(prof, city, exp);
              if (!data) return null;
              const localAmt = Math.round(data.annualSalaryUSD * (fx[data.currency] || 1));
              const formatted = new Intl.NumberFormat(lang, {
                style: 'currency', currency: data.currency, maximumFractionDigits: 0,
              }).format(localAmt);
              return (
                <a key={`${prof}-${city}-${exp}`} href={`/${validLang}/${prof}/${city}/${exp}`} className="home-card">
                  <h3>{data.profession.names[validLang]}</h3>
                  <p>📍 {data.city.names[validLang]}, {data.city.country[validLang]} · {data.experience.names[validLang]}</p>
                  <div className="card-salary">{formatted}/yr</div>
                </a>
              );
            })}
          </div>

          <h2 className="section-title" style={{ marginTop: '3rem' }}>Browse by Language</h2>
          <p className="section-sub">Access data in your native language.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem', marginTop: '1rem' }}>
            {SUPPORTED_LANGS.map(l => (
              <a
                key={l}
                href={`/${l}/software-engineer/san-francisco`}
                style={{
                  padding: '.5rem 1.25rem',
                  background: 'var(--white)',
                  border: '1px solid var(--gray-200)',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 600,
                  fontSize: '.9rem',
                  color: 'var(--navy)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '.05em',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
