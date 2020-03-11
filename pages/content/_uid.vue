<template>
  <div class="impact-page-content impact-page" :data-wio-id="documentId">
   

    <!-- HEADER - SITE -->

      <site-header />


    <!-- HEADER / PAGE TITLE -->

      <section class="page-impact-header" v-if="document.page_title[0].text">
        <div class="gc">
          <div class="g-12 header">
            <h2 class="impact-header">
              {{document.page_title[0].text}}
            </h2>
          </div>
        </div>
      </section>
      

    <!-- SLICES / CONTENT - - From Prismic -->

      <site-slices :slicesRaw="slices"/>


    <!-- FOOTER - SITE -->
        <site-footer />

  </div>
</template>

<script>

import Prismic from "prismic-javascript"
import PrismicConfig from "~/prismic.config.js"

import siteHeader from '~/components/site-header.vue'
import siteFooter from '~/components/site-footer.vue'
import siteSlices   from '~/components/site-slices.vue'

export default {
  name: 'impact-page-content',
    components: {
      siteHeader,
      siteFooter,
      siteSlices
    },
  head () {
    return {
      title: 'Impact | ' + this.document.page_title[0].text
    }
  },
  async asyncData({ params, error, req }) {
    try{
      // Query to get API object
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, {req})

      // Query to get dynmaic page content by UID
      const post = await api.getByUID("content", params.uid)

      // Returns data to be used in template
      return {
        document: post.data,
        documentId: post.id,
        slices: post.data.body
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  },

}
</script>

<style lang="scss">
  .impact-page-content {}
</style>



