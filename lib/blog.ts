import fs from 'fs'
import path from 'path'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  category: string
  content: string
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const slugs = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.mdx'))

  const posts = slugs.map((slug) => {
    const filePath = path.join(BLOG_DIR, slug)
    const fileContent = fs.readFileSync(filePath, 'utf8')

    // Parse frontmatter
    const frontmatterMatch = fileContent.match(/---([\s\S]*?)---/)
    const frontmatter = frontmatterMatch ? frontmatterMatch[1] : ''
    const content = fileContent.replace(/---[\s\S]*?---/, '').trim()

    const parseFrontmatter = (text: string) => {
      const data: Partial<BlogPost> = {}
      const lines = text.trim().split('\n')
      lines.forEach(line => {
        const [key, ...valueParts] = line.split(':')
        if (key && valueParts.length > 0) {
          data[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '')
        }
      })
      return data as Omit<BlogPost, 'slug' | 'content'>
    }

    const metadata = parseFrontmatter(frontmatter)

    return {
      slug: slug.replace('.mdx', ''),
      content,
      ...metadata,
    }
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const posts = getAllBlogPosts()
  return posts.find(post => post.slug === slug) || null
}
