#!/usr/bin/env python3
import os
import json
import argparse
from groq import Groq
from time import sleep
from tqdm import tqdm

# Importar configuraciones del proyecto (adaptadas a Python)
SUPPORTED_LANGS = ['en', 'es', 'fr', 'de', 'pt', 'it', 'nl', 'pl', 'ru', 'ja']
PROFESSIONS = {
    'software-engineer': {'en': 'Software Engineer', 'es': 'Ingeniero de Software', 'fr': 'Ingénieur Logiciel', 'de': 'Softwareentwickler', 'pt': 'Engenheiro de Software', 'it': 'Ingegnere del Software', 'nl': 'Software Engineer', 'pl': 'Inżynier Oprogramowania', 'ru': 'Инженер-программист', 'ja': 'ソフトウェアエンジニア'},
    'data-scientist': {'en': 'Data Scientist', 'es': 'Científico de Datos', 'fr': 'Data Scientist', 'de': 'Data Scientist', 'pt': 'Cientista de Dados', 'it': 'Data Scientist', 'nl': 'Data Scientist', 'pl': 'Data Scientist', 'ru': 'Дата-сайентист', 'ja': 'データサイエンティスト'},
    'product-manager': {'en': 'Product Manager', 'es': 'Jefe de Producto', 'fr': 'Chef de Produit', 'de': 'Produktmanager', 'pt': 'Gerente de Produto', 'it': 'Product Manager', 'nl': 'Product Manager', 'pl': 'Product Manager', 'ru': 'Менеджер по продукту', 'ja': 'プロダクトマネージャー'},
    'ux-designer': {'en': 'UX Designer', 'es': 'Diseñador UX', 'fr': 'Designer UX', 'de': 'UX Designer', 'pt': 'Designer UX', 'it': 'UX Designer', 'nl': 'UX Designer', 'pl': 'UX Designer', 'ru': 'UX дизайнер', 'ja': 'UXデザイナー'},
    'marketing-manager': {'en': 'Marketing Manager', 'es': 'Jefe de Marketing', 'fr': 'Directeur Marketing', 'de': 'Marketing Manager', 'pt': 'Gerente de Marketing', 'it': 'Marketing Manager', 'nl': 'Marketing Manager', 'pl': 'Marketing Manager', 'ru': 'Маркетолог', 'ja': 'マーケティングマネージャー'},
    'financial-analyst': {'en': 'Financial Analyst', 'es': 'Analista Financiero', 'fr': 'Analyste Financier', 'de': 'Finanzanalyst', 'pt': 'Analista Financeiro', 'it': 'Analista Finanziario', 'nl': 'Financieel Analist', 'pl': 'Analityk Finansowy', 'ru': 'Финансовый аналитик', 'ja': 'ファイナンシャルアナリスト'},
    'graphic-designer': {'en': 'Graphic Designer', 'es': 'Diseñador Gráfico', 'fr': 'Graphiste', 'de': 'Grafikdesigner', 'pt': 'Designer Gráfico', 'it': 'Grafico', 'nl': 'Grafisch Ontwerper', 'pl': 'Grafik', 'ru': 'Графический дизайнер', 'ja': 'グラフィックデザイナー'},
    'civil-engineer': {'en': 'Civil Engineer', 'es': 'Ingeniero Civil', 'fr': 'Ingénieur Civil', 'de': 'Bauingenieur', 'pt': 'Engenheiro Civil', 'it': 'Ingegnere Civile', 'nl': 'Bouwkundig Ingenieur', 'pl': 'Inżynier Budowlany', 'ru': 'Строительный инженер', 'ja': '土木技術者'},
    'nurse': {'en': 'Nurse', 'es': 'Enfermero/a', 'fr': 'Infirmière', 'de': 'Krankenschwester', 'pt': 'Enfermeiro/a', 'it': 'Infermiere/a', 'nl': 'Verpleegkundige', 'pl': 'Pielęgniarz/a', 'ru': 'Медсестра', 'ja': '看護師'},
    'teacher': {'en': 'Teacher', 'es': 'Profesor/a', 'fr': 'Professeur/e', 'de': 'Lehrer/in', 'pt': 'Professor/a', 'it': 'Insegnante', 'nl': 'Leraar/Lerares', 'pl': 'Nauczyciel/Nauczycielka', 'ru': 'Учитель', 'ja': '教師'},
    'lawyer': {'en': 'Lawyer', 'es': 'Abogado/a', 'fr': 'Avocat/e', 'de': 'Anwalt/Anwältin', 'pt': 'Advogado/a', 'it': 'Avvocato/a', 'nl': 'Advocaat', 'pl': 'Prawnik', 'ru': 'Юрист', 'ja': '弁護士'},
    'doctor': {'en': 'Doctor', 'es': 'Médico/a', 'fr': 'Médecin', 'de': 'Arzt/Ärztin', 'pt': 'Médico/a', 'it': 'Medico/a', 'nl': 'Arts', 'pl': 'Lekarz', 'ru': 'Врач', 'ja': '医師'},
    'architect': {'en': 'Architect', 'es': 'Arquitecto/a', 'fr': 'Architecte', 'de': 'Architekt/in', 'pt': 'Arquiteto/a', 'it': 'Architetto/a', 'nl': 'Architect', 'pl': 'Architekt', 'ru': 'Архитектор', 'ja': '建築家'},
    'accountant': {'en': 'Accountant', 'es': 'Contador/a', 'fr': 'Comptable', 'de': 'Buchhalter/in', 'pt': 'Contador/a', 'it': 'Contabile', 'nl': 'Accountant', 'pl': 'Księgowy', 'ru': 'Бухгалтер', 'ja': '会計士'},
    'chef': {'en': 'Chef', 'es': 'Chef', 'fr': 'Chef', 'de': 'Koch', 'pt': 'Chef', 'it': 'Chef', 'nl': 'Kok', 'pl': 'Kucharz', 'ru': 'Шеф-повар', 'ja': 'シェフ'},
}

