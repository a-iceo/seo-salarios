import fs from 'fs'
import path from 'path'

// Safe path construction
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
  try {
    if (!fs.existsSync(BLOG_DIR)) return []

    const files = fs.readdirSync(BLOG_DIR)
    const slugs = files.filter(file => file.endsWith('.mdx'))

    const posts = slugs.map((fileName) => {
      try {
        const filePath = path.join(BLOG_DIR, fileName)
        const fileContent = fs.readFileSync(filePath, 'utf8')

        // Manual frontmatter parsing
        let content = ''
        const lines = fileContent.split('\n')
        let inFrontmatter = false
        const frontmatterLines: string[] = []

        for (const line of lines) {
          const trimmed = line.trim()
          if (trimmed === '---') {
            inFrontmatter = !inFrontmatter
            continue
          }
          
          if (inFrontmatter) {
            frontmatterLines.push(line)
          } else {
            content += line + '\n'
          }
        }

        // Parse frontmatter
        const metadata: any = {}
        for (const line of frontmatterLines) {
          const trimmed = line.trim()
          if (trimmed && trimmed.includes(':')) {
            const colonIndex = trimmed.indexOf(':')
            const key = trimmed.substring(0, colonIndex).trim()
            let value = trimmed.substring(colonIndex + 1).trim()
            
            // Remove quotes
            if ((value.startsWith('"') && value.endsWith('"')) || 
                (value.startsWith("'") && value.endsWith("'"))) {
              value = value.substring(1, value.length - 1)
            }
            
            metadata[key] = value
          }
        }

        // Defaults
        const slug = fileName.replace('.mdx', '')
        if (!metadata.title) metadata.title = slug
        if (!metadata.description) metadata.description = ''
        if (!metadata.date) metadata.date = new Date().toISOString().split('T')[0]
        if (!metadata.category) metadata.category = 'General'
        if (!metadata.readTime) metadata.readTime = '5 min'

        return {
          slug,
          content: content.trim(),
          title: metadata.title,
          description: metadata.description,
          date: metadata.date,
          category: metadata.category,
          readTime: metadata.readTime,
        }
      } catch (error) {
        console.error(`Error processing file ${fileName}:`, error)
        return null
      }
    }).filter((post): post is BlogPost => post !== null)
      .sort((a, b) => {
        try {
          const dateA = new Date(a.date).getTime()
          const dateB = new Date(b.date).getTime()
          return dateB - dateA
        } catch {
          return 0
        }
      })

    return posts
  } catch (error) {
    console.error('Error loading blog posts:', error)
    return []
  }
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const posts = getAllBlogPosts()
    return posts.find(post => post.slug === slug) || null
  } catch (error) {
    console.error('Error finding blog post:', error)
    return null
  }
}
