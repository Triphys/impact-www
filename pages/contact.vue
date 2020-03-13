<template>

  <div class="impact-page impact-page-contact site-grid -border-bottom" >


    <!-- HEADER - SITE -->
        
        <!-- <site-header /> -->


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
      

    <!-- MAP -->

        <div class="gc">

          <div class="g-6 page-map">
            <GMap
              ref="gMap"
              :center="{lat: impLoc[0].latitude, lng: impLoc[0].longitude}"
              :options="{fullscreenControl: true, streetViewControl: true, mapTypeControl: true, zoomControl: true, gestureHandling: 'cooperative'}"
              :zoom="13"
            >
              <GMapMarker
                v-for="location in impLoc"
                :key="location.id"
                :position="{lat: location.latitude, lng: location.longitude}"
              >
              </GMapMarker>
            </GMap>
          </div>

          <div class="g-6 page-content">
            <prismic-rich-text :field="document.adress"/>
          </div>

          <div class="g-12 border-bottom border"></div>

        </div>  


    <!-- FOOTER - SITE -->

        <site-footer />


  </div>

</template>

<script>

import Prismic from "prismic-javascript"
import PrismicConfig from "~/prismic.config.js"

import siteHeader from '~/components/site-header.vue'
import siteFooter from '~/components/site-footer.vue'

export default {
  name: 'impact-page-contact',
  transition: 'custom',
  components: {
      siteHeader,
      siteFooter
    },
  data() {
    return {
      impLoc: [{ "latitude": 59.299440, "longitude": 18.015775 }],
    }
  },
  async asyncData({ params, error, req }) {
    try{
      // Query to get API object
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, {req})

      // Query to get singel page
      const prismicContact = await api.getSingle('contact')

      // Returns data to be used in template
      return {
        document: prismicContact.data
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>


<style lang="scss">

  .impact-page-contact {

    .page-content {
      text-transform: uppercase;
      font-family: $font-impact;
      font-size: 20px;
      @include VP768 {
        font-size: 24px
      }
    }

    .page-map {
      margin-bottom: 14px;
    }
    .text {
      margin-top: 12px;
    }

    // BORDER
    .border {
      display: none;
       &:before {
        content: '';
        display: block;
        height: 1px;
        width: 100%;
        background-color: $black;
      }
    }



    &.-border-bottom {
      .border-bottom {
        display: block;
        margin-bottom: 14px; 
      }
    }



    @include VP768 {
      .page-map {
        margin-bottom: 28px;
      }

      &.-border-bottom {
        .border-bottom {
          margin-bottom: 28px; 
        }
      }

    }



  }

</style>
