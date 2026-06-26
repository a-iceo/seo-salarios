import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getAllBlogPosts } from '../../../lib/blog'

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug)
  if (!post) {
    return { title: 'Artículo no encontrado' }
  }

  return {
    title: `${post.title} | SalaryGlobal`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug)
  if (!post) notFound()

  // Simple MDX/Markdown renderer
  const renderMarkdown = (content: string) => {
    // First handle inline formatting
    let html = content
      // Links [text](url)
      .replace(/\[([^\]]*)\]\(([^)]*)\)/g, '<a href="$2">$1</a>')
      // Bold
      .replace(/\*\*([^*]*)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*([^*]*)\*/g, '<em>$1</em>')

    // Split into blocks
    const blocks = html.split('\n\n')
    const result: string[] = []

    for (const block of blocks) {
      const trimmed = block.trim()
      if (!trimmed) continue

      // Check for headers
      if (trimmed.startsWith('### ')) {
        result.push(`<h3>${trimmed.slice(4)}</h3>`)
      } else if (trimmed.startsWith('## ')) {
        result.push(`<h2>${trimmed.slice(3)}</h2>`)
      } else if (trimmed.startsWith('# ')) {
        result.push(`<h1>${trimmed.slice(2)}</h1>`)
      } else {
        // Treat as paragraph
        result.push(`<p>${trimmed}</p>`)
      }
    }

    return result.join('')
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    publisher: {
      '@type': 'Organization',
      name: 'SalaryGlobal',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden>›</span>
            <a href="/blog">Blog</a>
            <span aria-hidden>›</span>
            <span aria-current="page">{post.title}</span>
          </nav>
          <div style={{ marginTop: '1.5rem' }}>
            <span className="badge badge-amber">{post.category}</span>
            <time style={{ color: 'var(--gray-500)', fontSize: '0.9rem', marginLeft: '0.75rem' }}>
              {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          </div>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
        </div>
      </section>

      <div className="salary-page">
        <div className="container" style={{ maxWidth: '768px' }}>
          <article className="card blog-content" style={{ padding: '2rem' }}>
            <div dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
          </article>

          <div className="card" style={{ marginTop: 'var(--gap)' }}>
            <p className="card-title">Explora salarios</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <a href="/en/software-engineer/new-york" className="badge badge-green">
                Ingeniero de Software en NY
              </a>
              <a href="/es/ingeniero-de-software/barcelona" className="badge badge-amber">
                Ingeniero de Software en Barcelona
              </a>
              <a href="/en/data-scientist/san-francisco" className="badge badge-navy">
                Data Scientist en SF
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
