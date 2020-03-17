<template>

  <section class="slice-impact-video impact-content">
    <div class="gc">
      <div class="g-12 content-video">
        <prismic-embed :field="sliceRaw.primary.youtube" />
      </div>
    </div>
  </section>

</template>

<script>
export default {
  props: ['sliceRaw'],
  name: 'slice-impact-video'
}
</script>

<style lang="scss">

  .slice-impact-video {
    .content-video {
      margin-bottom: 1.2em;
      > div {
        @include aspect-ratio-iframe(16,9);
        position: relative;
        padding: 0 14px;
      }
    }
  }

</style>
