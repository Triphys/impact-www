

<template>

  <section class="slice-impact-image impact-content">
    <div class="gc">
      <div class="g-12">
        <div class="content-image">
          
          <picture>
            <source media="(min-width: 769px)" :srcset="sliceRaw.primary.image.url">
            <source media="(min-width: 479px)" :srcset="sliceRaw.primary.image.tablet.url">
            <img :src="sliceRaw.primary.image.mobile.url" :alt="sliceRaw.primary.image.alt">
          </picture>

        </div>
      </div>
    </div>
  </section>

</template>

<script>
export default {
  props: ['sliceRaw'],
  name: 'slice-impact-image'
}
</script>

<style lang="scss">

  .slice-impact-image {
    .content-image {
      margin: 1.2em 0 1.8em;
    }
  }

</style>

