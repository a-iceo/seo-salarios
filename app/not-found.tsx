// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <section className="hero" style={{ textAlign: 'center', padding: '8rem 2rem' }}>
        <div className="container">
          <h1 style={{ fontSize: '5rem', margin: 0, color: 'var(--accent)' }}>404</h1>
          <h2>Page Not Found</h2>
          <p>Oops! The page you're looking for doesn't exist.</p>
          <Link href="/" className="home-card" style={{ display: 'inline-block', marginTop: '2rem' }}>
            Go to Home
          </Link>
        </div>
      </section>
    </>
  );
}
