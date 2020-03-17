<template>
  <div class="impact-page-content impact-page" >
   
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

import siteSlices   from '~/components/site-slices.vue'

export default {
  name: 'impact-page-content',
  transition: 'custom',
  components: {
    siteSlices
  },
  head () {
    return {
      title: this.sm.seo_page_title[0].text + ' | ' + this.document.page_title[0].text
    }
  },
  data () {
    return {
      sm: this.$store.getters.getSettingsData,
    }
  },
  async asyncData({ params, $prismic, error}) {
   
    const prismicUID = await $prismic.api.getByUID("content", params.uid)

    if (prismicUID) {
      return { document: prismicUID.data, slices: prismicUID.data.body }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
   
  }

}
</script>

<style lang="scss">
  .impact-page-content {}
</style>



