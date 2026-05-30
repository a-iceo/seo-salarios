// ============================================================
// config.ts — Matriz de datos multi-idioma para SEO Programático
// Nicho: Sueldos y Coste de Vida Global
// ============================================================

export const SUPPORTED_LANGS = ['en', 'es', 'fr', 'pt', 'de', 'it', 'zh', 'ru', 'ja', 'hi'] as const;
export type Lang = typeof SUPPORTED_LANGS[number];

// ─── TRADUCCIONES UI ───────────────────────────────────────
export const UI_STRINGS: Record<Lang, {
  title: string;
  subtitle: string;
  salaryLabel: string;
  costLabel: string;
  experienceLabel: string;
  metaTitle: string;
  metaDesc: string;
  disclaimer: string;
  salaryRange: string;
  monthlyExpenses: string;
  qualityOfLife: string;
  taxRate: string;
  netSalary: string;
  comparison: string;
  updated: string;
}> = {
  en: {
    title: 'Salary & Cost of Living',
    subtitle: 'Real data on salaries and living expenses by city and profession',
    salaryLabel: 'Estimated Annual Salary',
    costLabel: 'Monthly Cost of Living',
    experienceLabel: 'Experience Level',
    metaTitle: '{profession} Salary in {city} {year} — Costs & Estimates',
    metaDesc: 'Find out how much a {profession} earns in {city}. Salary range, cost of living, taxes, and quality of life index updated {year}.',
    disclaimer: '* Estimates based on public data and statistical models. Actual figures may vary.',
    salaryRange: 'Salary Range',
    monthlyExpenses: 'Monthly Expenses',
    qualityOfLife: 'Quality of Life Index',
    taxRate: 'Estimated Tax Rate',
    netSalary: 'Estimated Net Monthly',
    comparison: 'vs. Global Average',
    updated: 'Updated',
  },
  es: {
    title: 'Sueldo y Coste de Vida',
    subtitle: 'Datos reales sobre salarios y gastos de vida por ciudad y profesión',
    salaryLabel: 'Sueldo Anual Estimado',
    costLabel: 'Coste de Vida Mensual',
    experienceLabel: 'Nivel de Experiencia',
    metaTitle: 'Sueldo de {profession} en {city} {year} — Coste y Estimaciones',
    metaDesc: 'Descubre cuánto gana un {profession} en {city}. Rango salarial, coste de vida, impuestos e índice de calidad de vida actualizado {year}.',
    disclaimer: '* Estimaciones basadas en datos públicos y modelos estadísticos. Las cifras reales pueden variar.',
    salaryRange: 'Rango Salarial',
    monthlyExpenses: 'Gastos Mensuales',
    qualityOfLife: 'Índice de Calidad de Vida',
    taxRate: 'Tasa Impositiva Estimada',
    netSalary: 'Neto Mensual Estimado',
    comparison: 'vs. Media Global',
    updated: 'Actualizado',
  },
  fr: {
    title: 'Salaire et Coût de la Vie',
    subtitle: 'Données réelles sur les salaires et les dépenses de vie par ville et profession',
    salaryLabel: 'Salaire Annuel Estimé',
    costLabel: 'Coût de la Vie Mensuel',
    experienceLabel: "Niveau d'Expérience",
    metaTitle: 'Salaire {profession} à {city} {year} — Coûts et Estimations',
    metaDesc: 'Découvrez combien gagne un {profession} à {city}. Fourchette salariale, coût de la vie, impôts et indice de qualité de vie mis à jour {year}.',
    disclaimer: '* Estimations basées sur des données publiques et des modèles statistiques.',
    salaryRange: 'Fourchette Salariale',
    monthlyExpenses: 'Dépenses Mensuelles',
    qualityOfLife: 'Indice de Qualité de Vie',
    taxRate: "Taux d'Imposition Estimé",
    netSalary: 'Net Mensuel Estimé',
    comparison: 'vs. Moyenne Mondiale',
    updated: 'Mis à jour',
  },
  pt: {
    title: 'Salário e Custo de Vida',
    subtitle: 'Dados reais sobre salários e despesas de vida por cidade e profissão',
    salaryLabel: 'Salário Anual Estimado',
    costLabel: 'Custo de Vida Mensal',
    experienceLabel: 'Nível de Experiência',
    metaTitle: 'Salário de {profession} em {city} {year} — Custos e Estimativas',
    metaDesc: 'Descubra quanto ganha um {profession} em {city}. Faixa salarial, custo de vida, impostos e índice de qualidade de vida atualizado {year}.',
    disclaimer: '* Estimativas baseadas em dados públicos e modelos estatísticos.',
    salaryRange: 'Faixa Salarial',
    monthlyExpenses: 'Despesas Mensais',
    qualityOfLife: 'Índice de Qualidade de Vida',
    taxRate: 'Taxa de Imposto Estimada',
    netSalary: 'Líquido Mensal Estimado',
    comparison: 'vs. Média Global',
    updated: 'Atualizado',
  },
  de: {
    title: 'Gehalt und Lebenshaltungskosten',
    subtitle: 'Echte Daten zu Gehältern und Lebenshaltungskosten nach Stadt und Beruf',
    salaryLabel: 'Geschätztes Jahresgehalt',
    costLabel: 'Monatliche Lebenshaltungskosten',
    experienceLabel: 'Erfahrungsniveau',
    metaTitle: '{profession} Gehalt in {city} {year} — Kosten & Schätzungen',
    metaDesc: 'Erfahren Sie, wie viel ein {profession} in {city} verdient. Gehaltsspanne, Lebenshaltungskosten, Steuern und Lebensqualitätsindex aktualisiert {year}.',
    disclaimer: '* Schätzungen basieren auf öffentlichen Daten und statistischen Modellen.',
    salaryRange: 'Gehaltsspanne',
    monthlyExpenses: 'Monatliche Ausgaben',
    qualityOfLife: 'Lebensqualitätsindex',
    taxRate: 'Geschätzter Steuersatz',
    netSalary: 'Geschätztes Monatsnetto',
    comparison: 'vs. Globaler Durchschnitt',
    updated: 'Aktualisiert',
  },
  it: {
    title: 'Stipendio e Costo della Vita',
    subtitle: 'Dati reali su stipendi e spese di vita per città e professione',
    salaryLabel: 'Stipendio Annuale Stimato',
    costLabel: 'Costo della Vita Mensile',
    experienceLabel: 'Livello di Esperienza',
    metaTitle: 'Stipendio {profession} a {city} {year} — Costi e Stime',
    metaDesc: 'Scopri quanto guadagna un {profession} a {city}. Fascia salariale, costo della vita, tasse e indice di qualità della vita aggiornato {year}.',
    disclaimer: '* Stime basate su dati pubblici e modelli statistici.',
    salaryRange: 'Fascia Salariale',
    monthlyExpenses: 'Spese Mensili',
    qualityOfLife: 'Indice di Qualità della Vita',
    taxRate: 'Aliquota Fiscale Stimata',
    netSalary: 'Netto Mensile Stimato',
    comparison: 'vs. Media Globale',
    updated: 'Aggiornato',
  },
  zh: {
    title: '薪资与生活成本',
    subtitle: '各城市和职业的真实薪资与生活费用数据',
    salaryLabel: '预计年薪',
    costLabel: '每月生活成本',
    experienceLabel: '经验水平',
    metaTitle: '{city}{profession}薪资{year}——成本与估算',
    metaDesc: '了解{profession}在{city}的薪资水平。薪资范围、生活成本、税率和生活质量指数（{year}年更新）。',
    disclaimer: '* 估算基于公开数据和统计模型，实际数字可能有所不同。',
    salaryRange: '薪资范围',
    monthlyExpenses: '月度支出',
    qualityOfLife: '生活质量指数',
    taxRate: '预计税率',
    netSalary: '预计月净收入',
    comparison: '对比全球平均',
    updated: '更新于',
  },
  ru: {
    title: 'Зарплата и стоимость жизни',
    subtitle: 'Реальные данные о зарплатах и расходах на жизнь по городам и профессиям',
    salaryLabel: 'Ориентировочная годовая зарплата',
    costLabel: 'Ежемесячная стоимость жизни',
    experienceLabel: 'Уровень опыта',
    metaTitle: 'Зарплата {profession} в {city} {year} — расходы и оценки',
    metaDesc: 'Узнайте, сколько зарабатывает {profession} в {city}. Диапазон зарплат, стоимость жизни, налоги и индекс качества жизни, обновлено {year}.',
    disclaimer: '* Оценки основаны на общедоступных данных и статистических моделях.',
    salaryRange: 'Диапазон зарплат',
    monthlyExpenses: 'Ежемесячные расходы',
    qualityOfLife: 'Индекс качества жизни',
    taxRate: 'Ориентировочная ставка налога',
    netSalary: 'Ориентировочная чистая зарплата в месяц',
    comparison: 'vs. Мировой средний',
    updated: 'Обновлено',
  },
  ja: {
    title: '給与と生活費',
    subtitle: '都市と職業別の実際の給与と生活費データ',
    salaryLabel: '推定年収',
    costLabel: '月々の生活費',
    experienceLabel: '経験レベル',
    metaTitle: '{city}の{profession}の給与{year}年 — コストと推定',
    metaDesc: '{city}の{profession}の給与を確認しましょう。給与範囲、生活費、税率、生活の質指数（{year}年更新）。',
    disclaimer: '※ 推定値は公開データと統計モデルに基づいています。実際の数値は異なる場合があります。',
    salaryRange: '給与範囲',
    monthlyExpenses: '月次支出',
    qualityOfLife: '生活の質指数',
    taxRate: '推定税率',
    netSalary: '推定月次手取り',
    comparison: 'vs. 世界平均',
    updated: '更新日',
  },
  hi: {
    title: 'वेतन और जीवन यापन की लागत',
    subtitle: 'शहर और पेशे के अनुसार वेतन और जीवन व्यय का वास्तविक डेटा',
    salaryLabel: 'अनुमानित वार्षिक वेतन',
    costLabel: 'मासिक जीवन यापन लागत',
    experienceLabel: 'अनुभव स्तर',
    metaTitle: '{city} में {profession} वेतन {year} — लागत और अनुमान',
    metaDesc: '{city} में {profession} कितना कमाता है? वेतन सीमा, जीवन यापन लागत, कर और जीवन गुणवत्ता सूचकांक {year} में अपडेट।',
    disclaimer: '* अनुमान सार्वजनिक डेटा और सांख्यिकीय मॉडल पर आधारित हैं।',
    salaryRange: 'वेतन सीमा',
    monthlyExpenses: 'मासिक व्यय',
    qualityOfLife: 'जीवन गुणवत्ता सूचकांक',
    taxRate: 'अनुमानित कर दर',
    netSalary: 'अनुमानित मासिक शुद्ध',
    comparison: 'बनाम वैश्विक औसत',
    updated: 'अपडेट किया गया',
  },
};

