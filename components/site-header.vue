<template>

  <div class="site-header" :class="{'-no-logo' : this.$route.name === 'startpage'}">

    <!-- <div class="site-home" @click="closeMenu">
      <nuxt-link to="/" ><svg-icon class="logo" name="activetalents-filled" /></nuxt-link>
    </div> -->


    <div class="menu-toggle" @click="toggleMenu">
      <div class="burger" >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <!-- {{menu}}<br><br> -->


    <div class="menu">
      <!-- <ul @click="navigateMenu"> -->
        <a  href="/" class="logo-link">
          <svg-icon class="logo" name="impact" />
        </a>
      <ul>

        <li><div>Träning</div>

          <ul class="sub">
            <li>
              <a href="/">Thaiboxning</a>
            </li>
            <li>
              <a href="/">PT</a>
            </li>
          </ul>

        </li>
        <li>
            <a href="/">Schema</a>
        </li>
        <li>
            <a href="/">Priser</a>
        </li>
        <li>
            <a href="/">Om Oss</a>
        </li>
        <li>
            <a href="/">Hitta Hit/Kontak</a>
        </li>
     

       <!--  <li v-for="(item, index) in menu" :key="'i-' + index"> -->

<!--           <br>
          {{item.primary.label}}
          <prismic-link :field="item.primary.link">{{item.primary.label[0].text}}</prismic-link>

          <br>
          <br> -->
          <!-- <a :href="item.href"></a> -->
     <!--      {{item.items}} <br>
          <br>

          <div v-for="(item2, index) in item.items" :key="'a-' + index">
            {{item2.link_3.uid}} <br><br>
          </div> -->
        </li>

        <!--   
          <li><nuxt-link  to="/content/mahatma-gandhi" >Gandhi</nuxt-link></li>
          <li><nuxt-link  to="/content/nelson-mandela" >Mandela</nuxt-link></li> 
          <li><nuxt-link  to="/event" >Event</nuxt-link></li>
          <li><nuxt-link  to="/contact" >Contact</nuxt-link></li> 
        -->

      </ul>
    </div>

    <div class="social-links">
      <a :href="setfb" target="_blank"><svg-icon class="logo-icon" name="facebook" /></a>
      <a :href="setin" target="_blank"><svg-icon class="logo-icon" name="instagram" /></a>
    </div>

  </div>

</template>


<script>



export default {
  name: 'site-header',
  props: ['menu','setfb','setin'],
  components: {
  },
  data() {
    return {
      sm: this.settings,
      isMenuOpen: this.$store.getters.getMenu,
    };
  },
  methods: {
    toggleMenu: function(){
      this.isMenuOpen = !this.isMenuOpen;
      this.$store.commit("setMenu",this.isMenuOpen)
    },
    closeMenu: function(){
      this.$store.commit("setMenu",false)
    },
    // navigateMenu: function(){
    //   this.$store.commit("setMenuNavigate",true)
    //   setTimeout(() => {
    //     this.$store.commit("setMenuNavigate",false)
    //     this.closeMenu();
    //   }, 425);

    // }
  },
  mounted() {
    console.log(this.$route.name)
  }
}
</script>

<style lang="scss" >

.site-header {
  position: fixed !important;
  padding: 0!important;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 20;

  .social-links {
    display: none;
  }


  .menu-toggle {
    position: absolute;
    z-index: 5;
    right: 0;
    top: 0;
    box-sizing: content-box;

    .burger {
      position: relative;
      margin: 14px;
      width: 30px;
      text-align: center;
      cursor: pointer;
      z-index: 5;

      span {
        height: 3px;
        display: block;
        margin-bottom: 7px;
        background: $black;
        transition: all .325s ease-out;
        position: relative;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        
        &:nth-child(1) {
          top: 0;
        }
        &:nth-child(3) {
         bottom: 0;
         top: auto;
        }
      }

      &:hover {
        cursor: pointer;
      }

    }
  }

  .menu {
    position: absolute;
    visibility: hidden;
    z-index: -1;
    top:0;
    height: 100vh;
    width: 100%;
    overflow: scroll;
    opacity: 0;
    background: $yellow;
    padding: 10px 24px 24px;
    text-align: center;

    .logo {
      width: 100px;
      height: 33px;
      margin-top: 7px;
      &:hover {
        fill: $grey;
        cursor: pointer;
      }
    }
    ul a, 
    ul div {
      display: block;
      text-decoration: none;
      font-size: 28px;
      line-height: 1.1;
      font-family: $font-impact;
      border-bottom: 1px solid $black;
      padding: 11px 0 12px;
      &:hover {
        color: $grey;
      }
    }

    > ul {
       margin: 21px 0;
       border-top: 1px solid $black;
    }

    ul.sub {
      display: none;
      &.-show {
        display: block;
      }
      a {
        color: $grey;
        border-bottom: none;
        padding-bottom: 0;
      }
      padding-bottom: 14px;
      border-bottom: 1px solid $black;
    }
  }

  ul {
  
    text-align: center;
    padding: 0;
    margin: 0;
    
    li {
      margin: 0;
      padding: 0;
      list-style-type: none;

    }



  }

  .-menu-open &{

    .site-home {
      
    }

    .menu-toggle {
      .burger {
        span {
          &:nth-child(1) {
            width: 100%;
            transform: rotate(135deg);
            top: 10px;
          }
          &:nth-child(2) {
            width: 0;
            opacity: 0;
            transition: all .275s ease-out;

          }
          &:nth-child(3) {
            width: 100%;
            transform: rotate(-135deg);
            bottom: 10px;
          }
        }
      }
     }

   .menu-background {
      height: 200vw;
      width: 200vw;
      top: -50vw;
      right: -50vw;
      transition: all .225s ease-in-out;
      transform: rotate(-37.5deg);
      //border-radius: 100%;
    }

    .menu {
      opacity: 1;
      visibility: visible;
      z-index: 4;
    }

  }

  @include VP1024 {

    &.-no-logo {
      .logo-link {
        display: none;

      }
      .menu {
        background: none;
      }
    }
   

    .social-links {
      display: block;
      float: right;
      margin: 14px 21px 0 0;
      svg {
        width: 40px;
        height: 40px;
        margin: 7px 7px 0;
      }
      a {
        display: inline-block;
        &:hover {
          svg {
            fill: $grey;
          }
        }
      }
    }

    .menu-toggle {
      display: none;
    }

    .menu {
      

      .logo-link {
         position: absolute;
         top: 18px;
         left: 21px;
      }

      .logo {
       
        margin-top: 0;
        
        width: 120px;
        height: 38px;
      }

      display: block;
      visibility: visible;
      opacity: 1;
      padding: 14px 28px 17px;
      height: auto;
      li {
        display: inline-block;
        margin-left: 10px;
        margin-right: 10px;
      }
      ul a,
      ul div  {
        border: none;
      }
      > ul {
        margin: 0;
       border-top: none;
    }

    ul.sub {
        a {
          border-bottom: none;
        }
        border-bottom: none;
      }
    }
  }

}

</style>
