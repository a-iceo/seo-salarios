// app/about/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — SalaryGlobal',
  description: 'SalaryGlobal is an independent platform providing algorithmic salary and cost of living estimates for professionals worldwide.',
};

export default function AboutPage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/en">Home</a>
            <span aria-hidden>›</span>
            <span aria-current="page">About Us</span>
          </nav>
          <div className="hero-badge"><span>◈</span> Who We Are</div>
          <h1><em>SalaryGlobal</em> — Salary Transparency for Everyone</h1>
          <p>Independent, algorithmic, and free. No paywalls, no sign-ups.</p>
        </div>
      </section>

      <div className="salary-page">
        <div className="container">

          <div className="card">
            <p className="card-title">Our Mission</p>
            <p style={{ marginTop: '1rem', lineHeight: '1.7', color: 'var(--gray-600)' }}>
              SalaryGlobal was built with a simple idea: salary information should be accessible to everyone, not just those who can afford expensive reports or happen to know the right people. We are an independent platform that combines publicly available labor market data with statistical modeling to give professionals a realistic picture of what they can expect to earn — and spend — in cities around the world.
            </p>
            <p style={{ marginTop: '1rem', lineHeight: '1.7', color: 'var(--gray-600)' }}>
              Whether you are a software engineer considering a relocation to Berlin, a nurse evaluating opportunities in Dubai, or a teacher curious about salaries in Tokyo, our goal is to give you a data-driven starting point for one of the most important decisions of your professional life.
            </p>
          </div>

          <div className="card" style={{ marginTop: 'var(--gap)' }}>
            <p className="card-title">What We Cover</p>
            <div className="stats-grid" style={{ marginTop: '1rem' }}>
              <div className="card stat-card stat-green">
                <div className="stat-value">15</div>
                <div className="stat-label">Professions</div>
                <div className="stat-sub">From software engineers to pharmacists</div>
              </div>
              <div className="card stat-card stat-amber">
                <div className="stat-value">20</div>
                <div className="stat-label">Global Cities</div>
                <div className="stat-sub">Across 4 continents</div>
              </div>
              <div className="card stat-card">
                <div className="stat-value">10</div>
                <div className="stat-label">Languages</div>
                <div className="stat-sub">EN, ES, FR, PT, DE, IT, ZH, RU, JA, HI</div>
              </div>
              <div className="card stat-card">
                <div className="stat-value">4</div>
                <div className="stat-label">Experience Levels</div>
                <div className="stat-sub">Junior to Lead / Principal</div>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginTop: 'var(--gap)' }}>
            <p className="card-title">Who We Are</p>
            <p style={{ marginTop: '1rem', lineHeight: '1.7', color: 'var(--gray-600)' }}>
              SalaryGlobal is an independent project created by a small team of data enthusiasts and developers passionate about labor market transparency. We are not affiliated with any recruiting firm, staffing agency, or financial institution. Our estimates are generated algorithmically and updated regularly to reflect current market conditions.
            </p>
            <p style={{ marginTop: '1rem', lineHeight: '1.7', color: 'var(--gray-600)' }}>
              We believe that transparent salary data helps reduce wage gaps, empowers professionals in negotiations, and enables better career planning across borders. All data on this platform is provided free of charge and without registration.
            </p>
          </div>

          <div className="card" style={{ marginTop: 'var(--gap)' }}>
            <p className="card-title">How Our Data Works</p>
            <p style={{ marginTop: '1rem', lineHeight: '1.7', color: 'var(--gray-600)' }}>
              Our salary estimates are generated using a proprietary algorithm that factors in profession base salaries, city-specific cost of living indices, local tax rates, experience level multipliers, and currency exchange rates. The model is calibrated against publicly available labor market surveys, government statistics, and industry reports from sources including the ILO (International Labour Organization), Eurostat, and national statistics offices.
            </p>
            <p style={{ marginTop: '1rem', lineHeight: '1.7', color: 'var(--gray-600)' }}>
              All figures are estimates and should be used as a reference point rather than a guarantee. Actual salaries vary based on company size, individual negotiation, specific skills, and local market conditions at any given time.
            </p>
          </div>

          <div className="card" style={{ marginTop: 'var(--gap)' }}>
            <p className="card-title">Contact</p>
            <p style={{ marginTop: '1rem', lineHeight: '1.7', color: 'var(--gray-600)' }}>
              We welcome feedback, corrections, and collaboration proposals. If you have found an error in our data or want to suggest a new city or profession, please reach out — we read every message.
            </p>
            <p style={{ marginTop: '1rem', fontSize: '1.05rem' }}>
              📧 <a href="mailto:healthytrends.shop@gmail.com" style={{ color: 'var(--accent)', fontWeight: 600 }}>healthytrends.shop@gmail.com</a>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
