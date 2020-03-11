<template>

  <div class="site-footer" :class="{'-hide' : this.$route.name === 'startpage'}">

    <figure class="logo-footer">
      <svg-icon class="logo" name="impact" />
    </figure>

  </div>

</template>

<script>



export default {
  name: 'site-footer'
}
</script>

<style lang="scss" >

  .site-footer {
    background-color: darken($yellow, 5);
    padding: 56px 21px;
    text-align: center;
    .logo-footer svg {
      width: 100px;
      height: 33px;
    }

    @include VP768 {
      .logo-footer svg {
        width: 120px;
        height: 38px;
      }
    }
  }

</style>
