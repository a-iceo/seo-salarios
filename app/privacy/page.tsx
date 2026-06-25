// app/privacy/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Our privacy policy and cookie usage.',
};

export default function PrivacyPage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/en">Home</a>
            <span aria-hidden>›</span>
            <span aria-current="page">Privacy Policy</span>
          </nav>

          <h1>Privacy Policy</h1>
        </div>
      </section>

      <div className="salary-page">
        <div className="container">
          <div className="card">
            <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', marginBottom: '1rem' }}>Last Updated: June 2026</p>

            <div style={{ marginTop: '1.5rem' }}>
              <p className="card-title">Use of Cookies</p>
              <p style={{ lineHeight: '1.6' }}>This website uses cookies to improve user experience and to display personalized ads through Google AdSense.</p>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <p className="card-title">Third-Party Ads</p>
              <p style={{ lineHeight: '1.6' }}>We work with Google AdSense to display relevant ads. Google may use cookies to personalize the ads you see.</p>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <p className="card-title">Personal Data</p>
              <p style={{ lineHeight: '1.6' }}>We do not collect personally identifiable data without your explicit consent.</p>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <p className="card-title">Contact</p>
              <p style={{ lineHeight: '1.6' }}>If you have questions about this policy, contact us at: healthytrends.shop@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
