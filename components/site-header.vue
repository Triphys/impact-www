<template>

  <div class="site-header" :class="{'-no-logo' :this.$route.name === 'index'}">

    <nuxt-link :to="'/'" class="logo-link">
      <svg-icon class="logo" name="impact" @click="closeMenu()"/>
    </nuxt-link>

    <div class="menu-toggle" @click="toggleMobileMenu">
      <div class="burger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div class="menu">
      <ul>
        <li v-for="(item, index) in menuData" :key="'i-' + index" :class="{'-show': index === showSubMenu, '-active': index === activeParentLink}" >
       
          <template v-if="item.primary.link.link_type !== 'Any' ">
            <span @click="cleanMenu()">
              <prismic-link :field="item.primary.link">{{item.primary.label[0].text}}</prismic-link> 
            </span>
          </template>
          <template v-else>

              <div @click.prevent="toggleSubMenu(index)">{{item.primary.label[0].text}}</div> 

              <ul class="sub" v-if="item.items" @click="closeMenu(index)">
              <li v-for="(item, index) in item.items" :key="'i-' + index" >

               <template v-if="item.sub_menu_link_label.length > 0">
                  <prismic-link :field="item.link">{{item.sub_menu_link_label[0].text}}</prismic-link>
                </template>
              
              </li>
            </ul>
          
          </template>    
        </li>
      </ul> 
    </div>

    <div class="social-links">
      <a :href="sm.facebook_url[0].text" target="_blank"><svg-icon class="logo-icon" name="facebook" /></a>
      <a :href="sm.instagram_url[0].text" target="_blank"><svg-icon class="logo-icon" name="instagram" /></a> 
    </div>


  </div>

</template>


<script>



