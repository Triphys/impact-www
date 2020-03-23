<template>

  <div class="site-footer" :class="{'-hide' : this.$route.name === 'startpage'}">

   <div class="gc">
    <prismic-rich-text :field="footerData.data.footer_text"/>
   </div>  

  </div>

</template>

<script>

import Prismic from "prismic-javascript"
import PrismicConfig from "~/prismic.config.js"

export default {
  name: 'site-footer',
  data() {
    return {
      footerData: this.$store.getters.getFooterData
    };
  }
}
</script>

<style lang="scss" >

  .site-footer {
    
    padding: 21px 21px;
    text-align: center;
    line-height: 1.256;
    margin: 0;
    font-size: 24px;
    font-family: $font-impact;
    p {
      margin: 0;
    }

    @include VP1280 {
      font-size: 28px;
    }

  }

</style>
