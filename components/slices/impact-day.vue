<template>
  <div class="slice-impact-day impact-content">
    
      <div class="day">
        
        <div class="day-header">
          <prismic-rich-text :field="sliceRaw.primary.day"/>
        </div>

        <div v-for="(item, index) in sliceRaw.items" :key="'i-' + index" class="day-session"> 
          <div class="day-session-time"><prismic-rich-text :field="item.time"/></div>
          <div class="day-session-text"><prismic-rich-text :field="item.session"/></div>
        </div>

      </div>

    </div>

  </div>

</template>

<script>
export default {
  props: ['sliceRaw'],
  name: 'slice-impact-day',
  mounted() {
      if (process.client) {
        if (document.querySelector('.nuxt-link-handler')){
          document.querySelector('.nuxt-link-handler').addEventListener('click', event => {
            event.preventDefault()
            this.$router.push(event.target.pathname)
          })
        }
      }
    }
}
</script>

<style lang="scss">

  .slice-impact-day {
        // 18,20,23
    font-size: 18px;
    font-family: $font-impact;
    p {
      margin: 0;
    }

    .day-session {
      padding-bottom: .85em;
    }

    .day-session-time {
      color: #6b6e68;
    }

    .day-session-text {
      color: $gray;
    }

    @include VP768 {
      font-size: 20px;
    } 

    @include VP1280 {
      font-size: 23px;
    } 
  }

</style>
