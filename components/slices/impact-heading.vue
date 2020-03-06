<template>

  <section class="slice-impact-heading impact-content">
    <div class="gc">


      <div class="g-10 g-push-1 slice-content">
       


        <div class="content-text">

          <prismic-rich-text :field="sliceRaw.primary.heading"/>

        </div>
      </div>



    </div>

  </section>

</template>

<script>
export default {
  props: ['sliceRaw'],
  name: 'slice-impact-heading'
}
</script>

<style lang="scss">

  .slice-impact-heading {

  }

</style>
