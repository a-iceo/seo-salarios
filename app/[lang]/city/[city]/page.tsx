// app/[lang]/city/[city]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SUPPORTED_LANGS, PROFESSIONS, CITIES, EXPERIENCE_LEVELS, UI_STRINGS, calculateSalaryData, type Lang } from '../../../../lib/config';

export const revalidate = 86400; // 24h

interface PageProps {
  params: { lang: string; city: string };
}

export async function generateStaticParams() {
  const params: { lang: string; city: string }[] = [];
  for (const lang of SUPPORTED_LANGS) {
    for (const city of Object.keys(CITIES)) {
      params.push({ lang, city });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, city } = params;
  const validLang = (SUPPORTED_LANGS as readonly string[]).includes(lang) ? (lang as Lang) : 'en';
  const cityData = CITIES[city];
  
  if (!cityData) return { title: 'Not Found' };
  
  const ui = UI_STRINGS[validLang];
  const cityName = cityData.names[validLang];
  const year = new Date().getFullYear();
  
  return {
    title: `Cost of Living & Salaries in ${cityName} ${year}`,
    description: `Compare salaries and cost of living in ${cityName}. Data for all professions and experience levels. Updated ${year}.`,
  };
}

export default function CityPage({ params }: PageProps) {
  const { lang, city } = params;
  const validLang = (SUPPORTED_LANGS as readonly string[]).includes(lang) ? (lang as Lang) : 'en';
  const cityData = CITIES[city];
  
  if (!cityData) notFound();
  
  const ui = UI_STRINGS[validLang];
  const cityName = cityData.names[validLang];
  const countryName = cityData.country[validLang];
  
  const currencyMultipliers: Record<string, number> = {
    USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149, AED: 3.67,
    SGD: 1.34, CAD: 1.36, AUD: 1.55, BRL: 4.97, INR: 83,
    MXN: 17.1, CNY: 7.25, RUB: 88, ARS: 900,
  };

  return (
    <>
      <section className="hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href={`/${validLang}`}>Home</a>
            <span aria-hidden>›</span>
            <span aria-current="page">{cityName}</span>
          </nav>
          
          <div className="hero-badge">
            <span>◈</span> {ui.updated} {new Date().getFullYear()}
          </div>
          
          <h1>
            <em>{cityName}</em> — Salaries & Cost of Living
          </h1>
          <p>{ui.subtitle}</p>
          <div className="hero-meta">
            <span>📍 <strong>{cityName}, {countryName}</strong></span>
            <span>💱 <strong>{cityData.currency}</strong></span>
            <span>🎯 <strong>{cityData.qualityOfLife}/100</strong> Quality of Life</span>
          </div>
        </div>
      </section>

      <div className="salary-page">
        <div className="container">
          <div className="card">
            <p className="card-title">Salaries in {cityName} by Profession</p>
            <table className="compare-table">
              <thead>
                <tr>
                  <th>{lang === 'es' ? 'Profesión' : 'Profession'}</th>
                  <th style={{ textAlign: 'right' }}>{lang === 'es' ? 'Salario Anual (Mid)' : 'Annual Salary (Mid)'}</th>
                  <th style={{ textAlign: 'right' }}>{ui.qualityOfLife}</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(PROFESSIONS).map(([profKey, prof]) => {
                  const data = calculateSalaryData(profKey, city, 'mid-level');
                  if (!data) return null;
                  const fx = currencyMultipliers[cityData.currency] || 1;
                  const localAmt = Math.round(data.annualSalaryUSD * fx);
                  return (
                    <tr key={profKey}>
                      <td>
                        <a href={`/${validLang}/${profKey}/${city}`}>
                          {prof.names[validLang]}
                        </a>
                      </td>
                      <td className="td-num">
                        {new Intl.NumberFormat(lang, { style: 'currency', currency: cityData.currency, maximumFractionDigits: 0 }).format(localAmt)}
                      </td>
                      <td className="td-num">{data.qualityOfLife}/100</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
