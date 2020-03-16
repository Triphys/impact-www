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
    
    padding: 56px 21px;
    text-align: center;
    .logo-footer {
      position: relative;
      width: auto;
      display: inline-block;
      svg {
        width: 100px;
        height: 33px;
      }
      &:before,
      &:after {
        content: '';
        height: 1px;
        width: 50px;
        background-color: $black;
        position: absolute;
        z-index: 1;
        top: 49%;
      }
      &:before {
        right: 112%;
      }
      &:after {
        left: 107%;
      }
    }

    @include VP768 {
      .logo-footer svg {
        width: 120px;
        height: 38px;
      }
    }

  }

</style>
