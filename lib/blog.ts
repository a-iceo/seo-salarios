// Simple blog data - no errors!
export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  category: string
  readTime?: string
  content: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'berlin-vs-london',
    title: 'Por qué un desarrollador en Berlín gana más dinero neto que en Londres',
    description: 'Coste de vida, impuestos y más.',
    date: '2026-06-15',
    category: 'Salarios',
    readTime: '5 min',
    content: `# Por qué un desarrollador en Berlín gana más dinero neto que en Londres

En 2026, un ingeniero en Berlín tiene más poder adquisitivo que uno en Londres con un salario menor.

## El factor clave: la vivienda

En Londres, un apartamento de 1 habitación cuesta 3.200€/mes. En Berlín, solo 1.500€/mes.

<div class="callout">
<p>Un desarrollador en Berlín gasta el 18% de su sueldo en vivienda, en Londres el 42%.</p>
</div>

Y para ver salarios reales, visita [ingenieros de software en Berlín](/es/software-engineer/berlin).`
  },
  {
    slug: 'data-scientist-salary',
    title: 'Data Scientist en 2026: la profesión mejor pagada',
    description: 'Salarios por ciudad y más.',
    date: '2026-06-04',
    category: 'Profesiones',
    readTime: '5 min',
    content: `# Data Scientist en 2026: la profesión mejor pagada

El Data Scientist es uno de los roles mejor pagados en tech en 2026.

## Salarios globales

En San Francisco: 180.000€/año. En Berlín: 105.000€/año.

Y para ver más, visita [Data Scientists en San Francisco](/es/data-scientist/san-francisco).`
  }
]

export function getAllBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  return BLOG_POSTS.find(post => post.slug === slug) || null
}