CITIES = {
    'new-york': {'en': 'New York', 'es': 'Nueva York', 'fr': 'New York', 'de': 'New York', 'pt': 'Nova York', 'it': 'New York', 'nl': 'New York', 'pl': 'Nowy Jork', 'ru': 'Нью-Йорк', 'ja': 'ニューヨーク'},
    'los-angeles': {'en': 'Los Angeles', 'es': 'Los Ángeles', 'fr': 'Los Angeles', 'de': 'Los Angeles', 'pt': 'Los Angeles', 'it': 'Los Angeles', 'nl': 'Los Angeles', 'pl': 'Los Angeles', 'ru': 'Лос-Анджелес', 'ja': 'ロサンゼルス'},
    'chicago': {'en': 'Chicago', 'es': 'Chicago', 'fr': 'Chicago', 'de': 'Chicago', 'pt': 'Chicago', 'it': 'Chicago', 'nl': 'Chicago', 'pl': 'Chicago', 'ru': 'Чикаго', 'ja': 'シカゴ'},
    'houston': {'en': 'Houston', 'es': 'Houston', 'fr': 'Houston', 'de': 'Houston', 'pt': 'Houston', 'it': 'Houston', 'nl': 'Houston', 'pl': 'Houston', 'ru': 'Хьюстон', 'ja': 'ヒューストン'},
    'san-francisco': {'en': 'San Francisco', 'es': 'San Francisco', 'fr': 'San Francisco', 'de': 'San Francisco', 'pt': 'San Francisco', 'it': 'San Francisco', 'nl': 'San Francisco', 'pl': 'San Francisco', 'ru': 'Сан-Франциско', 'ja': 'サンフランシスコ'},
    'london': {'en': 'London', 'es': 'Londres', 'fr': 'Londres', 'de': 'London', 'pt': 'Londres', 'it': 'Londra', 'nl': 'Londen', 'pl': 'Londyn', 'ru': 'Лондон', 'ja': 'ロンドン'},
    'paris': {'en': 'Paris', 'es': 'París', 'fr': 'Paris', 'de': 'Paris', 'pt': 'Paris', 'it': 'Parigi', 'nl': 'Parijs', 'pl': 'Paryż', 'ru': 'Париж', 'ja': 'パリ'},
    'berlin': {'en': 'Berlin', 'es': 'Berlín', 'fr': 'Berlin', 'de': 'Berlin', 'pt': 'Berlim', 'it': 'Berlino', 'nl': 'Berlijn', 'pl': 'Berlin', 'ru': 'Берлин', 'ja': 'ベルリン'},
    'barcelona': {'en': 'Barcelona', 'es': 'Barcelona', 'fr': 'Barcelone', 'de': 'Barcelona', 'pt': 'Barcelona', 'it': 'Barcellona', 'nl': 'Barcelona', 'pl': 'Barcelona', 'ru': 'Барселона', 'ja': 'バルセロナ'},
    'tokyo': {'en': 'Tokyo', 'es': 'Tokio', 'fr': 'Tokyo', 'de': 'Tokio', 'pt': 'Tóquio', 'it': 'Tokyo', 'nl': 'Tokyo', 'pl': 'Tokio', 'ru': 'Токио', 'ja': '東京'},
}

