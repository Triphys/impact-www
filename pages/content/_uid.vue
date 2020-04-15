<template>
  <div class="impact-page-content impact-page">
   
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
    <!-- <site-slices :slicesRaw="slices"/> -->
    <div v-for="(slice, index) in slices" :key="'slice-' + index">
      <div>

        <!-- *** CONTENT PAGETYPE *** -->

        <!-- HEADER -->
        <template v-if="slice.slice_type === 'content_-_heading'">
          <slice-heading :sliceRaw="slice"/>
        </template>

      
        <!-- TEXT -->
        <template v-if="slice.slice_type === 'text'">
          <slice-text :sliceRaw="slice"/>
        </template>


        <!-- IMAGE & TEXT -->
        <template v-if="slice.slice_type === 'image-and-text'">
          <slice-text :sliceRaw="slice"/>
        </template>


        <!-- VIDEO -->
        <template v-if="slice.slice_type === 'video'">
          <slice-video :sliceRaw="slice"/>
        </template>


        <!-- IMAGE -->
        <template v-if="slice.slice_type === 'image'">
          <slice-image :sliceRaw="slice"/>
        </template>


        <!-- IMAGE + TEXT -->
        <template v-if="slice.slice_type === 'image___text_'">
          <slice-image-text :sliceRaw="slice"/>
        </template>
      
      </div>
    </div>

    <!-- FOOTER - SITE -->  
    <site-footer />


  </div>
</template>

<script>

import sliceHeading  from '~/components/slices/impact-heading.vue'
import sliceVideo  from '~/components/slices/impact-video.vue'
import sliceImage  from '~/components/slices/impact-image.vue'
import sliceText  from '~/components/slices/impact-text.vue'
import sliceImageText  from '~/components/slices/impact-content.vue'
import sliceDay  from '~/components/slices/impact-day.vue'

// import siteSlices   from '~/components/site-slices.vue'

export default {
  name: 'impact-page-content',
  transition: 'custom',
  components: {
    // siteSlices,
    sliceHeading,
    sliceImageText,
    sliceVideo,
    sliceImage,
    sliceText,
    sliceImageText,
    sliceDay
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



