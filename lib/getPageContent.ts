import fs from 'fs';
import path from 'path';

interface PageContent {
  lang: string;
  profession: string;
  city: string;
  experience?: string;
  content: string;
}

/**
 * Loads page content for a lang/profession/city combination.
 * If an experience level is given (junior/senior/lead — anything other than
 * 'mid-level'), it first looks for an experience-specific file
 * ({lang}_{profession}_{city}_{experience}.json) so that variant pages don't
 * all reuse the exact same article. Falls back to the base
 * ({lang}_{profession}_{city}.json) file when no variant exists yet, so
 * nothing breaks while the variant content is being generated.
 */
export function getPageContent(
  lang: string,
  profession: string,
  city: string,
  experience?: string
): PageContent | null {
  try {
    if (experience && experience !== 'mid-level') {
      const variantPath = path.join(
        process.cwd(),
        'content',
        `${lang}_${profession}_${city}_${experience}.json`
      );
      if (fs.existsSync(variantPath)) {
        const fileContent = fs.readFileSync(variantPath, 'utf-8');
        return JSON.parse(fileContent) as PageContent;
      }
    }

    const filePath = path.join(process.cwd(), 'content', `${lang}_${profession}_${city}.json`);
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(fileContent) as PageContent;
    }
    return null;
  } catch (error) {
    console.error(`Error loading content for ${lang}/${profession}/${city}/${experience}:`, error);
    return null;
  }
}
