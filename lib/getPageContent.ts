import fs from 'fs';
import path from 'path';

interface PageContent {
  lang: string;
  profession: string;
  city: string;
  content: string;
}

export function getPageContent(lang: string, profession: string, city: string): PageContent | null {
  try {
    const filePath = path.join(process.cwd(), 'content', `${lang}_${profession}_${city}.json`);
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(fileContent) as PageContent;
    }
    return null;
  } catch (error) {
    console.error(`Error loading content for ${lang}/${profession}/${city}:`, error);
    return null;
  }
}
