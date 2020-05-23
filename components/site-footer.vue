<template>

  <div class="site-footer" :class="{'-hide' : this.$route.name === 'startpage'}">

   <div class="gc">
    <prismic-rich-text :field="footerData.data.footer_text"/>
   </div>  

  </div>

</template>

<script>


export default {
  name: 'site-footer',
  data() {
    return {
      footerData: this.$store.getters.getFooterData
    };
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
    a {
      text-decoration: none;
      &:hover {
        color: $gray;
      }
    }

    @include VP1280 {
      font-size: 28px;
    }

  }

</style>
