const pkg = require('./package')
const Prismic = require ('prismic-javascript')
const PrismicConfig = require('./prismic.config')
require('dotenv').config()


// Needed for Netlify  $yarn run generate
const dynamicRoutes =  () => {
  const routes = require('./_data/prismic-routes.json')
  return routes
}


module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Impact ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Impact gym' },
      { name: 'keywords', content: 'Gym, Impact'},
    ],
    link: [
      { rel: 'apple-touch-icon', size: '180x180', type: 'image/png', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', size: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', size: '16x16', href: '/favicon-16x16.png' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Anton&display=swap' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: 'yellow' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/global/global-imports.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  '~/components/index',
  '~/plugins/svg4everybody'
  ],

   /*
  ** Nuxt.js Build Modules
  */
  buildModules: [
    '@/modules/crawler',
    '@/modules/static',
    '@nuxtjs/style-resources',
    '@nuxtjs/svg-sprite',
    // '@nuxtjs/eslint-module',
    ['@nuxtjs/dotenv', { systemvars: true }],
    ['nuxt-gmaps', { key: process.env.GMAPS_KEY }]
  ],

   modules: [
    '@nuxtjs/prismic'
  ],

  prismic: {
    endpoint: process.env.PRISMIC_API,
    linkResolver: '@/plugins/link-resolver',
    htmlSerializer: '@/plugins/html-serializer',
    preview: '/preview/'
  },

  styleResources: {
    scss: [
      '~/assets/scss/component-imports/*.scss'
    ]
  },

  svgSprite: {
    input: '~/assets/icons/'
  },


  // router: {
  //   base: '/wip/'
  // },

  /*
  ** Generate
  */

 // generate: {
 //    fallback: '404.html' // Netlify reads a 404.html, Nuxt will load as an SPA
 //  },
  /*

  */

  /*
  ** Build configuration
  */
  build: {
    
    /*
    ** You can extend webpack config here
    */
    // extend(config, ctx) {
    //    config.resolve.alias['vue'] = 'vue/dist/vue.common'
    // }

  }
}
