<template>
  <div class="site-grid" :class="{'-menu-open': this.$store.getters.getMenu, '-portrait': this.orientation === 'p', '-landscape': this.orientation === 'l','-menu-navigate': this.$store.getters.getMenuNavigate,}">
    
    <site-header />

    <nuxt />
    
  </div>
</template>

<script>

export default {
  head () {
    return {
       title: this.sm.seo_page_title[0].text,
       meta: [
        { name: 'keywords', content: this.sm.seo_meta_keywords[0].text},
        { hid: 'description', name: 'description', content: this.sm.seo_meta_description[0].text}
      ],
    }
  },

  data () {
    return {
      orientation: null,
      sm: this.$store.getters.getSettingsData,
    }
  },
  methods: {
    onResize(event) {
      this.deviceOrientation()
    },
    deviceOrientation() {
      let winH = window.innerHeight;
      let winW = window.innerWidth;
      if (winH > winW && this.orientation !== 'p') {
        this.orientation = 'p'
        this.$store.commit("setOrientation",'portrait')
      } else if (winW > winH && this.orientation !== 'l'){
        this.orientation = 'l'
        this.$store.commit("setOrientation",'landscape')
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
    this.deviceOrientation();  
  },
  created() {
    
  }
}

</script>

