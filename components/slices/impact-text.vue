<template>
  <section class="slice-impact-text impact-content">
    <div class="gc">

      <div class="g-10 g-push-1 slice-content">
        <div class="content-text">
          
          <prismic-rich-text :field="sliceRaw.primary.text"/>
          
        </div>
      </div>

    </div>

  </section>
</template>

<script>
export default {
  props: ['sliceRaw'],
  name: 'slice-impact-text',
  mounted() {
      if (process.client) {
        if (document.querySelector('.nuxt-link-handler')){
          document.querySelector('.nuxt-link-handler').classList.add("-debug-comp")
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

  .slice-impact-text {}

</style>
