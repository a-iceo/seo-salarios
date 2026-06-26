#!/usr/bin/env python3
import os
import json
import argparse
from groq import Groq
from time import sleep
from datetime import datetime, timedelta

# Load environment variables from .env file
def load_env():
    env_path = '.env'
    if os.path.exists(env_path):
        with open(env_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    os.environ[key.strip()] = value.strip()

load_env()

# Initialize Groq client
api_key = os.environ.get('GROQ_API_KEY')
if not api_key:
    raise ValueError("GROQ_API_KEY not found in environment variables or .env file")

client = Groq(api_key=api_key)

# Blog topics
BLOG_TOPICS = [
    {
        "slug": "por-que-desarrollador-berlin-mas-dinero-londres",
        "title": "Por qué un desarrollador en Berlín lleva más dinero a casa que uno en Londres aunque gane menos",
        "category": "Salarios",
        "date": (datetime.now() - timedelta(days=5)).strftime("%Y-%m-%d"),
        "readTime": "8 min",
        "description": "Descubre cómo el coste de vida y los impuestos cambian todo: un ingeniero en Berlín puede tener más poder adquisitivo que uno en Londres con un salario menor.",
    },
    {
        "slug": "10-ciudades-medico-vive-mejor-2026",
        "title": "Las 10 ciudades donde un médico vive mejor en 2026 (no es donde más gana)",
        "category": "Calidad de vida",
        "date": (datetime.now() - timedelta(days=10)).strftime("%Y-%m-%d"),
        "readTime": "10 min",
        "description": "No todo es dinero: analizamos las ciudades donde la combinación de salario, coste de vida y calidad de vida es perfecta para médicos.",
    },
    {
        "slug": "como-negociar-salario-2026-pais",
        "title": "Cómo negociar tu salario en 2026: lo que funciona según el país",
        "category": "Consejos",
        "date": (datetime.now() - timedelta(days=15)).strftime("%Y-%m-%d"),
        "readTime": "7 min",
        "description": "Negociar un salario no es igual en San Francisco que en Madrid o Tokio. Aquí las reglas específicas por país para 2026.",
    },
    {
        "slug": "impuestos-salarios-espana-mexico-argentina-dubai",
        "title": "Impuestos sobre salarios: España vs México vs Argentina vs Dubai comparados",
        "category": "Impuestos",
        "date": (datetime.now() - timedelta(days=20)).strftime("%Y-%m-%d"),
        "readTime": "9 min",
        "description": "Cuánto te quitan realmente de tu sueldo: la comparación que todos los profesionales deberían ver.",
    },
    {
        "slug": "remote-work-salarios-buenos-aires-san-francisco",
        "title": "Remote work y salarios: cuánto puedes ganar trabajando desde Buenos Aires para una empresa de San Francisco",
        "category": "Remote work",
        "date": (datetime.now() - timedelta(days=25)).strftime("%Y-%m-%d"),
        "readTime": "11 min",
        "description": "¿Te pagan el mismo que un empleado local? Analizamos los datos reales de 2026.",
    },
    {
        "slug": "data-scientist-2026-profesion-mejor-pagada",
        "title": "Data Scientist en 2026: la profesión mejor pagada que nadie menciona",
        "category": "Profesiones",
        "date": (datetime.now() - timedelta(days=30)).strftime("%Y-%m-%d"),
        "readTime": "8 min",
        "description": "De las startup de San Francisco a las empresas europeas: cómo el Data Scientist se ha convertido en el rol estrella.",
    },
    {
        "slug": "coste-vida-real-dubai",
        "title": "Coste de vida real en Dubai: lo que no te dicen los rankings",
        "category": "Calidad de vida",
        "date": (datetime.now() - timedelta(days=35)).strftime("%Y-%m-%d"),
        "readTime": "10 min",
        "description": "Apartamentos, comida, transporte: desglose real de lo que cuesta vivir en Dubai en 2026.",
    },
    {
        "slug": "por-que-singapur-paga-mas-nueva-york",
        "title": "Por qué Singapur paga más que Nueva York (y cuesta menos de lo que crees)",
        "category": "Salarios",
        "date": (datetime.now() - timedelta(days=40)).strftime("%Y-%m-%d"),
        "readTime": "9 min",
        "description": "Análisis profundo de por qué Singapur se ha convertido en el nuevo destino favorito de los profesionales tech.",
    },
    {
        "slug": "junior-senior-anios-necesarios-sueldo",
        "title": "Junior a Senior: cuántos años necesitas y cuánto sube tu sueldo en cada ciudad",
        "category": "Consejos",
        "date": (datetime.now() - timedelta(days=45)).strftime("%Y-%m-%d"),
        "readTime": "12 min",
        "description": "Datos de 20 ciudades: cómo evoluciona tu sueldo desde que eres junior hasta que alcanzas el nivel senior.",
    },
    {
        "slug": "profesiones-sobreviven-automatizacion",
        "title": "Las profesiones que mejor sobreviven a la automatización (y cuánto pagan)",
        "category": "Profesiones",
        "date": (datetime.now() - timedelta(days=50)).strftime("%Y-%m-%d"),
        "readTime": "10 min",
        "description": "¿Tu profesión está a salvo? Análisis de las profesiones más y menos vulnerables con datos de salarios.",
    },
]

# Prompt template
BLOG_PROMPT = """Escribe un artículo de blog PERIODÍSTICO y PROFUNDO en español sobre el siguiente tema:

TÍTULO: {title}

REQUISITOS OBLIGATORIOS:
- LONGITUD: 1000-1500 palabras
- TONO: periodístico, serio, bien documentado, NO de chatbot
- ESTRUCTURA:
  - Introducción con gancho fuerte (1-2 párrafos)
  - Secciones con títulos H2 y H3 bien estructurados
  - Al menos UNA TABLA COMPARATIVA usando HTML con clases del sitio (ej: <table class="compare-table">) con DATOS REALES del sitio (ej: salarios de {site_example_1} y {site_example_2})
  - Un CALLOUT (caja resaltada) con dato clave usando la clase CSS <div class="callout">
  - Conclusión con CALL TO ACTION claro hacia el sitio (ej: "Explora los datos actualizados de salarios en [ciudad/profesión]")
- ENLACES INTERNOS: Agrega al menos 3 enlaces internos a URLs del sitio como /es/doctor/dubai, /es/software-engineer/berlin, /es/data-scientist/san-francisco, etc.
- NO USES TAILWIND ni estilos en línea más allá de lo necesario. Usa las clases del sitio.

SITIO WEB: SalaryGlobal - Compara salarios y coste de vida entre ciudades y profesiones del mundo.

IMPORTANTE: Usa datos creíbles, evita jergas innecesarias y escribe como un periodista especializado en economía laboral.

CONTENIDO EXISTENTE DEL SITIO PARA USAR:
- El sitio tiene datos para estas profesiones: software-engineer, data-scientist, product-manager, ux-designer, marketing-manager, financial-analyst, graphic-designer, civil-engineer, nurse, teacher, lawyer, doctor, architect, accountant, chef
- El sitio tiene datos para estas ciudades: new-york, los-angeles, chicago, houston, san-francisco, london, paris, berlin, barcelona, tokyo, dubai, singapore, mexico-city, buenos-aires, madrid, barcelona

¡Comienza el artículo!
"""

def generate_blog_post(topic):
    """Generate a single blog post using Groq API"""
    print(f"Generating article: {topic['title']}...")
    
    try:
        # Pick site examples for this post
        site_examples = [
            "/es/software-engineer/berlin",
            "/es/software-engineer/london", 
            "/es/doctor/dubai",
            "/es/data-scientist/san-francisco"
        ]
        
        prompt = BLOG_PROMPT.format(
            title=topic["title"],
            site_example_1=site_examples[0],
            site_example_2=site_examples[1]
        )

        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "Eres un periodista económico especializado en salarios y mercado laboral global.",
                },
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
            
        print(f"✅ Article written to {output_path}")
        return True
        
    except Exception as e:
        print(f"❌ Error generating article {topic['slug']}: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description='Generate blog articles using Groq API')
    parser.add_argument('--limit', type=int, default=None, help='Limit number of articles to generate')
    args = parser.parse_args()

    # Ensure content/blog directory exists
    os.makedirs(os.path.join('content', 'blog'), exist_ok=True)

    # Get topics to generate
    topics = BLOG_TOPICS[:args.limit] if args.limit else BLOG_TOPICS

    print(f"Generating {len(topics)} blog articles...\n")
    
    success_count = 0
    for i, topic in enumerate(topics, 1):
        print(f"\n[{i}/{len(topics)}]")
        if generate_blog_post(topic):
            success_count += 1
        # Sleep to avoid rate limits
        if i < len(topics):
            sleep(2)
    
    print(f"\n✅ Finished: {success_count}/{len(topics)} articles generated successfully!")

if __name__ == "__main__":
    main()
