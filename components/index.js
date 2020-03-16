/*
This file is used to register all global Vue components
*/
import Vue from 'vue'

// HEADER
import siteHeader from '~/components/site-header.vue'
Vue.component('site-header', siteHeader)

// FOOTER
import siteFooter from '~/components/site-footer.vue'
Vue.component('site-footer', siteFooter)
