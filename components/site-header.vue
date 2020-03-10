<template>

  <div class="site-header" :class="{'-no-logo' : this.$route.name === 'startpage'}">

    <div class="menu-toggle" @click="toggleMenu">
      <div class="burger" >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div class="menu">



      <a  href="/startpage" class="logo-link">
        <svg-icon class="logo" name="impact" />
      </a>

      <ul>
        
        <li v-for="(item, index) in menuClean" :key="'i-' + index" :class="{'-show': item[2] === showSubMenu}"> 
          <!-- {{item}} -->
          <template v-if="item[1] !== '/undefined'">
            <a :href="item[1]" >{{item[0]}}</a>
          </template>
          <template v-else >
            <div @click="toggleSubMenu(item[2])"> {{item[0]}} </div>
          </template>

          <template v-if="item[4]">
            <ul class="sub">
              <li v-for="(subitem, index) in item[4]" :key="'i-' + index">
                <a :href="subitem[1]" >{{subitem[0]}}</a>
              </li>
            </ul>
          </template>
         
        </li>

      </ul> 

      <!-- {{menuData[2].items[0].link.link_type}} -->
      <!-- {{menuData[2].items[0].link.url}} -->
      <!-- {{menuData[2].items[1].link.link_type}}
      {{menuData[2].items[2].link.link_type}} -->
      <!-- {{menuData[2].items[2].link.url}} -->

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
      showSubMenu: undefined,
      sm: this.$store.getters.getSettingsData,
      menuData: this.$store.getters.getMenuData,
      menuClean: [],
      isMenuOpen: this.$store.getters.getMenu,
    };
  },
  methods: {
    clean(links){

      let _links = links;

      // The view model.
      let vm = this;

      _links.forEach(function(item,index) {

        let _item = []
        let _item_sub = []
        let item_url = false
        let item_sub_url = false
        let item_sub_text = false
        let item_text = item.primary.label[0].text
        let item_id = index + 1
        let item_sub = false

        if (item.primary.link.type === 'content') {
          item_url = '/' + item.primary.link.type + '/' + item.primary.link.slug 
        } else {
          item_url =  '/' + item.primary.link.type
        }

        // ITEM - Level 1
        _item.push(item_text)
        _item.push(item_url)
        _item.push(item_id)
        _item.push(item_sub)


        // SUB MENU

        if (item.items[0]) {
          item_sub = item.items

           item.items.forEach(function(item,index) {
              let _this_sub = []
              item_sub_text = item.sub_menu_link_label[0].text
  
              if (item.link.type === 'content') {
                item_sub_url = '/' + item.link.type + '/' + item.link.slug 
              } else {
                item_sub_url =  '/' + item.link.type
              }

              // THIS
              _this_sub.push(item_sub_text)
              _this_sub.push(item_sub_url)

              // SUB ITEM
              _item_sub.push(_this_sub)

          });


          // ITEM - Level 2
          _item.push(_item_sub)

        }

        // TO MENU CLEAN
        vm.menuClean.push(_item)

      });

    },
    toggleMenu: function(){
      this.isMenuOpen = !this.isMenuOpen;
      this.showSubMenu = 0
      this.$store.commit("setMenu",this.isMenuOpen)
    },
    toggleSubMenu: function(id){
        if (id === this.showSubMenu) {
          this.showSubMenu = 0
        } else {
          this.showSubMenu = id
        }
    },
    closeMenu: function(){

      this.$store.commit("setMenu",false)
    }
  },
  mounted() {
    this.clean(this.menuData)
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

    li.-show {
      ul.sub {
        display: block;
      }
    }

    ul.sub {
      display: none;
      
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
      overflow: visible;

      li.-show {
        display: inline-block!important;
        position: relative;

        ul.sub {
          position: absolute;
          top: 2em;
          left: -10px;
          text-align: left;
          background-color: $yellow;
          a {
            white-space: nowrap;
          }
        }
      }
      
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
