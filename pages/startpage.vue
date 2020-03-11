<template>
  <div class="impact-page-startpage " :class="[ '-slide-' + this.impSlideIndex, {'-logo-yellow' : impLogoColor, '-logo-black' : !impLogoColor, '-slide-last' : this.impSlideLast}]">

     <!-- HEADER - SITE -->
    <site-header />


    <!-- LOGO - BIG CENTERED -->
    <div class="impact-wrapper"> 
      <figure>
        <svg version="1.1" id="Lager_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             width="172px" height="49px" viewBox="0 0 172 49" style="enable-background:new 0 0 172 49;" xml:space="preserve">
          <g>
            <path d="M13.8,1.9v44.9H2.2V1.9H13.8z"/>
            <path d="M54.6,1.9v44.9H44.4l0-30.3l-4.1,30.3h-7.2l-4.3-29.6l0,29.6H18.5V1.9h15.1c0.4,2.7,0.9,5.9,1.4,9.6l1.7,11.4l2.7-21H54.6z
              "/>
            <path d="M59.3,1.9H71c3.2,0,5.6,0.2,7.3,0.7c1.7,0.5,3,1.2,3.9,2.2s1.4,2.1,1.7,3.4c0.3,1.3,0.5,3.4,0.5,6.2v3.9
              c0,2.9-0.3,5-0.9,6.3c-0.6,1.3-1.7,2.3-3.3,3c-1.6,0.7-3.6,1.1-6.2,1.1H71v18.1H59.3V1.9z M71,9.6v11.4c0.3,0,0.6,0,0.9,0
              c1.1,0,1.8-0.3,2.2-0.8c0.4-0.5,0.6-1.6,0.6-3.3v-3.7c0-1.5-0.2-2.5-0.7-3C73.5,9.9,72.5,9.6,71,9.6z"/>
            <path d="M106.6,1.9l6.7,44.9h-11.9l-0.6-8.1h-4.2l-0.7,8.1H83.7l6-44.9H106.6z M100.4,30.8c-0.6-5.1-1.2-11.4-1.8-18.9
              c-1.2,8.6-1.9,14.9-2.2,18.9H100.4z"/>
            <path d="M142.5,21.5h-11.7v-7.8c0-2.3-0.1-3.7-0.4-4.3c-0.2-0.6-0.8-0.8-1.7-0.8c-1,0-1.6,0.3-1.8,1c-0.3,0.7-0.4,2.2-0.4,4.4v20.9
              c0,2.2,0.1,3.6,0.4,4.3c0.3,0.7,0.8,1,1.7,1c0.9,0,1.4-0.3,1.7-1c0.3-0.7,0.4-2.2,0.4-4.7v-5.6h11.7v1.8c0,4.7-0.3,7.9-1,9.9
              c-0.7,1.9-2.1,3.7-4.4,5.1c-2.2,1.5-5,2.2-8.3,2.2c-3.4,0-6.2-0.6-8.5-1.9c-2.2-1.2-3.7-3-4.4-5.1c-0.7-2.2-1.1-5.5-1.1-9.9V17.8
              c0-3.2,0.1-5.7,0.3-7.3c0.2-1.6,0.9-3.2,2-4.7s2.6-2.7,4.6-3.5c2-0.9,4.2-1.3,6.7-1.3c3.4,0,6.3,0.7,8.5,2c2.2,1.3,3.7,3,4.4,5
              c0.7,2,1.1,5.1,1.1,9.3V21.5z"/>
            <path d="M170.3,1.9v9h-6.9v35.9h-11.7V10.9h-6.9v-9H170.3z"/>
          </g>
        </svg>
      </figure>
    </div>

    <!-- SLIDER - BACKGROUND -->
    <div class="impact-slider">
      <div class="slider-body" :style="{ width: `${impSlidesWidth}`, left: `${impSlidePosition}` }">
        <div class="slide" v-for="(slide,index) in impSlides" :key="index" >
          <figure class="the-image" v-if="slide[1]"  :style="{ backgroundImage: `url(${slide[0]})` }"></figure>
        </div>      
      </div>
    </div>

  </div>
</template>


<script>

import Prismic from "prismic-javascript"
import PrismicConfig from "~/prismic.config.js"

import siteHeader from '~/components/site-header.vue'


