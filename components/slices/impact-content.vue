<template>

  <section class="slice-impact-content impact-content" :class="[border,pos]">
    <div class="gc">

      <div class="g-12 border-top border"></div>


      <div class="row " :class="{'-g-shift-vp600' : pos}">   
        <div class="g-6 slice-image" :class="{'content-video' : sliceRaw.primary.youtube.provider_url}">

          <template v-if="sliceRaw.primary.image && !sliceRaw.primary.youtube.provider_url">
            <prismic-image :field="sliceRaw.primary.image" />           
          </template>

          <template v-if="sliceRaw.primary.youtube.provider_url">
            <prismic-embed :field="sliceRaw.primary.youtube" />         
          </template>


        </div>

        <div class="g-6 slice-content">

          <div class="header">
            <prismic-rich-text class="header-styling" :field="sliceRaw.primary.header"/>
          </div>

          <div class="text">
            <prismic-rich-text :field="sliceRaw.primary.text"/>
          </div>

        </div>        
      </div>




      <div class="g-12 border-bottom border"></div>
      
    </div>

  </section>

</template>

<script>

  export default {
    props: ['sliceRaw'],
    name: 'slice-impact-content',
    data() {
      return {
        border: '-border-' + this.sliceRaw.primary.border__black_line_.toLowerCase() || false,
        pos: this.sliceRaw.primary.image_video_position.toLowerCase() === 'right' ?  true : false,
      }
    },
    mounted() {
      if (process.client) {
        if (document.querySelector('.nuxt-link-handler')){
          document.querySelector('.nuxt-link-handler').addEventListener('click', event => {
            event.preventDefault()
            this.$router.push(event.target.pathname)
          })
        }
      }
    },
  }

</script>

<style lang="scss">

  .slice-impact-content {
     .content-video {
      margin-bottom: 1.2em;
      > div {
        @include aspect-ratio-iframe(4,3);
        position: relative;
        padding: 0 14px;
      }
    }
    .slice-image {
      min-height: 1px;
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

    &.-border-top {
      .border-top {
        display: block;
        margin-bottom: 14px; 
      }
    }

    &.-border-bottom {
      .border-bottom {
        display: block;
        margin-bottom: 14px; 
      }
    }

    &.-border-both {
      .border-top {
        display: block;
        margin-bottom: 28px; 
      }
      .border-bottom {
        display: block;
        margin-bottom: 28px; 
      }
    }

    @include VP768 {
      .slice-image {
        min-height: 1px;
        margin-bottom: 28px;
      }


      &.-border-top {
        .border-top {
          margin-bottom: 28px; 
        }
      }

      &.-border-bottom {
        .border-bottom {
          margin-bottom: 28px; 
        }
      }

      &.-border-both {
        .border-top {
          margin-bottom: 28px; 
        }
        .border-bottom {
          margin-bottom: 28px; 
        }
      }

    }

  }

</style>
