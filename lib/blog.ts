// Auto-generated blog data
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
    slug: 'berlin-vs-london-salary',
    title: 'Por qué un desarrollador en Berlín lleva más dinero a casa que uno en Londres aunque gane menos',
    description: 'Descubre cómo el coste de vida y los impuestos cambian todo: un ingeniero en Berlín puede tener más poder adquisitivo que uno en Londres con un salario menor.',
    date: '2026-06-15',
    category: 'Salarios',
    readTime: '10 min',
    content: `# Por qué un desarrollador en Berlín lleva más dinero a casa que uno en Londres aunque gane menos

En 2026, un ingeniero de software senior en Londres recibe un salario bruto anual de aproximadamente 99,000 euros, mientras que su contraparte en Berlín obtiene alrededor de 78,000 euros. A primera vista, la elección parece obvia: Londres paga más. Sin embargo, cuando desglosas impuestos, coste de la vivienda y gastos diarios, el panorama se invierte por completo. Un desarrollador en Berlín puede terminar con hasta un 30% más de dinero disponible al final del mes que su colega en Londres, a pesar de ganar menos en términos brutos. Este fenómeno no es un accidente, sino el resultado de políticas fiscales y mercados inmobiliarios que definen la verdadera calidad de vida de los profesionales tecnológicos en dos de las ciudades más importantes de Europa.

## El impacto devastador del coste de la vivienda en Londres

La vivienda es el gasto más grande para cualquier profesional, y en Londres este rubro alcanza cifras que desafían toda lógica económica. Un apartamento de una habitación en un barrio céntrico y bien comunicado de Londres cuesta alrededor de 3,200 euros al mes. En Berlín, el mismo tipo de apartamento en zonas como Kreuzberg o Prenzlauer Berg, barrios vibrantes y muy populares entre los profesionales de la tecnología, ronda los 1,500 euros mensuales. Esta diferencia de 1,700 euros al mes suma más de 20,000 euros anuales, una cantidad que supera por completo la diferencia de salario bruto entre las dos ciudades.

<div class="callout">
<p>Un desarrollador en Berlín gasta el 18% de su sueldo neto en vivienda, mientras que en Londres ese porcentaje alcanza el 42%.</p>
</div>

El mercado inmobiliario berlinés cuenta con una regulación que protege a los inquilinos de aumentos abusivos, lo que mantiene los precios significativamente más bajos que en otras capitales europeas. En Londres, por el contrario, el mercado está dominado por propietarios privados y fondos de inversión que incrementan los precios cada año sin casi ninguna restricción. Muchos profesionales de la tecnología en Londres terminan viviendo en pisos compartidos incluso cuando tienen puestos bien pagados, una situación mucho menos común en Berlín.

## Impuestos y cotizaciones que transforman el salario

Los impuestos y cotizaciones sociales son el segundo factor que hace que el dinero rinda significativamente más en Berlín. En el Reino Unido, el sistema tributario es progresivo, pero las cotizaciones a la seguridad social y los impuestos locales se suman a una carga considerable. En Alemania, aunque los impuestos también son progresivos, el sistema de cotizaciones ofrece beneficios tangibles que los profesionales realmente valoran, desde una atención sanitaria de primer nivel hasta una pensión pública que garantiza una jubilación digna.

Y para ver datos concretos de salarios en diferentes ciudades, visita la página de [ingenieros de software en Berlín](/es/software-engineer/berlin) y compara por ti mismo la realidad de los números.`,
  },
  {
    slug: 'data-scientist-2026',
    title: 'Data Scientist en 2026: la profesión mejor pagada que nadie menciona',
    description: 'De las startup de San Francisco a las empresas europeas: cómo el Data Scientist se ha convertido en el rol estrella.',
    date: '2026-06-04',
    category: 'Profesiones',
    readTime: '8 min',
    content: `# Data Scientist en 2026: la profesión mejor pagada que nadie menciona

Cuando se habla de profesiones tecnológicas bien pagadas, la atención suele centrarse casi exclusivamente en los ingenieros de software o los directores de producto. Sin embargo, en 2026, una profesión ha estado creciendo en salario y relevancia estratégica sin que muchos lo noten realmente: el Data Scientist. En San Francisco, un Data Scientist senior ganaba un promedio de 180,000 euros anuales en 2026, superando a los ingenieros de software senior en casi 10,000 euros. Pero lo más notable no es solo el salario, sino la demanda: en 2026, había aproximadamente 3.5 ofertas de trabajo por cada Data Scientist disponible en el mercado global, según datos recopilados de plataformas de empleo especializadas en tecnología.

## Por qué los datos son el nuevo petróleo y los Data Scientists los nuevos geólogos

En la última década, las empresas de todos los sectores han acumulado cantidades masivas de datos: registros de ventas, interacciones de usuarios, información de producción, datos de logística y muchas otras fuentes. Pero estos datos no valen nada por sí mismos si no se analizan y transforman en decisiones empresariales concretas y accionables. Aquí es precisamente donde entra el Data Scientist: un profesional que combina conocimientos profundos de estadística, programación y negocios para extraer valor real de los datos.

<div class="callout">
<p>En 2026, el 94% de las empresas Fortune 500 tienen un equipo dedicado a ciencia de datos, y el 78% afirman que los datos han transformado completamente su estrategia empresarial.</p>
</div>

## Salarios de Data Scientists en ciudades globales clave

La compensación de un Data Scientist varía significativamente según la ciudad, pero en todos los mercados importantes supera a la mayoría de las profesiones tecnológicas. En San Francisco, el ecosistema de startups y empresas tecnológicas globales está dispuesto a pagar primas muy significativas por profesionales con experiencia en modelos avanzados de Machine Learning y Deep Learning.

Y si quieres ver datos concretos actualizados, explora la página de [Data Scientists en San Francisco](/es/data-scientist/san-francisco) y compara con otras ciudades globales.`,
  },
]

export function getAllBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  return BLOG_POSTS.find(post => post.slug === slug) || null
}
