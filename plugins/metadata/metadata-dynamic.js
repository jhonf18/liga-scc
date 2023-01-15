/**
 * Helper for set metadata
 */

const metadata = require('./metadata.js')

// Settings
const url = `${process.env.BASE_URL}/`
const image = `https://fourp.blob.core.windows.net/images/assets/fourp-fb.png`
const widthImage = 1280
const heightImage = 720

export default (meta) => {
  return [
    //
    // Meta tags
    //
    ...getMeta(meta),
    //
    // Open Graph
    //
    ...getOpenGraph(meta),
    //
    // Twitter card
    //
    ...getTwitterCard(meta),
  ]
}

function getMeta(meta) {
  let metaDesc = 'meta'
  metaDesc = (meta && meta.description) || metadata.tags.description
  const limit = 155
  if (metaDesc.length > limit) {
    metaDesc = metaDesc.substring(0, limit - 3) + '...'
  }
  return [
    {
      hid: 'description',
      name: 'description',
      content: metaDesc,
    },
  ]
}
function getOpenGraph(meta) {
  return [
    {
      hid: 'og:type',
      name: 'og:type',
      content: (meta && meta.og && meta.type) || metadata.og.type,
    },
    {
      hid: 'og:url',
      name: 'og:url',
      content: (meta && meta.url) || url,
    },
    {
      hid: 'og:title',
      name: 'og:title',
      content: (meta && meta.title) || metadata.tags.title,
    },
    {
      hid: 'og:description',
      name: 'og:description',
      content: (meta && meta.description) || metadata.tags.description,
    },
    {
      hid: 'og:image',
      name: 'og:image',
      content: (meta && meta.image) || image,
    },
    {
      hid: 'og:image:url',
      name: 'og:image:url',
      content: (meta && meta.image) || image,
    },
    {
      hid: 'og:image:secure_url',
      name: 'og:image:secure_url',
      content: (meta && meta.image) || image,
    },
    {
      hid: 'og:image:alt',
      name: 'og:image:alt',
      content: (meta && meta.title) || metadata.tags.title,
    },
    {
      hid: 'og:image:width',
      name: 'og:image:width',
      content: (meta && meta.widthImage) || widthImage,
    },
    {
      hid: 'og:image:height',
      name: 'og:image:height',
      content: (meta && meta.heightImage) || heightImage
    },
    {
      hid: 'og:image:type',
      name: 'og:image:type',
      content: (meta && meta.typeImage) || metadata.og.image.type
    }
  ]
}

function getTwitterCard(meta) {
  return [
    {
      hid: 'twitter:url',
      name: 'twitter:url',
      content: (meta && meta.url) || url,
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: (meta && meta.title) || metadata.tags.title,
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: (meta && meta.description) || metadata.tags.description,
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: (meta && meta.image) || image,
    },
  ]
}
