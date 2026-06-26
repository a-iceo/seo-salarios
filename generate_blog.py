#!/usr/bin/env python3
import os
import argparse
from groq import Groq
from time import sleep

# Initialize Groq client
client = Groq(api_key=os.environ.get('GROQ_API_KEY'))

# 25 Blog topics
BLOG_TOPICS = [
    {
        "slug": "berlin-vs-london-developer-salary",
        "title": "Por qué un desarrollador en Berlín lleva más dinero a casa que uno en Londres aunque gane menos",
        "category": "Salarios",
        "date": "2026-06-15",
        "readTime": "10 min",
        "description": "Descubre cómo el coste de vida y los impuestos cambian todo: un ingeniero en Berlín puede tener más poder adquisitivo que uno en Londres con un salario menor.",
    },
    {
        "slug": "10-cities-doctor-best-life-2026",
        "title": "Las 10 ciudades donde un médico vive mejor en 2026 (no es donde más gana)",
        "category": "Calidad de vida",
        "date": "2026-06-12",
        "readTime": "12 min",
        "description": "No todo es dinero: analizamos las ciudades donde la combinación de salario, coste de vida y calidad de vida es perfecta para médicos.",
    },
    {
        "slug": "negotiate-salary-2026-country-guide",
        "title": "Cómo negociar tu salario en 2026: lo que funciona según el país",
        "category": "Consejos",
        "date": "2026-06-10",
        "readTime": "9 min",
        "description": "Negociar un salario no es igual en San Francisco que en Madrid o Tokio. Aquí las reglas específicas por país para 2026.",
    },
    {
        "slug": "taxes-salary-spain-mexico-argentina-dubai",
        "title": "Impuestos sobre salarios: España vs México vs Argentina vs Dubai comparados",
        "category": "Impuestos",
        "date": "2026-06-08",
        "readTime": "11 min",
        "description": "Cuánto te quitan realmente de tu sueldo: la comparación que todos los profesionales deben ver.",
    },
    {
        "slug": "remote-work-salary-buenos-aires-san-francisco",
        "title": "Remote work y salarios: cuánto puedes ganar trabajando desde Buenos Aires para una empresa de San Francisco",
        "category": "Remote work",
        "date": "2026-06-06",
        "readTime": "10 min",
        "description": "¿Te pagan el mismo que un empleado local? Analizamos los datos reales de 2026.",
    },
    {
        "slug": "data-scientist-2026-best-paid-job",
        "title": "Data Scientist en 2026: la profesión mejor pagada que nadie menciona",
        "category": "Profesiones",
        "date": "2026-06-04",
        "readTime": "8 min",
        "description": "De las startup de San Francisco a las empresas europeas: cómo el Data Scientist se ha convertido en el rol estrella.",
    },
    {
        "slug": "real-cost-living-dubai-2026",
        "title": "Coste de vida real en Dubai: lo que no te dicen los rankings",
        "category": "Calidad de vida",
        "date": "2026-06-02",
        "readTime": "10 min",
        "description": "Apartamentos, comida, transporte: desglose real de lo que cuesta vivir en Dubai en 2026.",
    },
    {
        "slug": "singapore-pays-more-new-york-2026",
        "title": "Por qué Singapur paga más que Nueva York (y cuesta menos de lo que crees)",
        "category": "Salarios",
        "date": "2026-05-30",
        "readTime": "9 min",
        "description": "Análisis profundo de por qué Singapur se ha convertido en el nuevo destino favorito de los profesionales tech.",
    },
    {
        "slug": "junior-to-senior-years-salary-increase",
        "title": "Junior a Senior: cuántos años necesitas y cuánto sube tu sueldo en cada ciudad",
        "category": "Consejos",
        "date": "2026-05-28",
        "readTime": "11 min",
        "description": "Datos de 20 ciudades: cómo evoluciona tu sueldo desde que eres junior hasta que alcanzas el nivel senior.",
    },
    {
        "slug": "jobs-survive-automation-2026",
        "title": "Las profesiones que mejor sobreviven a la automatización (y cuánto pagan)",
        "category": "Profesiones",
        "date": "2026-05-26",
        "readTime": "10 min",
        "description": "¿Tu profesión está a salvo? Análisis de las profesiones más y menos vulnerables con datos de salarios.",
    },
    {
        "slug": "tokyo-tech-salary-cost-living-2026",
        "title": "Tokio en 2026: salarios de tech vs coste de vida real",
        "category": "Salarios",
        "date": "2026-06-20",
        "readTime": "10 min",
        "description": "Es Tokio tan caro como dicen? Analizamos salarios reales y gastos para profesionales de la tecnología.",
    },
    {
        "slug": "product-manager-salaries-10-cities-2026",
        "title": "Product Manager: salarios en 10 ciudades globales comparados",
        "category": "Salarios",
        "date": "2026-06-18",
        "readTime": "8 min",
        "description": "Cuánto gana un Product Manager en San Francisco, Londres, Berlín y otras ciudades clave en 2026.",
    },
    {
        "slug": "ux-designer-salary-cost-living-comparison",
        "title": "UX Designer: salario vs coste de vida en 8 ciudades",
        "category": "Salarios",
        "date": "2026-06-16",
        "readTime": "9 min",
        "description": "Dónde rinde más tu sueldo como UX Designer: comparativa detallada con datos reales de 2026.",
    },
    {
        "slug": "nurse-salary-world-2026-best-cities",
        "title": "Enfermera en 2026: salarios y calidad de vida en 12 ciudades",
        "category": "Profesiones",
        "date": "2026-06-14",
        "readTime": "11 min",
        "description": "Las mejores ciudades del mundo para trabajar como enfermera: salarios, coste de vida y condiciones laborales.",
    },
    {
        "slug": "lawyer-salaries-global-comparison-2026",
        "title": "Abogado en 2026: cuánto ganas en Nueva York, Londres y Dubái comparados",
        "category": "Profesiones",
        "date": "2026-06-13",
        "readTime": "10 min",
        "description": "Desglose completo de salarios y coste de vida para abogados en las principales ciudades del mundo.",
    },
    {
        "slug": "software-engineer-remote-salary-guide",
        "title": "Ingeniero de Software: guía completa de salarios en remoto en 2026",
        "category": "Remote work",
        "date": "2026-06-11",
        "readTime": "9 min",
        "description": "Cuánto puedes ganar como desarrollador remoto según la ubicación de la empresa y la tuya propia.",
    },
    {
        "slug": "mexico-city-tech-salaries-2026",
        "title": "Ciudad de México: salarios de tech y coste de vida en 2026",
        "category": "Salarios",
        "date": "2026-06-09",
        "readTime": "8 min",
        "description": "Es México City un destino atractivo para profesionales de la tecnología? Analizamos datos reales.",
    },
    {
        "slug": "amsterdam-tech-salary-cost-living",
        "title": "Amsterdam: salarios de tech vs coste de vida en 2026",
        "category": "Salarios",
        "date": "2026-06-07",
        "readTime": "9 min",
        "description": "Qué tan caro es realmente Amsterdam para un profesional de la tecnología? Datos de salarios y gastos.",
    },
    {
        "slug": "sydney-doctor-salary-quality-life-2026",
        "title": "Sídney en 2026: salario de médico vs coste de vida real",
        "category": "Calidad de vida",
        "date": "2026-06-05",
        "readTime": "10 min",
        "description": "Vale la pena trabajar como médico en Australia? Analizamos salarios y gastos realistas.",
    },
    {
        "slug": "toronto-tech-salary-cost-living-2026",
        "title": "Toronto: salarios de tech y calidad de vida en 2026",
        "category": "Salarios",
        "date": "2026-06-03",
        "readTime": "8 min",
        "description": "Es Toronto una alternativa a San Francisco y Nueva York para profesionales tecnológicos?",
    },
    {
        "slug": "madrid-salaries-tech-professionals-2026",
        "title": "Madrid en 2026: salarios para profesionales de tech y coste de vida",
        "category": "Salarios",
        "date": "2026-06-01",
        "readTime": "9 min",
        "description": "Cuánto ganan y cuánto gastan los profesionales de la tecnología en Madrid en 2026.",
    },
    {
        "slug": "mumbai-doctor-salary-cost-living-2026",
        "title": "Mumbai: salario de médico y coste de vida real en 2026",
        "category": "Calidad de vida",
        "date": "2026-05-31",
        "readTime": "10 min",
        "description": "Qué tan atractiva es India como destino para médicos? Analizamos datos de salarios y gastos.",
    },
    {
        "slug": "beijing-tech-salary-cost-living-2026",
        "title": "Beijing: salarios de tech vs coste de vida en 2026",
        "category": "Salarios",
        "date": "2026-05-29",
        "readTime": "8 min",
        "description": "Cuánto ganan los profesionales de la tecnología en China y cómo es el coste de vida.",
    },
    {
        "slug": "rome-doctor-salary-cost-living-2026",
        "title": "Roma en 2026: salario de médico y calidad de vida",
        "category": "Calidad de vida",
        "date": "2026-05-27",
        "readTime": "10 min",
        "description": "Es Italia un buen destino para médicos? Analizamos salarios reales y coste de vida.",
    },
    {
        "slug": "moscow-tech-salary-cost-living-2026",
        "title": "Moscú: salarios de tech y coste de vida en 2026",
        "category": "Salarios",
        "date": "2026-05-25",
        "readTime": "9 min",
        "description": "Qué tan atractiva es Rusia como destino para profesionales de la tecnología? Datos de 2026.",
    },
]