// ─── PROFESIONES ──────────────────────────────────────────
// slug → { [lang]: display name, baseSalary (USD/yr), growthFactor }
export const PROFESSIONS: Record<string, {
  names: Record<Lang, string>;
  baseSalary: number;   // USD annual, mid-level reference
  growthFactor: number; // multiplicador por experiencia
}> = {
  'software-engineer': {
    names: { en: 'Software Engineer', es: 'Ingeniero de Software', fr: 'Ingénieur Logiciel', pt: 'Engenheiro de Software', de: 'Softwareingenieur', it: 'Ingegnere Software', zh: '软件工程师', ru: 'Инженер-программист', ja: 'ソフトウェアエンジニア', hi: 'सॉफ्टवेयर इंजीनियर' },
    baseSalary: 95000, growthFactor: 1.9,
  },
  'data-scientist': {
    names: { en: 'Data Scientist', es: 'Científico de Datos', fr: 'Scientifique des Données', pt: 'Cientista de Dados', de: 'Datenwissenschaftler', it: 'Scienziato dei Dati', zh: '数据科学家', ru: 'Специалист по данным', ja: 'データサイエンティスト', hi: 'डेटा वैज्ञानिक' },
    baseSalary: 105000, growthFactor: 2.0,
  },
  'product-manager': {
    names: { en: 'Product Manager', es: 'Product Manager', fr: 'Chef de Produit', pt: 'Gerente de Produto', de: 'Produktmanager', it: 'Product Manager', zh: '产品经理', ru: 'Менеджер по продукту', ja: 'プロダクトマネージャー', hi: 'प्रोडक्ट मैनेजर' },
    baseSalary: 115000, growthFactor: 2.1,
  },
  'nurse': {
    names: { en: 'Nurse', es: 'Enfermero/a', fr: 'Infirmier/ère', pt: 'Enfermeiro/a', de: 'Krankenpfleger/in', it: 'Infermiere/a', zh: '护士', ru: 'Медсестра', ja: '看護師', hi: 'नर्स' },
    baseSalary: 62000, growthFactor: 1.4,
  },
  'teacher': {
    names: { en: 'Teacher', es: 'Profesor/a', fr: 'Enseignant/e', pt: 'Professor/a', de: 'Lehrer/in', it: 'Insegnante', zh: '教师', ru: 'Учитель', ja: '教師', hi: 'शिक्षक' },
    baseSalary: 48000, growthFactor: 1.5,
  },
  'doctor': {
    names: { en: 'Doctor', es: 'Médico/a', fr: 'Médecin', pt: 'Médico/a', de: 'Arzt/Ärztin', it: 'Medico', zh: '医生', ru: 'Врач', ja: '医師', hi: 'डॉक्टर' },
    baseSalary: 180000, growthFactor: 2.5,
  },
  'lawyer': {
    names: { en: 'Lawyer', es: 'Abogado/a', fr: 'Avocat/e', pt: 'Advogado/a', de: 'Rechtsanwalt/Rechtsanwältin', it: 'Avvocato/a', zh: '律师', ru: 'Юрист', ja: '弁護士', hi: 'वकील' },
    baseSalary: 130000, growthFactor: 2.3,
  },
  'marketing-manager': {
    names: { en: 'Marketing Manager', es: 'Director de Marketing', fr: 'Directeur Marketing', pt: 'Gerente de Marketing', de: 'Marketingmanager', it: 'Responsabile Marketing', zh: '市场经理', ru: 'Менеджер по маркетингу', ja: 'マーケティングマネージャー', hi: 'मार्केटिंग मैनेजर' },
    baseSalary: 88000, growthFactor: 1.8,
  },
  'accountant': {
    names: { en: 'Accountant', es: 'Contable', fr: 'Comptable', pt: 'Contador', de: 'Buchhalter/in', it: 'Contabile', zh: '会计师', ru: 'Бухгалтер', ja: '会計士', hi: 'लेखाकार' },
    baseSalary: 65000, growthFactor: 1.6,
  },
  'mechanical-engineer': {
    names: { en: 'Mechanical Engineer', es: 'Ingeniero Mecánico', fr: 'Ingénieur Mécanique', pt: 'Engenheiro Mecânico', de: 'Maschinenbauingenieur', it: 'Ingegnere Meccanico', zh: '机械工程师', ru: 'Инженер-механик', ja: '機械エンジニア', hi: 'मैकेनिकल इंजीनियर' },
    baseSalary: 78000, growthFactor: 1.7,
  },
  'graphic-designer': {
    names: { en: 'Graphic Designer', es: 'Diseñador/a Gráfico/a', fr: 'Designer Graphique', pt: 'Designer Gráfico', de: 'Grafikdesigner/in', it: 'Designer Grafico', zh: '平面设计师', ru: 'Графический дизайнер', ja: 'グラフィックデザイナー', hi: 'ग्राफ़िक डिज़ाइनर' },
    baseSalary: 52000, growthFactor: 1.6,
  },
  'financial-analyst': {
    names: { en: 'Financial Analyst', es: 'Analista Financiero', fr: 'Analyste Financier', pt: 'Analista Financeiro', de: 'Finanzanalyst', it: 'Analista Finanziario', zh: '金融分析师', ru: 'Финансовый аналитик', ja: '金融アナリスト', hi: 'वित्तीय विश्लेषक' },
    baseSalary: 92000, growthFactor: 2.0,
  },
  'sales-representative': {
    names: { en: 'Sales Representative', es: 'Representante de Ventas', fr: 'Représentant Commercial', pt: 'Representante de Vendas', de: 'Vertriebsmitarbeiter', it: 'Rappresentante di Vendita', zh: '销售代表', ru: 'Торговый представитель', ja: '営業担当者', hi: 'बिक्री प्रतिनिधि' },
    baseSalary: 55000, growthFactor: 1.7,
  },
  'civil-engineer': {
    names: { en: 'Civil Engineer', es: 'Ingeniero Civil', fr: 'Ingénieur Civil', pt: 'Engenheiro Civil', de: 'Bauingenieur', it: 'Ingegnere Civile', zh: '土木工程师', ru: 'Инженер-строитель', ja: '土木技術者', hi: 'सिविल इंजीनियर' },
    baseSalary: 72000, growthFactor: 1.7,
  },
  'pharmacist': {
    names: { en: 'Pharmacist', es: 'Farmacéutico/a', fr: 'Pharmacien/ne', pt: 'Farmacêutico/a', de: 'Apotheker/in', it: 'Farmacista', zh: '药剂师', ru: 'Фармацевт', ja: '薬剤師', hi: 'फार्मासिस्ट' },
    baseSalary: 118000, growthFactor: 1.6,
  },
};

