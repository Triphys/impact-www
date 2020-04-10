<template>
  <section class="slice-impact-heading impact-content">
    <div class="gc">

      <div class="g-10 g-push-1 slice-content">
        <div class="content-text" :class="{'-text-center' : sliceRaw.primary.heading[0].type === 'heading2'}">
          <prismic-rich-text :field="sliceRaw.primary.heading"/>
        </div>
      </div>

    </div>

  </section>
</template>

<script>
export default {
  props: ['sliceRaw'],
  name: 'slice-impact-heading',
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

  .slice-impact-heading {

  }

</style>
