/**
 * scripts/generate-experience-variants.mjs
 * ─────────────────────────────────────────────────────────────────────────
 * Genera contenido ÚNICO por nivel de experiencia (junior / senior / lead)
 * para cada archivo base existente en /content ({lang}_{profession}_{city}.json).
 *
 * Por qué existe este script:
 * Las páginas /profession/city/junior, /senior y /lead actualmente muestran
 * el MISMO artículo que /profession/city (solo cambian los números de sueldo).
 * Eso es contenido casi-duplicado a escala — exactamente el patrón que el
 * "spam update" de Google de agosto 2026 penaliza. Este script genera un
 * artículo distinto por nivel, con foco editorial propio:
 *   - junior: expectativas de entrada, curva de aprendizaje, certificaciones útiles
 *   - senior: especialización, liderazgo técnico, negociación de sueldo
 *   - lead:   alcance estratégico, gestión de equipos, trayectoria hacia roles directivos
 *
 * USO:
 *   export GEMINI_API_KEY="tu-api-key-de-google-ai-studio"
 *   node scripts/generate-experience-variants.mjs
 *
 * Es RESUMIBLE: si se corta a mitad de camino, corré el mismo comando de
 * nuevo — salta los archivos que ya existen y sigue donde quedó.
 *
 * Rate limiting: 1 request cada 4 segundos (ajustá RATE_LIMIT_MS si tu
 * cuota de Gemini permite más).
 * ─────────────────────────────────────────────────────────────────────────
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, '..', 'content');
const RATE_LIMIT_MS = 4000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.0-flash'; // cambiá si querés otro modelo disponible en tu cuenta

if (!GEMINI_API_KEY) {
  console.error('❌ Falta la variable de entorno GEMINI_API_KEY.');
  console.error('   Conseguila en https://aistudio.google.com/apikey y corré:');
  console.error('   export GEMINI_API_KEY="tu-key-aca"');
  process.exit(1);
}

// ─── Ángulo editorial por nivel (evita que el LLM repita estructura) ───────
const EXPERIENCE_ANGLES = {
  junior: {
    en: 'Focus on what a JUNIOR professional (0-2 years) can realistically expect: entry requirements, typical first-role responsibilities, useful certifications or bootcamps, and how salary tends to grow in the first 2-3 years. Do NOT mention senior/leadership topics.',
    es: 'Enfocate en lo que un profesional JUNIOR (0-2 años) puede esperar realmente: requisitos de entrada, responsabilidades típicas de un primer puesto, certificaciones o bootcamps útiles, y cómo suele crecer el sueldo en los primeros 2-3 años. NO menciones temas de liderazgo o seniority.',
  },
  senior: {
    en: 'Focus on what a SENIOR professional (7-12 years) deals with: technical specialization, mentoring juniors, salary negotiation leverage at this stage, and what differentiates senior compensation from mid-level. Do NOT repeat entry-level advice.',
    es: 'Enfocate en lo que enfrenta un profesional SENIOR (7-12 años): especialización técnica, mentoría a juniors, poder de negociación salarial en esta etapa, y qué diferencia la compensación senior de la de nivel medio. NO repitas consejos de nivel inicial.',
  },
  lead: {
    en: 'Focus on what a LEAD / PRINCIPAL professional (13+ years) handles: strategic scope, managing teams or cross-functional initiatives, the path toward director-level roles, and how compensation at this level often includes bonuses or equity. Do NOT repeat junior or mid-level content.',
    es: 'Enfocate en lo que maneja un profesional LEAD / PRINCIPAL (13+ años): alcance estratégico, gestión de equipos o iniciativas transversales, el camino hacia roles de dirección, y cómo la compensación en este nivel suele incluir bonos o equity. NO repitas contenido junior o de nivel medio.',
  },
};

const TARGET_EXPERIENCES = ['junior', 'senior', 'lead'];

// ─── Utilidades ─────────────────────────────────────────────────────────────
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function parseBaseFilename(filename) {
  // Formato: {lang}_{profession}_{city}.json  (sin sufijo de experiencia)
  const match = filename.match(/^([a-z]{2})_([a-z-]+)_([a-z-]+)\.json$/);
  if (!match) return null;
  return { lang: match[1], profession: match[2], city: match[3] };
}

async function callGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.85, maxOutputTokens: 400 },
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${errText}`);
  }
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Respuesta de Gemini sin contenido: ' + JSON.stringify(data));
  return text.trim();
}

function buildPrompt({ lang, profession, city, experience, baseContent }) {
  const angle = EXPERIENCE_ANGLES[experience][lang] || EXPERIENCE_ANGLES[experience].en;
  const langNames = {
    en: 'English', es: 'Spanish', fr: 'French', pt: 'Portuguese', de: 'German',
    it: 'Italian', zh: 'Chinese', ru: 'Russian', ja: 'Japanese', hi: 'Hindi',
  };
  return `Write a 3-4 sentence paragraph (120-180 words) in ${langNames[lang] || 'English'} about the career of "${profession}" in "${city}" specifically for a professional at the ${experience.toUpperCase()} level.

${angle}

Write naturally and specifically — mention real, concrete details about this city's job market where relevant (regulations, industry presence, cost pressures, etc.), the way a knowledgeable local career writer would. Do NOT use generic filler phrases. Do NOT repeat the structure of a template. Output ONLY the paragraph text, no title, no quotes, no markdown.

For reference, here is the base (mid-level) article for this same profession/city — write something genuinely different in focus, not a reworded version of it:
"""
${baseContent}
"""`;
}

// ─── Main ───────────────────────────────────────────────────────────────────
async function main() {
  const allFiles = fs.readdirSync(CONTENT_DIR);
  const baseFiles = allFiles
    .map(parseBaseFilename)
    .filter(Boolean);

  console.log(`📂 Encontrados ${baseFiles.length} artículos base en /content.`);
  console.log(`🎯 Generando hasta ${baseFiles.length * TARGET_EXPERIENCES.length} variantes (junior/senior/lead).\n`);

  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (const { lang, profession, city } of baseFiles) {
    const baseFilePath = path.join(CONTENT_DIR, `${lang}_${profession}_${city}.json`);
    const baseData = JSON.parse(fs.readFileSync(baseFilePath, 'utf-8'));

    for (const experience of TARGET_EXPERIENCES) {
      const variantFilename = `${lang}_${profession}_${city}_${experience}.json`;
      const variantPath = path.join(CONTENT_DIR, variantFilename);

      if (fs.existsSync(variantPath)) {
        skipped++;
        continue;
      }

      try {
        const prompt = buildPrompt({ lang, profession, city, experience, baseContent: baseData.content });
        const content = await callGemini(prompt);

        const variantData = {
          lang,
          profession,
          city,
          experience,
          content,
        };

        fs.writeFileSync(variantPath, JSON.stringify(variantData, null, 2), 'utf-8');
        generated++;
        console.log(`✅ [${generated}] ${variantFilename}`);
      } catch (err) {
        failed++;
        console.error(`❌ ${variantFilename}: ${err.message}`);
      }

      await sleep(RATE_LIMIT_MS);
    }
  }

  console.log(`\n─────────────────────────────────────`);
  console.log(`Generados: ${generated} | Ya existían: ${skipped} | Fallidos: ${failed}`);
  if (failed > 0) {
    console.log(`Volvé a correr el script para reintentar los fallidos (es resumible).`);
  }
}

main().catch(err => {
  console.error('Error fatal:', err);
  process.exit(1);
});
