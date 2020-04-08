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

    <div class="gc ">
      <div class="g-12 day-layout">

      <!-- SLICES / CONTENT - - From Prismic -->
      <site-slices :slicesRaw="slices"/>
        
      </div>  
    </div>
      


    <!-- FOOTER - SITE -->  
    <site-footer />

  </div>
</template>

<script>

import siteSlices   from '~/components/site-slices.vue'

export default {
  name: 'impact-page-schema',
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

  // @nuxt/prismic-nuxt

  async asyncData({ params, $prismic, error}) {
   
    const prismicUID = await $prismic.api.getByUID("schema", params.uid)

    if (prismicUID) {
      return { document: prismicUID.data, slices: prismicUID.data.body }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
   
  }

}
</script>

<style lang="scss">
  .day-layout > div {
    
    @include VP320 {
      display: flex;
      flex-wrap: wrap;
      > div {
        width: 50%;
      }
    }

    @include VP600 {
      > div {
        width: 33%;
      }
    }


    @include VP768 {
      > div {
        width: 25%;
      }
    }

    @include VP1024 {
      > div {
        width: 20%;
      }
    }

  }
</style>