export default {

  components: {
    siteHeader
  },
  data() {
    return {
      impSlidesOld: false,
      impSlideIndex: 0,
      impSlidePosition: 0,
      impSlidesWidth: 0,
      impSlides: [],
      impSlidesLength: 0,
      impLogoColor: false,
      impSlideLast: false,
    }
  },
  async asyncData({ params, error, req }) {
    try{
      // Query to get API object
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, {req})

      // Query to get content
      // const prismicSettings = await api.query(
      //   Prismic.Predicates.at("document.type", "settings")
      // )
      // const prismicMenu = await api.query(
      //   Prismic.Predicates.at("document.type", "menu")
      // )

      const prismicStartpage = await api.query(
        Prismic.Predicates.at("document.type", "startpage")
      )

      // Returns data to be used in template
      return {
        // menu: prismicMenu.results[0].data.body,
        slides: prismicStartpage.results[0].data.body[0].items
        // setfb: prismicSettings.results[0].data.facebook_url[0].text,
        // setin: prismicSettings.results[0].data.instagram_url[0].text
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  methods: {

    sliderSetup(slides){

      let clone = false;
      let _slides = slides;
      let _slidesClean = [];

      // The view model.
      let vm = this;

      _slides.forEach(function(item,index) {

        let _item = []
        let item_url = item.slide_image.url
        let item_color = true

        if (item_url === undefined) {
          item_color = false
        }

        _item.push(item_url)
        _item.push(item_color)

        vm.impSlides.push(_item)
        _slidesClean.push(_item)

      });

      clone = _slidesClean[0]
      _slidesClean.push(clone)


      /// HERE
      this.impSlides = _slidesClean

      // clone = this.impSlides[0]
      // this.impSlides.push(clone)
      // HERE

      this.impSlidesWidth = this.impSlides.length * 100 + 'vw'
      this.impSlidesLength = this.impSlides.length


      // Start slider
      setTimeout(() => this.next(), 5000); 

    },

    next(){
      
      // Slide index up one
      this.impSlideIndex++

      // Slider array length
      let sl = this.impSlidesLength - 1 

      // Setting 
      this.impLogoColor = this.impSlides[this.impSlideIndex][1]
      
      if (this.impSlideIndex  === sl) {
        this.impSlidePosition = this.impSlideIndex * -100 + 'vw'

        // Removing "transition" and moving Slider to start postion. 
        setTimeout(() => {
          this.impSlideLast = true
          this.impSlidePosition = '0vw'
        }, 2500);

        this.impSlideIndex = 0   
        setTimeout(() => this.next(), 5000);  

      } else {
        this.impSlideLast = false
        this.impSlidePosition = this.impSlideIndex * -100 + 'vw'
        setTimeout(() => this.next(), 5000); 
      }
          
    },
       

  },
  mounted () {
   this.sliderSetup(this.slides);
  },
  created () {
   
  }


}
</script>


<style lang="scss">

  .impact-page-startpage{
    height: 100vh;
    overflow: hidden;

    &.-logo-yellow {
      .impact-wrapper svg {
        fill: $yellow;
      }
    }

    &.-logo-black {
      .impact-wrapper svg {
        fill: $black;
      }
    }

    &.-slide-last  {
      .impact-slider .slider-body {
        transition: none!important
      }      
    }

    .impact-slider {
      overflow: hidden;
      position: fixed;
      background: $yellow;
      top: 0;
      width: 100vw;
      left: 0;
      height: 100vh;
      z-index: 1;
      .slider-body {
        position: relative;
        transition: all 675ms ease-in-out; 
      }
      .slide {
        width: 100vw;
        height: 100vh;
        float: left;
      }
      .the-image {
        width: 100vw;
        height: 100vh;
        background-position: center center;
        background-size: cover;
      }
    }

    .impact-wrapper {
      width: 86vw;
      max-width: 920px;
      min-width: 320px;
      padding: 0 24px 10vh;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      z-index: 2;
    }

    .impact-wrapper svg{
      fill: #000;
      width: 90%;
      height: auto;
      max-width: 690px;
      transition: fill 675ms ease-out;
    }

    figure {
      width:100%;
      text-align: center;
      width: 100%;
      margin: 0;
    }

    @include VP1024 {
      
        .logo-link{
          display: none;
        }

        .impact-wrapper svg{
          transition: fill 1000ms ease-out;
        }
        .impact-slider {
          .slider-body {
            transition: all 1000ms ease-in-out;
          }
        }
      
    }

  }

</style>
