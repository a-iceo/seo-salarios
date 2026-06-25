// app/terms/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Our terms of service and data usage.',
};

export default function TermsPage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/en">Home</a>
            <span aria-hidden>›</span>
            <span aria-current="page">Terms of Service</span>
          </nav>

          <h1>Terms of Service</h1>
        </div>
      </section>

      <div className="salary-page">
        <div className="container">
          <div className="card">
            <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', marginBottom: '1rem' }}>Last Updated: June 2026</p>

            <div style={{ marginTop: '1.5rem' }}>
              <p className="card-title">Data Source</p>
              <p style={{ lineHeight: '1.6' }}>The salaries and cost of living displayed on this website are estimates calculated by an algorithm based on statistical models and public data. We do not guarantee the accuracy of the data.</p>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <p className="card-title">Content Use</p>
              <p style={{ lineHeight: '1.6' }}>The content of this website is for informational purposes only. It should not be considered as financial or professional advice.</p>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <p className="card-title">Limitation of Liability</p>
              <p style={{ lineHeight: '1.6' }}>We are not responsible for decisions made based on the information on this website.</p>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <p className="card-title">Contact</p>
              <p style={{ lineHeight: '1.6' }}>If you have questions, contact us at: healthytrends.shop@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
