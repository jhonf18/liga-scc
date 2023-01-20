const app = 'Aprende y juega con la LSCC'
const description = 'Edúcate con la Liga Santanderena Contra el Cáncer a través de herramientas interactivas como infografías, juegos y videos lúdicos sobre la prevención y detección del cáncer.';
const link = 'https://educatecancer.online'
const urlImage = 'https://res.cloudinary.com/dsvy4oeqc/image/upload/v1674192461/educate-cancer/screenshot-index-lscc_kjhaay.png'
const typeImage = 'image/png'

module.exports = {
  settings: {
    robots: 'index, follow',
    disallow: '/dashboard', //  separate pages with commas
    color: '#282b53',
    locale: 'es_CO',
    lang: 'es'
  },
  tags: {
    title: app,
    titleTemplate: `%s | ${app}`,
    description,
    rating: 'general',
    keywords: [
      'educación',
      'juegos',
      'videos',
      'infografías',
      'cáncer',
      'detección',
      'conoce',
      'identifica',
      'signos de alarma',
      'prevención',
      'mama',
      'próstata',
      'pulmón',
      'tabaquismo',
      'piel'
    ],
    author: 'Ximena Blanco y Jhon Pérez',
    publisher: app,
    language: 'spanish',
  },
  og: {
    type: 'website',
    siteName: app,
    url: link,
    title: app,
    description,
    image: {
      url: urlImage,
      width: 1280,
      height: 720,
      type: typeImage
    }
  },
  twitter: {
    creator: '@prjhonf',
    site: '@prjhonf',
    url: `https://twitter.com/prjhonf`,
  },
}
