<template>

  <section class="slice-impact-content impact-content" :class="[border]">
    <div class="gc">

      <div class="g-12 border-top border"></div>

      <div class="g-6 slice-image">
        <img :src="sliceRaw.primary.image.url" />
      </div>

      <div class="g-6 slice-content">

        <div class="header">
          <prismic-rich-text class="header-styling" :field="sliceRaw.primary.header"/>
        </div>

        <div class="text">
          <prismic-rich-text :field="sliceRaw.primary.text"/>
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
      border: '-border-' + this.sliceRaw.primary.border__black_line_.toLowerCase() || false
    }
  }
}
</script>

<style lang="scss">

  .slice-impact-content {
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
