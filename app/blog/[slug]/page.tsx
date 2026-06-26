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

    // Bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')

    // Process blocks separated by double newlines
    const blocks = html.split('\n\n')
    const processedBlocks = blocks.map(block => {
      if (!block.trim()) return ''

      // Headers
      if (block.startsWith('#')) {
        if (block.startsWith('### ')) return `<h3>${block.slice(4)}</h3>`
        if (block.startsWith('## ')) return `<h2>${block.slice(3)}</h2>`
        if (block.startsWith('# ')) return `<h1>${block.slice(2)}</h1>`
      }

      // Unordered lists (- item)
      const lines = block.split('\n')
      if (lines.every(line => line.trim().startsWith('- '))) {
        const items = lines.map(line => `<li>${line.trim().slice(2)}</li>`).join('')
        return `<ul>${items}</ul>`
      }

      // Ordered lists (1. item)
      if (lines.every(line => /^\d+\. /.test(line.trim()))) {
        const items = lines.map(line => {
          const match = line.trim().match(/^\d+\. (.*)$/)
          return match ? `<li>${match[1]}</li>` : ''
        }).join('')
        return `<ol>${items}</ol>`
      }

      // Paragraph
      return `<p>${block.trim()}</p>`
    })

    return processedBlocks.join('')
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