# Prompts por idioma
PROMPTS = {
    'en': """Write a 150-200 word paragraph about the job market for {profession} in {city}. 
Focus on:
- Current demand for this role
- Typical career paths
- Key skills employers look for
- Local industry context

Make it unique, helpful, and natural. Do not mention salaries or numbers.""",
    'es': """Escribe un párrafo de 150-200 palabras sobre el mercado laboral para {profession} en {city}.
Enfócate en:
- La demanda actual de este puesto
- Trayectorias profesionales típicas
- Habilidades clave que buscan los empleadores
- Contexto industrial local

Hazlo único, útil y natural. No menciones salarios ni números.""",
    'fr': """Écris un paragraphe de 150-200 mots sur le marché du travail pour {profession} à {city}.
Concentre-toi sur:
- La demande actuelle pour ce rôle
- Les parcours professionnels typiques
- Les compétences clés recherchées par les employeurs
- Le contexte industriel local

Rends-le unique, utile et naturel. Ne mentionne pas les salaires ou les chiffres.""",
    'de': """Schreibe einen Absatz von 150-200 Wörtern über den Arbeitsmarkt für {profession} in {city}.
Konzentriere dich auf:
- Die aktuelle Nachfrage nach dieser Rolle
- Typische Karrierelaufbahnen
- Schlüsselkompetenzen, die Arbeitgeber suchen
- Lokaler Industriekontext

Mach ihn einzigartig, hilfreich und natürlich. Erwähne keine Gehälter oder Zahlen.""",
    'pt': """Escreve um parágrafo de 150-200 palavras sobre o mercado de trabalho para {profession} em {city}.
Foca em:
- A demanda atual para este cargo
- Trajetórias profissionais típicas
- Habilidades-chave que os empregadores procuram
- Contexto industrial local

Torna-o único, útil e natural. Não mencione salários ou números.""",
}

# Fallback para otros idiomas (usar inglés)
for lang in SUPPORTED_LANGS:
    if lang not in PROMPTS:
        PROMPTS[lang] = PROMPTS['en']

def main():
    parser = argparse.ArgumentParser(description='Genera contenido único con Groq para páginas de salarios')
    parser.add_argument('--lang', type=str, default='en,es', help='Idiomas a generar (separados por coma)')
    parser.add_argument('--limit', type=int, default=None, help='Límite de combinaciones a generar (para pruebas)')
    args = parser.parse_args()

    # Inicializar cliente Groq
    client = Groq(api_key=os.environ.get('GROQ_API_KEY'))

    # Crear carpeta de contenido
    os.makedirs('content', exist_ok=True)

    # Obtener idiomas
    target_langs = [l.strip() for l in args.lang.split(',') if l.strip() in SUPPORTED_LANGS]

    # Generar combinaciones
    combinations = []
    for lang in target_langs:
        for prof_slug in PROFESSIONS.keys():
            for city_slug in CITIES.keys():
                combinations.append((lang, prof_slug, city_slug))

    # Aplicar límite si existe
    if args.limit:
        combinations = combinations[:args.limit]

    print(f"Generando contenido para {len(combinations)} combinaciones...")

    # Generar contenido
    for lang, prof_slug, city_slug in tqdm(combinations, desc="Generando"):
        # Nombre de archivo
        filename = f"content/{lang}_{prof_slug}_{city_slug}.json"
        
        # Saltar si ya existe
        if os.path.exists(filename):
            continue
        
        # Obtener nombres en el idioma
        prof_name = PROFESSIONS[prof_slug][lang] if lang in PROFESSIONS[prof_slug] else PROFESSIONS[prof_slug]['en']
        city_name = CITIES[city_slug][lang] if lang in CITIES[city_slug] else CITIES[city_slug]['en']
        
        try:
            # Generar contenido con Groq
            prompt = PROMPTS[lang].format(profession=prof_name, city=city_name)
            
            chat_completion = client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": prompt,
                    }
                ],
                model="llama-3.1-8b-instant",
                temperature=0.7,
                max_tokens=300,
            )
            
            content = chat_completion.choices[0].message.content.strip()
            
            # Guardar JSON
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump({
                    'lang': lang,
                    'profession': prof_slug,
                    'city': city_slug,
                    'content': content,
                }, f, ensure_ascii=False, indent=2)
            
            # Sleep para no saturar la API
            sleep(0.5)
            
        except Exception as e:
            print(f"Error con {lang}/{prof_slug}/{city_slug}: {e}")
            continue

    print("¡Listo! Contenido generado en la carpeta 'content/'.")

if __name__ == "__main__":
    main()
