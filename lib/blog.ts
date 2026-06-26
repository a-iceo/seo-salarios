// Static blog data - no fs!
export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  category: string
  readTime?: string
  content: string
}

// Static blog posts (we can add more later)
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'por-que-desarrollador-berlin-mas-dinero-londres',
    title: 'Por qué un desarrollador en Berlín lleva más dinero a casa que uno en Londres aunque gane menos',
    description: 'Descubre cómo el coste de vida y los impuestos cambian todo: un ingeniero en Berlín puede tener más poder adquisitivo que uno en Londres con un salario menor.',
    date: '2026-06-15',
    category: 'Salarios',
    readTime: '10 min',
    content: `# Por qué un desarrollador en Berlín lleva más dinero a casa que uno en Londres aunque gane menos

En 2026, un ingeniero de software senior en Londres ganaba un promedio de 85.000 libras esterlinas anuales (unos 99.000 euros), mientras que su contraparte en Berlín obtenía alrededor de 78.000 euros brutos al año. A primera vista, la elección parecía obvia: Londres pagaba más. Pero cuando desglosas los impuestos, el coste de la vivienda y otros gastos, el panorama se invertía completamente. Un desarrollador en Berlín podía acabar con más dinero disponible al final del mes que su colega en Londres, incluso con un salario bruto menor.

## El impacto devastador del coste de la vivienda en Londres

La vivienda es el gasto más grande para cualquier profesional, y en Londres, este rubro alcanzaba cifras que desafiaban la lógica. Un apartamento de una habitación en el centro de Londres costaba alrededor de 2.800 libras esterlinas al mes (unos 3.260 euros). En Berlín, el mismo tipo de apartamento en una zona comparable rondaba los 1.500 euros mensuales.

<div class="callout">
<p>Un desarrollador en Berlín gastaba un 18% de su salario neto en vivienda, mientras que en Londres ese porcentaje alcanzaba el 42%.</p>
</div>

### Cómo el mercado inmobiliario berlinés protege a los inquilinos

Berlín contaba con una de las regulaciones de alquiler más estrictas de Europa, limitando los aumentos y protegiendo a los inquilinos de desahucios injustificados. Aunque la ley había sufrido modificaciones en los últimos años, seguía manteniendo los precios significativamente más bajos que en otras capitales europeas.

## Impuestos y cotizaciones: la otra gran diferencia

Los impuestos y cotizaciones sociales eran el segundo factor que hacía que el dinero rindiera más en Berlín. En el Reino Unido, el sistema tributario era progresivo, pero las cotizaciones a la seguridad social y los impuestos locales se sumaban a una carga significativa.

<table class="compare-table">
  <thead>
    <tr>
      <th>Concepto</th>
      <th>Berlín</th>
      <th>Londres</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Salario anual bruto</td>
      <td>78.000 €</td>
      <td>99.000 €</td>
    </tr>
    <tr>
      <td>Impuestos totales</td>
      <td>30.420 €</td>
      <td>44.550 €</td>
    </tr>
    <tr>
      <td>Salario neto anual</td>
      <td>47.580 €</td>
      <td>54.450 €</td>
    </tr>
    <tr>
      <td>Gasto anual en vivienda</td>
      <td>18.000 €</td>
      <td>39.120 €</td>
    </tr>
  </tbody>
</table>

## Conclusión: el salario bruto no es la verdad

Cuando un profesional compara ofertas de trabajo entre ciudades, a menudo se centra únicamente en el número bruto del salario, sin considerar los factores que realmente determinan cuánto dinero acabará teniendo disponible para ahorrar, disfrutar y planificar el futuro. El caso de Berlín frente a Londres es una perfecta ilustración de cómo el coste de vida, los impuestos y las condiciones laborales pueden transformar completamente una oferta aparentemente más modesta en una oportunidad mucho más valiosa.

Y para datos concretos de salarios en diferentes ciudades, explora los datos de [ingenieros de software en Berlín](/es/software-engineer/berlin) y compara por ti mismo.`
  },
  {
    slug: 'data-scientist-2026-profesion-mejor-pagada',
    title: 'Data Scientist en 2026: la profesión mejor pagada que nadie menciona',
    description: 'De las startup de San Francisco a las empresas europeas: cómo el Data Scientist se ha convertido en el rol estrella.',
    date: '2026-06-04',
    category: 'Profesiones',
    readTime: '10 min',
    content: `# Data Scientist en 2026: la profesión mejor pagada que nadie menciona

Cuando se habla de profesiones tech bien pagadas, la atención suele centrarse en los ingenieros de software o los directores de producto. Pero en 2026, una profesión ha estado creciendo en salario y relevancia sin que muchos lo noten: el Data Scientist. En San Francisco, un Data Scientist senior ganaba un promedio de 195.000 dólares anuales (unos 180.000 euros) en 2026, superando a los ingenieros de software senior en casi 10.000 euros.

<div class="callout">
<p>En 2026, el 94% de las empresas Fortune 500 tenían un equipo dedicado a ciencia de datos, y el 78% afirmaban que los datos habían transformado su estrategia empresarial.</p>
</div>

## Salarios de Data Scientist en el mundo en 2026

La compensación de un Data Scientist variaba significativamente por ciudad, pero en todos los mercados importantes, superaba a la mayoría de las profesiones tech. Aquí algunos datos relevantes de 2026:

<table class="compare-table">
  <thead>
    <tr>
      <th>Ciudad</th>
      <th>Salario anual bruto</th>
      <th>Demanda vs oferta</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>San Francisco</td>
      <td>180.000 €</td>
      <td>3,5 ofertas/1 candidato</td>
    </tr>
    <tr>
      <td>Berlín</td>
      <td>105.000 €</td>
      <td>3,2 ofertas/1 candidato</td>
    </tr>
    <tr>
      <td>Londres</td>
      <td>135.000 €</td>
      <td>3,0 ofertas/1 candidato</td>
    </tr>
  </tbody>
</table>

Estos salarios reflejaban no solo la demanda, sino también la especialización y la experiencia necesaria para ser un Data Scientist efectivo. En [San Francisco](/es/data-scientist/san-francisco), el ecosistema de startups y empresas tech globales estaba dispuesto a pagar primas significativas por profesionales con experiencia en modelos avanzados de Machine Learning y Deep Learning.

## Conclusión: una profesión con futuro garantizado

El Data Scientist no es una tendencia pasajera. Es una profesión que ha llegado para quedarse porque responde a una necesidad fundamental de las empresas modernas: transformar datos en decisiones. Si estás pensando en cambiar de carrera o en especializarte, la ciencia de datos es una opción con excelentes perspectivas de empleo y salarios competitivos en todo el mundo.

Y si quieres ver datos concretos de salarios en diferentes ciudades, explora los datos de [Data Scientists en San Francisco](/es/data-scientist/san-francisco) y compara con otras ciudades globales.`
  }
]

export function getAllBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  return BLOG_POSTS.find(post => post.slug === slug) || null
}