def generate_blog_post(topic):
    """Generate a single blog post using Groq API"""
    print(f"Generando artículo: {topic['title']}...")

    prompt = f"""Escribe un artículo periodístico profesional de 1200-1500 palabras en español neutro latinoamericano sobre {topic['title']}.

Estructura obligatoria:
- Párrafo de apertura con dato sorprendente o contraintuitivo
- Al menos 4 secciones H2 con desarrollo profundo
- Al menos 2 subsecciones H3
- Una tabla comparativa con datos reales
- Un bloque callout con el dato más importante usando <div class="callout">...</div>
- Ejemplos concretos con números específicos
- Conclusión con llamada a la acción
- Tono: New York Times, profesional, claro y riguroso
- Enlaces internos a URLs válidas del sitio como /es/software-engineer/berlin o /es/data-scientist/san-francisco
- NO uses bullets, solo prosa fluida y bien estructurada
"""

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama-3.3-70b-versatile",
            temperature=0.7,
            max_tokens=4096,
        )

        content = chat_completion.choices[0].message.content.strip()
        return content

    except Exception as e:
        print(f"❌ Error generando artículo {topic['slug']}: {e}")
        return None

def update_lib_blog(posts_data):
    """Update lib/blog.ts with generated posts"""
    lib_path = os.path.join('lib', 'blog.ts')
    
    # Build the TypeScript content
    ts_content = "// Auto-generated blog data\n"
    ts_content += "export interface BlogPost {\n"
    ts_content += "  slug: string\n"
    ts_content += "  title: string\n"
    ts_content += "  description: string\n"
    ts_content += "  date: string\n"
    ts_content += "  category: string\n"
    ts_content += "  readTime?: string\n"
    ts_content += "  content: string\n"
    ts_content += "}\n\n"
    
    ts_content += "export const BLOG_POSTS: BlogPost[] = [\n"
    for post in posts_data:
        escaped_content = post['content'].replace('`', '\\`').replace('${', '\\${')
        ts_content += "  {\n"
        ts_content += f"    slug: '{post['slug']}',\n"
        ts_content += f"    title: '{post['title']}',\n"
        ts_content += f"    description: '{post['description']}',\n"
        ts_content += f"    date: '{post['date']}',\n"
        ts_content += f"    category: '{post['category']}',\n"
        ts_content += f"    readTime: '{post['readTime']}',\n"
        ts_content += f"    content: `{escaped_content}`,\n"
        ts_content += "  },\n"
    ts_content += "]\n\n"
    ts_content += "export function getAllBlogPosts(): BlogPost[] {\n"
    ts_content += "  return [...BLOG_POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())\n"
    ts_content += "}\n\n"
    ts_content += "export function getBlogPostBySlug(slug: string): BlogPost | null {\n"
    ts_content += "  return BLOG_POSTS.find(post => post.slug === slug) || null\n"
    ts_content += "}\n"
    
    with open(lib_path, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    
    print(f"✅ Actualizado {lib_path}")

def main():
    parser = argparse.ArgumentParser(description='Genera artículos de blog con la API de Groq')
    parser.add_argument('--limit', type=int, default=None, help='Limita el número de artículos a generar')
    args = parser.parse_args()

    topics = BLOG_TOPICS[:args.limit] if args.limit else BLOG_TOPICS

    print(f"Generando {len(topics)} artículos de blog...\n")

    posts_data = []
    for i, topic in enumerate(topics, 1):
        print(f"\n[{i}/{len(topics)}]")
        content = generate_blog_post(topic)
        if content:
            post_data = topic.copy()
            post_data['content'] = content
            posts_data.append(post_data)
        if i < len(topics):
            sleep(2)
    
    if posts_data:
        update_lib_blog(posts_data)
    
    print(f"\n✅ Listo! {len(posts_data)}/{len(topics)} artículos generados correctamente.")

if __name__ == "__main__":
    main()