// ─── CIUDADES / PAÍSES ────────────────────────────────────
// slug → { names, costIndex, salaryMultiplier, currency, currencySymbol }
export const CITIES: Record<string, {
  names: Record<Lang, string>;
  country: Record<Lang, string>;
  costIndex: number;      // 1.0 = global average monthly cost ~$2000 USD
  salaryMultiplier: number; // vs global base salary
  currency: string;
  currencySymbol: string;
  taxRate: number;        // percentage
  qualityOfLife: number;  // 0-100
}> = {
  'san-francisco': {
    names: { en: 'San Francisco', es: 'San Francisco', fr: 'San Francisco', pt: 'San Francisco', de: 'San Francisco', it: 'San Francisco', zh: '旧金山', ru: 'Сан-Франциско', ja: 'サンフランシスコ', hi: 'सैन फ्रांसिस्को' },
    country: { en: 'USA', es: 'EE.UU.', fr: 'États-Unis', pt: 'EUA', de: 'USA', it: 'USA', zh: '美国', ru: 'США', ja: 'アメリカ', hi: 'अमेरिका' },
    costIndex: 2.8, salaryMultiplier: 2.4, currency: 'USD', currencySymbol: '$', taxRate: 36, qualityOfLife: 72,
  },
  'new-york': {
    names: { en: 'New York', es: 'Nueva York', fr: 'New York', pt: 'Nova York', de: 'New York', it: 'New York', zh: '纽约', ru: 'Нью-Йорк', ja: 'ニューヨーク', hi: 'न्यू यॉर्क' },
    country: { en: 'USA', es: 'EE.UU.', fr: 'États-Unis', pt: 'EUA', de: 'USA', it: 'USA', zh: '美国', ru: 'США', ja: 'アメリカ', hi: 'अमेरिका' },
    costIndex: 2.6, salaryMultiplier: 2.2, currency: 'USD', currencySymbol: '$', taxRate: 38, qualityOfLife: 68,
  },
  'london': {
    names: { en: 'London', es: 'Londres', fr: 'Londres', pt: 'Londres', de: 'London', it: 'Londra', zh: '伦敦', ru: 'Лондон', ja: 'ロンドン', hi: 'लंदन' },
    country: { en: 'UK', es: 'Reino Unido', fr: 'Royaume-Uni', pt: 'Reino Unido', de: 'Großbritannien', it: 'Regno Unito', zh: '英国', ru: 'Великобритания', ja: 'イギリス', hi: 'यूके' },
    costIndex: 2.2, salaryMultiplier: 1.9, currency: 'GBP', currencySymbol: '£', taxRate: 40, qualityOfLife: 74,
  },
  'paris': {
    names: { en: 'Paris', es: 'París', fr: 'Paris', pt: 'Paris', de: 'Paris', it: 'Parigi', zh: '巴黎', ru: 'Париж', ja: 'パリ', hi: 'पेरिस' },
    country: { en: 'France', es: 'Francia', fr: 'France', pt: 'França', de: 'Frankreich', it: 'Francia', zh: '法国', ru: 'Франция', ja: 'フランス', hi: 'फ्रांस' },
    costIndex: 2.0, salaryMultiplier: 1.7, currency: 'EUR', currencySymbol: '€', taxRate: 45, qualityOfLife: 76,
  },
  'berlin': {
    names: { en: 'Berlin', es: 'Berlín', fr: 'Berlin', pt: 'Berlim', de: 'Berlin', it: 'Berlino', zh: '柏林', ru: 'Берлин', ja: 'ベルリン', hi: 'बर्लिन' },
    country: { en: 'Germany', es: 'Alemania', fr: 'Allemagne', pt: 'Alemanha', de: 'Deutschland', it: 'Germania', zh: '德国', ru: 'Германия', ja: 'ドイツ', hi: 'जर्मनी' },
    costIndex: 1.7, salaryMultiplier: 1.5, currency: 'EUR', currencySymbol: '€', taxRate: 42, qualityOfLife: 80,
  },
  'madrid': {
    names: { en: 'Madrid', es: 'Madrid', fr: 'Madrid', pt: 'Madrid', de: 'Madrid', it: 'Madrid', zh: '马德里', ru: 'Мадрид', ja: 'マドリード', hi: 'मेड्रिड' },
    country: { en: 'Spain', es: 'España', fr: 'Espagne', pt: 'Espanha', de: 'Spanien', it: 'Spagna', zh: '西班牙', ru: 'Испания', ja: 'スペイン', hi: 'स्पेन' },
    costIndex: 1.4, salaryMultiplier: 1.1, currency: 'EUR', currencySymbol: '€', taxRate: 37, qualityOfLife: 78,
  },
  'tokyo': {
    names: { en: 'Tokyo', es: 'Tokio', fr: 'Tokyo', pt: 'Tóquio', de: 'Tokio', it: 'Tokyo', zh: '东京', ru: 'Токио', ja: '東京', hi: 'टोक्यो' },
    country: { en: 'Japan', es: 'Japón', fr: 'Japon', pt: 'Japão', de: 'Japan', it: 'Giappone', zh: '日本', ru: 'Япония', ja: '日本', hi: 'जापान' },
    costIndex: 1.9, salaryMultiplier: 1.6, currency: 'JPY', currencySymbol: '¥', taxRate: 33, qualityOfLife: 82,
  },
  'dubai': {
    names: { en: 'Dubai', es: 'Dubái', fr: 'Dubaï', pt: 'Dubai', de: 'Dubai', it: 'Dubai', zh: '迪拜', ru: 'Дубай', ja: 'ドバイ', hi: 'दुबई' },
    country: { en: 'UAE', es: 'Emiratos Árabes', fr: 'Émirats Arabes', pt: 'Emirados Árabes', de: 'VAE', it: 'Emirati Arabi', zh: '阿联酋', ru: 'ОАЭ', ja: 'UAE', hi: 'यूएई' },
    costIndex: 1.8, salaryMultiplier: 1.8, currency: 'AED', currencySymbol: 'د.إ', taxRate: 0, qualityOfLife: 71,
  },
  'singapore': {
    names: { en: 'Singapore', es: 'Singapur', fr: 'Singapour', pt: 'Singapura', de: 'Singapur', it: 'Singapore', zh: '新加坡', ru: 'Сингапур', ja: 'シンガポール', hi: 'सिंगापुर' },
    country: { en: 'Singapore', es: 'Singapur', fr: 'Singapour', pt: 'Singapura', de: 'Singapur', it: 'Singapore', zh: '新加坡', ru: 'Сингапур', ja: 'シンガポール', hi: 'सिंगापुर' },
    costIndex: 2.1, salaryMultiplier: 2.0, currency: 'SGD', currencySymbol: 'S$', taxRate: 22, qualityOfLife: 85,
  },
  'toronto': {
    names: { en: 'Toronto', es: 'Toronto', fr: 'Toronto', pt: 'Toronto', de: 'Toronto', it: 'Toronto', zh: '多伦多', ru: 'Торонто', ja: 'トロント', hi: 'टोरंटो' },
    country: { en: 'Canada', es: 'Canadá', fr: 'Canada', pt: 'Canadá', de: 'Kanada', it: 'Canada', zh: '加拿大', ru: 'Канада', ja: 'カナダ', hi: 'कनाडा' },
    costIndex: 1.9, salaryMultiplier: 1.7, currency: 'CAD', currencySymbol: 'C$', taxRate: 33, qualityOfLife: 83,
  },
  'sydney': {
    names: { en: 'Sydney', es: 'Sídney', fr: 'Sydney', pt: 'Sydney', de: 'Sydney', it: 'Sydney', zh: '悉尼', ru: 'Сидней', ja: 'シドニー', hi: 'सिडनी' },
    country: { en: 'Australia', es: 'Australia', fr: 'Australie', pt: 'Austrália', de: 'Australien', it: 'Australia', zh: '澳大利亚', ru: 'Австралия', ja: 'オーストラリア', hi: 'ऑस्ट्रेलिया' },
    costIndex: 2.0, salaryMultiplier: 1.8, currency: 'AUD', currencySymbol: 'A$', taxRate: 34, qualityOfLife: 86,
  },
  'amsterdam': {
    names: { en: 'Amsterdam', es: 'Ámsterdam', fr: 'Amsterdam', pt: 'Amesterdão', de: 'Amsterdam', it: 'Amsterdam', zh: '阿姆斯特丹', ru: 'Амстердам', ja: 'アムステルダム', hi: 'एम्स्टर्डम' },
    country: { en: 'Netherlands', es: 'Países Bajos', fr: 'Pays-Bas', pt: 'Países Baixos', de: 'Niederlande', it: 'Paesi Bassi', zh: '荷兰', ru: 'Нидерланды', ja: 'オランダ', hi: 'नीदरलैंड' },
    costIndex: 1.85, salaryMultiplier: 1.65, currency: 'EUR', currencySymbol: '€', taxRate: 49, qualityOfLife: 85,
  },
  'sao-paulo': {
    names: { en: 'São Paulo', es: 'São Paulo', fr: 'São Paulo', pt: 'São Paulo', de: 'São Paulo', it: 'San Paolo', zh: '圣保罗', ru: 'Сан-Паулу', ja: 'サンパウロ', hi: 'साओ पाउलो' },
    country: { en: 'Brazil', es: 'Brasil', fr: 'Brésil', pt: 'Brasil', de: 'Brasilien', it: 'Brasile', zh: '巴西', ru: 'Бразилия', ja: 'ブラジル', hi: 'ब्राज़ील' },
    costIndex: 0.85, salaryMultiplier: 0.55, currency: 'BRL', currencySymbol: 'R$', taxRate: 27, qualityOfLife: 57,
  },
  'mumbai': {
    names: { en: 'Mumbai', es: 'Bombay', fr: 'Bombay', pt: 'Bombaim', de: 'Mumbai', it: 'Mumbai', zh: '孟买', ru: 'Мумбаи', ja: 'ムンバイ', hi: 'मुंबई' },
    country: { en: 'India', es: 'India', fr: 'Inde', pt: 'Índia', de: 'Indien', it: 'India', zh: '印度', ru: 'Индия', ja: 'インド', hi: 'भारत' },
    costIndex: 0.55, salaryMultiplier: 0.35, currency: 'INR', currencySymbol: '₹', taxRate: 30, qualityOfLife: 55,
  },
  'mexico-city': {
    names: { en: 'Mexico City', es: 'Ciudad de México', fr: 'Mexico', pt: 'Cidade do México', de: 'Mexiko-Stadt', it: 'Città del Messico', zh: '墨西哥城', ru: 'Мехико', ja: 'メキシコシティ', hi: 'मेक्सिको सिटी' },
    country: { en: 'Mexico', es: 'México', fr: 'Mexique', pt: 'México', de: 'Mexiko', it: 'Messico', zh: '墨西哥', ru: 'Мексика', ja: 'メキシコ', hi: 'मेक्सिको' },
    costIndex: 0.75, salaryMultiplier: 0.45, currency: 'MXN', currencySymbol: '$', taxRate: 25, qualityOfLife: 60,
  },
  'beijing': {
    names: { en: 'Beijing', es: 'Pekín', fr: 'Pékin', pt: 'Pequim', de: 'Peking', it: 'Pechino', zh: '北京', ru: 'Пекин', ja: '北京', hi: 'बीजिंग' },
    country: { en: 'China', es: 'China', fr: 'Chine', pt: 'China', de: 'China', it: 'Cina', zh: '中国', ru: 'Китай', ja: '中国', hi: 'चीन' },
    costIndex: 1.1, salaryMultiplier: 0.8, currency: 'CNY', currencySymbol: '¥', taxRate: 28, qualityOfLife: 65,
  },
  'moscow': {
    names: { en: 'Moscow', es: 'Moscú', fr: 'Moscou', pt: 'Moscovo', de: 'Moskau', it: 'Mosca', zh: '莫斯科', ru: 'Москва', ja: 'モスクワ', hi: 'मास्को' },
    country: { en: 'Russia', es: 'Rusia', fr: 'Russie', pt: 'Rússia', de: 'Russland', it: 'Russia', zh: '俄罗斯', ru: 'Россия', ja: 'ロシア', hi: 'रूस' },
    costIndex: 0.95, salaryMultiplier: 0.65, currency: 'RUB', currencySymbol: '₽', taxRate: 13, qualityOfLife: 60,
  },
  'rome': {
    names: { en: 'Rome', es: 'Roma', fr: 'Rome', pt: 'Roma', de: 'Rom', it: 'Roma', zh: '罗马', ru: 'Рим', ja: 'ローマ', hi: 'रोम' },
    country: { en: 'Italy', es: 'Italia', fr: 'Italie', pt: 'Itália', de: 'Italien', it: 'Italia', zh: '意大利', ru: 'Италия', ja: 'イタリア', hi: 'इटली' },
    costIndex: 1.5, salaryMultiplier: 1.1, currency: 'EUR', currencySymbol: '€', taxRate: 43, qualityOfLife: 73,
  },
  'buenos-aires': {
    names: { en: 'Buenos Aires', es: 'Buenos Aires', fr: 'Buenos Aires', pt: 'Buenos Aires', de: 'Buenos Aires', it: 'Buenos Aires', zh: '布宜诺斯艾利斯', ru: 'Буэнос-Айрес', ja: 'ブエノスアイレス', hi: 'ब्यूनस आयर्स' },
    country: { en: 'Argentina', es: 'Argentina', fr: 'Argentine', pt: 'Argentina', de: 'Argentinien', it: 'Argentina', zh: '阿根廷', ru: 'Аргентина', ja: 'アルゼンチン', hi: 'अर्जेंटीना' },
    costIndex: 0.6, salaryMultiplier: 0.3, currency: 'ARS', currencySymbol: '$', taxRate: 35, qualityOfLife: 63,
  },
};

