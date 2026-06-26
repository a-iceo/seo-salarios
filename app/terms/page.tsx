// app/terms/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — SalaryGlobal',
  description: 'Terms of service for SalaryGlobal. Data sources, content use, and limitation of liability.',
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
          <div className="hero-badge"><span>◈</span> Legal</div>
          <h1>Terms of Service</h1>
          <p>Please read these terms before using SalaryGlobal.</p>
        </div>
      </section>

      <div className="salary-page">
        <div className="container">

          <div className="card">
            <p style={{ fontSize: '0.9rem', color: 'var(--gray-400)' }}>Last Updated: June 2026 · Applies to seo-salarios.vercel.app and salaryglobal.io</p>

            <div style={{ marginTop: '2rem' }}>
              <p className="card-title">1. Acceptance of Terms</p>
              <p style={{ lineHeight: '1.7', color: 'var(--gray-600)', marginTop: '0.75rem' }}>
                By accessing or using SalaryGlobal, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use this website. We reserve the right to update these terms at any time; continued use of the site constitutes acceptance of the updated terms.
              </p>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <p className="card-title">2. Nature of the Data</p>
              <p style={{ lineHeight: '1.7', color: 'var(--gray-600)', marginTop: '0.75rem' }}>
                All salary figures, cost of living estimates, tax rates, and quality of life indices displayed on SalaryGlobal are <strong>algorithmic estimates</strong> generated from statistical models calibrated against publicly available data. They are not sourced from direct employer surveys or verified individual salary disclosures.
              </p>
              <p style={{ lineHeight: '1.7', color: 'var(--gray-600)', marginTop: '0.75rem' }}>
                Actual compensation varies significantly based on employer, company size, individual skills and experience, specific role responsibilities, negotiation outcomes, and local market conditions. The figures on this site should be used as a general reference point only.
              </p>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <p className="card-title">3. Informational Purpose Only</p>
              <p style={{ lineHeight: '1.7', color: 'var(--gray-600)', marginTop: '0.75rem' }}>
                The content on SalaryGlobal is provided for <strong>informational purposes only</strong>. It does not constitute financial advice, career counseling, legal advice, immigration guidance, or any other form of professional advisory service. We strongly recommend consulting qualified professionals before making any significant career or relocation decisions.
              </p>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <p className="card-title">4. Intellectual Property</p>
              <p style={{ lineHeight: '1.7', color: 'var(--gray-600)', marginTop: '0.75rem' }}>
                The design, structure, algorithms, and written content of SalaryGlobal are the property of SalaryGlobal and may not be reproduced, distributed, or used commercially without prior written permission. You may share links to individual pages for personal or educational purposes.
              </p>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <p className="card-title">5. Third-Party Services</p>
              <p style={{ lineHeight: '1.7', color: 'var(--gray-600)', marginTop: '0.75rem' }}>
                This website uses third-party services including Google AdSense for advertising and Vercel for hosting. These services have their own terms of service and privacy policies, which we encourage you to review. SalaryGlobal is not responsible for the practices of these third-party providers.
              </p>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <p className="card-title">6. Limitation of Liability</p>
              <p style={{ lineHeight: '1.7', color: 'var(--gray-600)', marginTop: '0.75rem' }}>
                SalaryGlobal and its operators shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of, or inability to use, this website or its data. This includes but is not limited to financial losses, career decisions, or relocation costs based on information found on this site.
              </p>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <p className="card-title">7. Availability</p>
              <p style={{ lineHeight: '1.7', color: 'var(--gray-600)', marginTop: '0.75rem' }}>
                We strive to maintain high availability but do not guarantee uninterrupted access to the site. We reserve the right to modify, suspend, or discontinue any part of the service at any time without prior notice.
              </p>
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--gray-200)' }}>
              <p className="card-title">Contact</p>
              <p style={{ lineHeight: '1.7', color: 'var(--gray-600)', marginTop: '0.75rem' }}>
                For questions about these terms: <a href="mailto:healthytrends.shop@gmail.com" style={{ color: 'var(--accent)', fontWeight: 600 }}>healthytrends.shop@gmail.com</a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
