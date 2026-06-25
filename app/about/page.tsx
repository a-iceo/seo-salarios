// app/about/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our algorithmic salary transparency platform.',
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

          <h1>About Us</h1>
        </div>
      </section>

      <div className="salary-page">
        <div className="container">
          <div className="card">
            <p className="card-title">We are an algorithmic platform dedicated to global salary transparency.</p>
            <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>Our goal is to help professionals worldwide make informed decisions about their career and geographic location.</p>
            <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>The data displayed on this website are estimates based on statistical models and public data.</p>

            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--gray-200)' }}>
              <p className="card-title">Contact</p>
              <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
                Email: <a href="mailto:healthytrends.shop@gmail.com" style={{ color: 'var(--accent)' }}>healthytrends.shop@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