// ─── NIVELES DE EXPERIENCIA ───────────────────────────────
export const EXPERIENCE_LEVELS: Record<string, {
  names: Record<Lang, string>;
  multiplier: number; // sobre el salario base
  yearsRange: string;
}> = {
  'junior': {
    names: { en: 'Junior', es: 'Junior', fr: 'Junior', pt: 'Júnior', de: 'Junior', it: 'Junior', zh: '初级', ru: 'Младший', ja: 'ジュニア', hi: 'जूनियर' },
    multiplier: 0.65, yearsRange: '0–2',
  },
  'mid-level': {
    names: { en: 'Mid-Level', es: 'Nivel Medio', fr: 'Niveau Intermédiaire', pt: 'Nível Médio', de: 'Mittleres Niveau', it: 'Livello Medio', zh: '中级', ru: 'Средний уровень', ja: 'ミドルレベル', hi: 'मध्य स्तर' },
    multiplier: 1.0, yearsRange: '3–6',
  },
  'senior': {
    names: { en: 'Senior', es: 'Senior', fr: 'Senior', pt: 'Sênior', de: 'Senior', it: 'Senior', zh: '高级', ru: 'Старший', ja: 'シニア', hi: 'सीनियर' },
    multiplier: 1.45, yearsRange: '7–12',
  },
  'lead': {
    names: { en: 'Lead / Principal', es: 'Lead / Principal', fr: 'Lead / Principal', pt: 'Lead / Principal', de: 'Lead / Leitender', it: 'Lead / Principale', zh: '首席', ru: 'Ведущий', ja: 'リード / プリンシパル', hi: 'लीड / प्रिंसिपल' },
    multiplier: 1.85, yearsRange: '13+',
  },
};

