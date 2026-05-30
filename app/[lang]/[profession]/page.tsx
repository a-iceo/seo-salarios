// app/[lang]/[profession]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SUPPORTED_LANGS, PROFESSIONS, CITIES, EXPERIENCE_LEVELS, UI_STRINGS, calculateSalaryData, type Lang } from '../../../lib/config';

export const revalidate = 86400; // 24h

interface PageProps {
  params: { lang: string; profession: string };
}

export async function generateStaticParams() {
  const params: { lang: string; profession: string }[] = [];
  for (const lang of SUPPORTED_LANGS) {
    for (const prof of Object.keys(PROFESSIONS)) {
      params.push({ lang, profession: prof });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, profession } = params;
  const validLang = (SUPPORTED_LANGS as readonly string[]).includes(lang) ? (lang as Lang) : 'en';
  const prof = PROFESSIONS[profession];
  
  if (!prof) return { title: 'Not Found' };
  
  const ui = UI_STRINGS[validLang];
  const profName = prof.names[validLang];
  const year = new Date().getFullYear();
  
  return {
    title: `${profName} Salaries Around the World ${year}`,
    description: `Find ${profName} salaries in cities worldwide. Compare costs, taxes, and quality of life. Updated ${year}.`,
  };
}

export default function ProfessionPage({ params }: PageProps) {
  const { lang, profession } = params;
  const validLang = (SUPPORTED_LANGS as readonly string[]).includes(lang) ? (lang as Lang) : 'en';
  const prof = PROFESSIONS[profession];
  
  if (!prof) notFound();
  
  const ui = UI_STRINGS[validLang];
  const profName = prof.names[validLang];
  
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
            <span aria-current="page">{profName}</span>
          </nav>
          
          <div className="hero-badge">
            <span>◈</span> {ui.updated} {new Date().getFullYear()}
          </div>
          
          <h1>
            <em>{profName}</em> — Salaries Around the World
          </h1>
          <p>{ui.subtitle}</p>
        </div>
      </section>

      <div className="salary-page">
        <div className="container">
          <div className="card">
            <p className="card-title">{profName} — Salaries by City</p>
            <table className="compare-table">
              <thead>
                <tr>
                  <th>{lang === 'es' ? 'Ciudad' : 'City'}</th>
                  <th style={{ textAlign: 'right' }}>{lang === 'es' ? 'Salario Anual (Mid)' : 'Annual Salary (Mid)'}</th>
                  <th style={{ textAlign: 'right' }}>{ui.qualityOfLife}</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(CITIES).map(([cityKey, city]) => {
                  const data = calculateSalaryData(profession, cityKey, 'mid-level');
                  if (!data) return null;
                  const fx = currencyMultipliers[city.currency] || 1;
                  const localAmt = Math.round(data.annualSalaryUSD * fx);
                  return (
                    <tr key={cityKey}>
                      <td>
                        <a href={`/${validLang}/${profession}/${cityKey}`}>
                          {city.names[validLang]}, {city.country[validLang]}
                        </a>
                      </td>
                      <td className="td-num">
                        {new Intl.NumberFormat(lang, { style: 'currency', currency: city.currency, maximumFractionDigits: 0 }).format(localAmt)}
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
