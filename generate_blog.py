#!/usr/bin/env python3
import os
import argparse
from groq import Groq
from time import sleep
from datetime import datetime, timedelta

# Initialize Groq client
client = Groq(api_key=os.environ.get('GROQ_API_KEY'))

# Blog topics
BLOG_TOPICS = [
    {
        "slug": "por-que-desarrollador-berlin-mas-dinero-londres",
        "title": "Por qué un desarrollador en Berlín lleva más dinero a casa que uno en Londres aunque gane menos",
        "category": "Salarios",
        "date": "2026-06-15",
        "readTime": "10 min",
        "description": "Descubre cómo el coste de vida y los impuestos cambian todo: un ingeniero en Berlín puede tener más poder adquisitivo que uno en Londres con un salario menor.",
    },
    {
        "slug": "10-ciudades-medico-vive-mejor-2026",
        "title": "Las 10 ciudades donde un médico vive mejor en 2026 (no es donde más gana)",
        "category": "Calidad de vida",
        "date": "2026-06-12",
        "readTime": "12 min",
        "description": "No todo es dinero: analizamos las ciudades donde la combinación de salario, coste de vida y calidad de vida es perfecta para médicos.",
    },
    {
        "slug": "como-negociar-salario-2026-pais",
        "title": "Cómo negociar tu salario en 2026: lo que funciona según el país",
        "category": "Consejos",
        "date": "2026-06-10",
        "readTime": "9 min",
        "description": "Negociar un salario no es igual en San Francisco que en Madrid o Tokio. Aquí las reglas específicas por país para 2026.",
    },
    {
        "slug": "impuestos-salarios-espana-mexico-argentina-dubai",
        "title": "Impuestos sobre salarios: España vs México vs Argentina vs Dubai comparados",
        "category": "Impuestos",
        "date": "2026-06-08",
        "readTime": "11 min",
        "description": "Cuánto te quitan realmente de tu sueldo: la comparación que todos los profesionales deben ver.",
    },
    {
        "slug": "remote-work-salarios-buenos-aires-san-francisco",
        "title": "Remote work y salarios: cuánto puedes ganar trabajando desde Buenos Aires para una empresa de San Francisco",
        "category": "Remote work",
        "date": "2026-06-06",
        "readTime": "10 min",
        "description": "¿Te pagan el mismo que un empleado local? Analizamos los datos reales de 2026.",
    },
    {
        "slug": "data-scientist-2026-profesion-mejor-pagada",
        "title": "Data Scientist en 2026: la profesión mejor pagada que nadie menciona",
        "category": "Profesiones",
        "date": "2026-06-04",
        "readTime": "8 min",
        "description": "De las startup de San Francisco a las empresas europeas: cómo el Data Scientist se ha convertido en el rol estrella.",
    },
    {
        "slug": "coste-vida-real-dubai",
        "title": "Coste de vida real en Dubai: lo que no te dicen los rankings",
        "category": "Calidad de vida",
        "date": "2026-06-02",
        "readTime": "10 min",
        "description": "Apartamentos, comida, transporte: desglose real de lo que cuesta vivir en Dubai en 2026.",
    },
    {
        "slug": "por-que-singapur-paga-mas-nueva-york",
        "title": "Por qué Singapur paga más que Nueva York (y cuesta menos de lo que crees)",
        "category": "Salarios",
        "date": "2026-05-30",
        "readTime": "9 min",
        "description": "Análisis profundo de por qué Singapur se ha convertido en el nuevo destino favorito de los profesionales tech.",
    },
    {
        "slug": "junior-senior-anios-necesarios-sueldo",
        "title": "Junior a Senior: cuántos años necesitas y cuánto sube tu sueldo en cada ciudad",
        "category": "Consejos",
        "date": "2026-05-28",
        "readTime": "11 min",
        "description": "Datos de 20 ciudades: cómo evoluciona tu sueldo desde que eres junior hasta que alcanzas el nivel senior.",
    },
    {
        "slug": "profesiones-sobreviven-automatizacion",
        "title": "Las profesiones que mejor sobreviven a la automatización (y cuánto pagan)",
        "category": "Profesiones",
        "date": "2026-05-26",
        "readTime": "10 min",
        "description": "¿Tu profesión está a salvo? Análisis de las profesiones más y menos vulnerables con datos de salarios.",
    },
    {
        "slug": "como-negociar-salario-ingeniero-software",
        "title": "Cómo negociar tu salario como Ingeniero de Software",
        "category": "Salarios",
        "date": "2026-06-20",
        "readTime": "8 min",
        "description": "Aprende las estrategias clave para negociar un salario competitivo en el mercado tecnológico actual.",
    },
]

def generate_blog_post(topic):
    """Generate a single blog post using Groq API"""
    print(f"Generando artículo: {topic['title']}...")

    prompt = f"""Escribe un artículo periodístico profesional de exactamente 1200-1500 palabras en español neutro latinoamericano sobre {topic['title']}.

Estructura obligatoria:
- Párrafo de apertura con dato sorprendente o contraintuitivo
- Al menos 4 secciones H2 con desarrollo profundo
- Al menos 2 subsecciones H3
- Una tabla comparativa con datos reales
- Un bloque callout con el dato más importante
- Ejemplos concretos con números específicos
- Conclusión con llamada a la acción
- Tono: New York Times, no blog genérico
- SIN bullets innecesarios, prosa fluida y rica

Recuerda incluir enlaces internos a URLs como /es/doctor/madrid o /es/software-engineer/berlin, y usa el bloque callout con la clase CSS callout: <div class="callout">...</div>.
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

        # Build the MDX file
        mdx_content = f"""---
title: "{topic['title']}"
description: "{topic['description']}"
date: "{topic['date']}"
category: "{topic['category']}"
readTime: "{topic['readTime']}"
---

{content}
"""

        # Write the file
        output_path = os.path.join('content', 'blog', f"{topic['slug']}.mdx")
        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(mdx_content)

        print(f"✅ Artículo guardado en {output_path}")
        return True

    except Exception as e:
        print(f"❌ Error generando artículo {topic['slug']}: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description='Genera artículos de blog con la API de Groq')
    parser.add_argument('--limit', type=int, default=None, help='Limita el número de artículos a generar')
    args = parser.parse_args()

    # Ensure content/blog directory exists
    os.makedirs(os.path.join('content', 'blog'), exist_ok=True)

    # Get topics to generate
    topics = BLOG_TOPICS[:args.limit] if args.limit else BLOG_TOPICS

    print(f"Generando {len(topics)} artículos de blog...\n")

    success_count = 0
    for i, topic in enumerate(topics, 1):
        print(f"\n[{i}/{len(topics)}]")
        if generate_blog_post(topic):
            success_count += 1
        # Sleep to avoid rate limits
        if i < len(topics):
            sleep(2)

    print(f"\n✅ Listo! {success_count}/{len(topics)} artículos generados correctamente.")

if __name__ == "__main__":
    main()