// ─── INTENCIONES DE BÚSQUEDA (patrones de URL) ───────────
export type SearchIntent =
  | 'salary'          // /en/software-engineer-salary-san-francisco
  | 'cost-of-living'  // /es/coste-vida-madrid
  | 'comparison'      // /fr/salaire-paris-vs-berlin
  | 'by-experience';  // /de/gehalt-softwareingenieur-senior-berlin

export const SEARCH_INTENTS: Record<SearchIntent, Record<Lang, string>> = {
  salary: { en: 'salary', es: 'sueldo', fr: 'salaire', pt: 'salario', de: 'gehalt', it: 'stipendio', zh: 'gongzi', ru: 'zarplata', ja: 'kyuyo', hi: 'vetan' },
  'cost-of-living': { en: 'cost-of-living', es: 'coste-de-vida', fr: 'cout-de-la-vie', pt: 'custo-de-vida', de: 'lebenshaltungskosten', it: 'costo-della-vita', zh: 'shenghuo-chengben', ru: 'stoimost-zhizni', ja: 'seikatsuhi', hi: 'jeevan-vyay' },
  comparison: { en: 'vs', es: 'vs', fr: 'vs', pt: 'vs', de: 'vs', it: 'vs', zh: 'vs', ru: 'vs', ja: 'vs', hi: 'vs' },
  'by-experience': { en: 'experience', es: 'experiencia', fr: 'experience', pt: 'experiencia', de: 'erfahrung', it: 'esperienza', zh: 'jingyan', ru: 'opyt', ja: 'keiken', hi: 'anubhav' },
};

