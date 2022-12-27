export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Liga Santandereana Contra el Cáncer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon-mesa.png' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Rubik:300,400,500,600,700,800'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    './static/css/main.css'
  ],

  loading: {
    color: '#282b53',
    height: '2px',
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://www.npmjs.com/package/@nuxtjs/moment
    '@nuxtjs/moment',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://www.npmjs.com/package/@nuxtjs/svg
    '@nuxtjs/svg',
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
      source: './static/icon-mesa.png'
    },
    meta: {
      name: 'Liga Santandereana Contra e Cáncer',
      theme_color: '#282b53',
      lang: 'es',
    },
    manifest: {
      lang: 'es',
      name: 'Liga Santandereana Contra el Cáncer',
      description: 'Herramientas interactivas',
      short_name: 'LSCC',
      display: 'standalone',
      start_url: '/'
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: 'https://fonts.googleapis.com/.*',
          handler: 'cacheFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        }
      ]
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
