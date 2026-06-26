// app/privacy/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — SalaryGlobal',
  description: 'How SalaryGlobal collects, uses, and protects your data. Cookie policy and Google AdSense information.',
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
          <div className="hero-badge"><span>◈</span> Legal</div>
          <h1>Privacy Policy</h1>
          <p>We respect your privacy. Here is exactly what we collect and why.</p>
        </div>
      </section>

      <div className="salary-page">
        <div className="container">

          <div className="card">
            <p style={{ fontSize: '0.9rem', color: 'var(--gray-400)' }}>Last Updated: June 2026 · Applies to seo-salarios.vercel.app and salaryglobal.io</p>

            <div style={{ marginTop: '2rem' }}>
              <p className="card-title">1. Who We Are</p>
              <p style={{ lineHeight: '1.7', color: 'var(--gray-600)', marginTop: '0.75rem' }}>
                SalaryGlobal is an independent informational platform providing algorithmic salary and cost of living estimates. We are not a financial institution, recruiter, or data broker. For questions about this policy, contact us at <a href="mailto:healthytrends.shop@gmail.com" style={{ color: 'var(--accent)' }}>healthytrends.shop@gmail.com</a>.
              </p>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <p className="card-title">2. Data We Collect</p>
              <p style={{ lineHeight: '1.7', color: 'var(--gray-600)', marginTop: '0.75rem' }}>
                We do not require registration or login. We do not collect your name, email address, or any personally identifiable information unless you contact us directly. The only data collected automatically is:
              </p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: '2', color: 'var(--gray-600)' }}>
                <li><strong>Usage data:</strong> pages visited, time on site, browser type, and approximate geographic region (country level only), collected via anonymous analytics.</li>
                <li><strong>Cookies:</strong> small text files stored in your browser to improve site performance and enable advertising features (see Section 4).</li>
              </ul>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <p className="card-title">3. How We Use Your Data</p>
              <p style={{ lineHeight: '1.7', color: 'var(--gray-600)', marginTop: '0.75rem' }}>
                Data collected is used exclusively to: (a) understand how visitors use the site so we can improve it; (b) display relevant advertisements through Google AdSense; and (c) ensure the technical operation of the website. We do not sell, rent, or share your data with third parties for marketing purposes.
              </p>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <p className="card-title">4. Cookies and Google AdSense</p>
              <p style={{ lineHeight: '1.7', color: 'var(--gray-600)', marginTop: '0.75rem' }}>
                This website uses Google AdSense to display advertisements. Google AdSense uses cookies to serve ads based on your prior visits to this and other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet.
              </p>
              <p style={{ lineHeight: '1.7', color: 'var(--gray-600)', marginTop: '0.75rem' }}>
                You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>Google Ads Settings</a>. You can also opt out of third-party vendor cookies by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>aboutads.info</a>.
              </p>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <p className="card-title">5. Your Rights (GDPR & CCPA)</p>
              <p style={{ lineHeight: '1.7', color: 'var(--gray-600)', marginTop: '0.75rem' }}>
                Depending on your location, you may have the right to: access the personal data we hold about you; request deletion of your data; object to data processing for advertising purposes; and lodge a complaint with your local data protection authority. To exercise any of these rights, contact us at <a href="mailto:healthytrends.shop@gmail.com" style={{ color: 'var(--accent)' }}>healthytrends.shop@gmail.com</a>.
              </p>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <p className="card-title">6. Data Retention</p>
              <p style={{ lineHeight: '1.7', color: 'var(--gray-600)', marginTop: '0.75rem' }}>
                Anonymous analytics data is retained for up to 14 months, after which it is automatically deleted. We do not retain personally identifiable information unless you have contacted us directly, in which case your email correspondence is kept for up to 2 years.
              </p>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <p className="card-title">7. Changes to This Policy</p>
              <p style={{ lineHeight: '1.7', color: 'var(--gray-600)', marginTop: '0.75rem' }}>
                We may update this Privacy Policy from time to time. The "Last Updated" date at the top of this page will reflect any changes. Continued use of the site after changes are posted constitutes your acceptance of the updated policy.
              </p>
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--gray-200)' }}>
              <p className="card-title">Contact</p>
              <p style={{ lineHeight: '1.7', color: 'var(--gray-600)', marginTop: '0.75rem' }}>
                For any privacy-related questions: <a href="mailto:healthytrends.shop@gmail.com" style={{ color: 'var(--accent)', fontWeight: 600 }}>healthytrends.shop@gmail.com</a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