// ─── ALGORITMO DE CÁLCULO SALARIAL ───────────────────────
/**
 * Genera un salario estimado y coste de vida basado en:
 * profesión, ciudad y nivel de experiencia.
 * Incorpora un hash determinístico para que los valores sean
 * consistentes pero distintos entre combinaciones.
 */
export function calculateSalaryData(
  professionSlug: string,
  citySlug: string,
  experienceSlug: string = 'mid-level'
) {
  const profession = PROFESSIONS[professionSlug];
  const city = CITIES[citySlug];
  const experience = EXPERIENCE_LEVELS[experienceSlug];

  if (!profession || !city || !experience) return null;

  // Hash determinístico para variación consistente (sin Math.random)
  const hashInput = `${professionSlug}-${citySlug}-${experienceSlug}`;
  let hash = 0;
  for (let i = 0; i < hashInput.length; i++) {
    hash = ((hash << 5) - hash) + hashInput.charCodeAt(i);
    hash |= 0;
  }
  const jitter = 1 + ((Math.abs(hash) % 15) - 7) / 100; // ±7%

  const annualSalaryUSD = Math.round(
    profession.baseSalary * city.salaryMultiplier * experience.multiplier * jitter
  );

  const monthlyCostUSD = Math.round(2000 * city.costIndex);

  const annualNetUSD = Math.round(annualSalaryUSD * (1 - city.taxRate / 100));
  const monthlyNetUSD = Math.round(annualNetUSD / 12);

  const salaryMinUSD = Math.round(annualSalaryUSD * 0.82);
  const salaryMaxUSD = Math.round(annualSalaryUSD * 1.22);

  // Índice sueldo vs. coste de vida (purchasing power)
  const purchasingPowerRatio = monthlyNetUSD / monthlyCostUSD;

  return {
    annualSalaryUSD,
    salaryMinUSD,
    salaryMaxUSD,
    monthlyCostUSD,
    annualNetUSD,
    monthlyNetUSD,
    taxRate: city.taxRate,
    qualityOfLife: city.qualityOfLife,
    currency: city.currency,
    currencySymbol: city.currencySymbol,
    purchasingPowerRatio: Math.round(purchasingPowerRatio * 100) / 100,
    profession,
    city,
    experience,
  };
}
