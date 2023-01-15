const app = 'Aprende y juega con la Liga Santandereana Contra el Cáncer'
const description = 'Educate a través de herramientas interactivas como infografías, juegos y videos lúdicos sobre la prevención y detección del cáncer.';
const link = 'https://educatecancer.online'
const urlImage = 'https://res.cloudinary.com/dsvy4oeqc/image/upload/c_scale,w_1280/v1673821809/educate-cancer/cancer_kkfv5v.png'
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
      'education',
      'educación',
      'juegos',
      'play games',
      'cáncer',
      'cáncer mama',
      'cáncer de próstata',
      'cáncer de pulmón',
      'tabaquismo',
      'cáncer de piel'
    ],
    author: 'Ximena Blanco y Jhon Freddy Pérez',
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
