import fs from 'fs'
import path from 'path'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  category: string
  readTime?: string
  content: string
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const slugs = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.mdx'))

  const posts = slugs.map((slug) => {
    const filePath = path.join(BLOG_DIR, slug)
    const fileContent = fs.readFileSync(filePath, 'utf8')

    // Manual frontmatter parsing without complex regex
    let frontmatter = ''
    let content = ''
    const lines = fileContent.split('\n')
    let inFrontmatter = false
    let frontmatterLines: string[] = []

    for (const line of lines) {
      if (line.trim() === '---') {
        if (!inFrontmatter) {
          inFrontmatter = true
        } else {
          inFrontmatter = false
        }
        continue
      }
      
      if (inFrontmatter) {
        frontmatterLines.push(line)
      } else {
        content += line + '\n'
      }
    }

    // Parse frontmatter key-value pairs
    const metadata: any = {}
    for (const line of frontmatterLines) {
      const trimmed = line.trim()
      if (trimmed && trimmed.includes(':')) {
        const colonIndex = trimmed.indexOf(':')
        const key = trimmed.substring(0, colonIndex).trim()
        let value = trimmed.substring(colonIndex + 1).trim()
        // Remove quotes
        if (value.startsWith('"') && value.endsWith('"') || value.startsWith("'") && value.endsWith("'")) {
          value = value.substring(1, value.length - 1)
        }
        metadata[key] = value
      }
    }

    // Default values
    if (!metadata.title) metadata.title = slug.replace('.mdx', '')
    if (!metadata.description) metadata.description = ''
    if (!metadata.date) metadata.date = new Date().toISOString().split('T')[0]
    if (!metadata.category) metadata.category = 'General'
    if (!metadata.readTime) metadata.readTime = '5 min'

    return {
      slug: slug.replace('.mdx', ''),
      content: content.trim(),
      title: metadata.title,
      description: metadata.description,
      date: metadata.date,
      category: metadata.category,
      readTime: metadata.readTime,
    }
  }).sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA
  })

  return posts
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const posts = getAllBlogPosts()
  return posts.find(post => post.slug === slug) || null
}
