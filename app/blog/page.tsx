import { Metadata } from 'next'
import { getAllBlogPosts } from '../../lib/blog'

export const metadata: Metadata = {
  title: 'Blog | SalaryGlobal',
  description: 'Consejos, guías y análisis sobre salarios y mercado laboral global.',
}

export default function BlogIndex() {
  const posts = getAllBlogPosts()

  return (
    <>
      <section className="hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden>›</span>
            <span aria-current="page">Blog</span>
          </nav>
          <h1>Blog</h1>
          <p>Consejos, guías y análisis sobre salarios y mercado laboral.</p>
        </div>
      </section>

      <div className="salary-page">
        <div className="container">
          <div className="blog-grid">
            {posts.map((post) => (
              <article key={post.slug} className="card blog-card">
                <div className="blog-card-header">
                  <span className="badge badge-amber">{post.category}</span>
                  <time style={{ color: 'var(--gray-500)', fontSize: '0.85rem' }}>
                    {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                </div>
                <h2 className="blog-card-title">
                  <a href={`/blog/${post.slug}`}>{post.title}</a>
                </h2>
                <p className="blog-card-description">{post.description}</p>
                <a href={`/blog/${post.slug}`} className="blog-card-link">
                  Leer más →
                </a>
              </article>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <p className="card-title">No hay artículos todavía</p>
              <p style={{ color: 'var(--gray-600)' }}>¡Volverás pronto!</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
