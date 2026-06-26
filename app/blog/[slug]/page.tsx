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

  // Improved MDX/Markdown renderer
  const renderMarkdown = (content: string) => {
    let html = content

    // Handle links [text](url)
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')

    // Bold and italic
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>')

    // Unordered lists (- item)
    html = html.replace(/^- (.*$)/gim, '<li>$1</li>')
    // Wrap lists
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')

    // Ordered lists (1. item)
    html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
    html = html.replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>')

    // Paragraphs
    html = html.split('\n\n').map((block, i) => {
      if (!block.trim()) return ''
      if (block.startsWith('<h') || block.startsWith('<ul') || block.startsWith('<ol')) {
        return block
      }
      return `<p>${block}</p>`
    }).join('')

    return html
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