export default {
  name: 'site-header',
  data() {
    return {
      showSubMenu: false,
      activeParentLink: false,
      noLogo: false, 
      sm: this.$store.getters.getSettingsData,
      menuData: this.$store.getters.getMenuData,
      menuClean: [],
      isMenuOpen: this.$store.getters.getMenu,
      isMenuO: false,
    };
  },
  methods: {

    subLinkActive(id){
      setTimeout(() => {
        this.activeParentLink = id
      }, 300);

    },
    onResize(event) {
      this.$store.commit("setMenu",false)
      this.showSubMenu = false
    },
    toggleMobileMenu: function(){
      if (this.$store.getters.getMenu) {
        this.isMenuOpen = false;
      } else {
        this.isMenuOpen = true;
      }
      this.showSubMenu = false
      this.$store.commit("setMenu",this.isMenuOpen)
    },
    toggleSubMenu: function(id){
        if (id === this.showSubMenu) {
          this.showSubMenu = false
        } else {
          this.showSubMenu = id
        }
    },
    closeMenu: function(id){
      
      setTimeout(() => this.$store.commit("setMenu",false), 300)
      setTimeout(() => this.activeParentLink = false, 290)

      this.showSubMenu = false
      this.subLinkActive(id)
     
    },
    cleanMenu: function(){
      
      this.showSubMenu = false
      this.$store.commit("setMenu",false)

      this.subLinkActive(false)
     
    }
  },
  mounted() {
    console.log(this.$route);
    window.addEventListener('resize', this.onResize)
  },
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

  a,
  li > div {
    transition: all .275s ease-in-out;
  }

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
        transition: all .275s ease-out;
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

  &.-no-logo {
    .logo {
      opacity: 0;
    } 
    .menu-toggle {
      .burger {
        span {
          background: $yellow;
        }
      }  
    }
  }

  .-menu-open &{
    .logo {
      opacity: 1;
    }
  }

  .logo-link {
    position: absolute;
    top: 2px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    opacity: 1;

  }

  .logo {
    width: 100px;
    height: 33px;
    margin-top: 7px;
    
    &:hover {
      fill: $grey;
      cursor: pointer;
    }
  }

  .menu {
    position: absolute;
    z-index: 1;
    top:0;
    height: 52px;
    width: 100%;
    overflow: scroll;
    opacity: 1;
    background-color: rgba(255,227,0,1);
    padding: 10px 24px 24px;
    text-align: center;
    transition: background-color .275s ease-out .275s;

    ul {
      display: none;
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
      color: $grey;

      &:hover {
        color: darken($grey, 8);
        .impact-page-startpage & {
          color: lighten($black,44);
        }
      }

    }

    

    > ul {
      margin: 50px 0 21px;
      border-top: 1px solid $black;
    }

    li.-show {
      div {
        border-bottom: none;
      }
      ul.sub {
        display: block;
      }
    }

    li.-active{
      > div {
        color: $black;
        &:hover {
          color: $black;
        }
      }
    }

    li,
    li li {
       a.nuxt-link-active {
        color: $black;
        &:hover {
          color: $black;
        }
      }
    }

    ul.sub {
      display: none;
      padding-bottom: 14px;
      border-bottom: 1px solid $black;
      a {
        color: $grey;
        border-bottom: none;
        padding-bottom: 0;
      }
      li.-active {
        > a{
          color: $black;
          &:hover {
            color: $black;
          }
        }
      }
    }
  }


  &.-no-logo {
    .menu {
      background-color: rgba(255,227,0,0);
      transition: all .275s ease-out ;

      ul a, 
        ul div {
          color: $black;
        }
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
          color: $black;
          &:nth-child(1) {
            width: 100%;
            transform: rotate(135deg);
            top: 10px;
          }
          &:nth-child(2) {
            width: 0;
            opacity: 0;
            transition: all .225s ease-out;
          }
          &:nth-child(3) {
            width: 100%;
            transform: rotate(-135deg);
            bottom: 10px;
          }
        }
      }
     }


     &.-no-logo {
         .menu-toggle {
          .burger {
            span {
              background: $black;
            }
          }  
        }
      }



    .menu {
      background-color: rgba(255,227,0,1);
      opacity: 1;
      height: 100vh;
      > ul {
        display: block;
      }
    }

  }

  @include VP1280 {

    &.-no-logo {
      .logo-link {
        opacity: 0;
      }
      .menu {
       background-color: rgba(255,227,0,0);
       padding: 14px 28px 14px;
        li.-show ul.sub{
          background-color: rgba(255,227,0,0);
        }
        ul a, 
        ul div {
            color: $yellow;
            &:hover {
              color: darken($yellow, 10);
            }
          }
       }


      .social-links {
     
        svg {
          fill: $yellow;
          transition: all .275s ease-in-out;
        }
        a {
          display: inline-block;
          &:hover {
            svg {
              fill: darken($yellow, 10);
            }
          }
        }
      }




      }

   
    .social-links {
      display: block;
      float: right;
      margin: 14px 21px 0 0;
      position: relative;
      z-index: 3;
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

    .logo-link {
      opacity: 1;
      transition: opacity .275s ease-out;
      position: absolute;
      top: 18px;
      left: 21px;
      transform: translateX(0);
    }

    .logo {
      margin-top: 0;
      width: 160px;
      height: 53px;
      transition: all .275s ease-in-out;
    }

    .menu {
      background-color: rgba(255,227,0,1);
      overflow: visible;
      height: auto;
      display: block;
      visibility: visible;
      opacity: 1;
      padding: 14px 28px 28px;
      height: auto;

      > ul {
        display: block;
        > li > span a, 
        > li > div {
          padding: 4px 0 12px;           
        }
      }

      li.-show {
        display: inline-block!important;
        position: relative;

        ul.sub {
          position: absolute;
          top: 2em;
          left: -10px;
          text-align: left;
          background-color: $yellow;
          .impact-page-startpage &{
            background-color: transparent;
          }
          a {
            white-space: nowrap;
          }
        }
      }
      
      
      li {
        display: inline-block;
        margin-left: 10px;
        margin-right: 10px;
        li {
          display: block;
        }
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

  @include VP1280 {

    .logo {
      width: 180px;
      height: 60px;
    }

    .menu {
      padding: 14px 28px 40px;
    }

  }

   @include VP1368 {

    .logo {
      width: 240px;
      height: 79px;
    }

  }

}



</style>
