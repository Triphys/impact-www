<template>

  <div class="site-header" :class="{'-no-logo' : this.$route.name === 'startpage'}">

    <a  href="/startpage" class="logo-link">
      <svg-icon class="logo" name="impact" />
    </a>

    <div class="menu-toggle" @click="toggleMobileMenu">
      <div class="burger" >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div class="menu">

      <ul>

        
        <li v-for="(item, index) in menuClean" :key="'i-' + index" :class="{'-show': item[2] === showSubMenu, '-active': item[2] === activeLink}"> 
          <!-- {{item}} -->
          <template v-if="item[1] !== '/undefined'">
            <a :href="item[1]" >{{item[0]}}</a>
          </template>
          <template v-else >
            <div @click.prevent="toggleSubMenu(item[2])">{{item[0]}}</div>
          </template>

          <template v-if="item[5]">
            <ul class="sub">
              <li v-for="(subitem, index) in item[5]" :key="'i-' + index" :class="{'-active': subitem[2] === activeSubLink}">
                <a :href="subitem[1]" >{{subitem[0]}}</a>
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
      showSubMenu: undefined,
      activeLink: false,
      activeSubLink: false, 
      sm: this.$store.getters.getSettingsData,
      menuData: this.$store.getters.getMenuData,
      menuClean: [],
      isMenuOpen: this.$store.getters.getMenu,
    };
  },
  methods: {
    menuAndActiveLink(links){

      let _links = links;
      let url_uid = this.$route.params.uid
      console.log(url_uid)

      // The view model.
      let vm = this;

      _links.forEach(function(item,index) {

        let _item = []
        let _item_sub = []
        let item_url = false
        let item_text = item.primary.label[0].text
        let item_id = index + 1
        let item_uid = false

        let _this_sub = false
        let item_sub = false
        let item_sub_text = false
        let item_sub_url = false
        let item_sub_id = false
        let item_sub_id_parent = item_id
        let item_sub_uid = false

        if (item.primary.link.type === 'content') {
          item_url = '/' + item.primary.link.type + '/' + item.primary.link.uid
          item_uid = item.primary.link.uid
        } else if (item.primary.link.type === 'contact') {
          item_url = '/' + item.primary.link.uid
          item_uid = item.primary.link.uid
        } else if (item.primary.link.type === 'Media' || (item.primary.link.type === 'Web')) {
          item_url = item.primary.link.url
        } else {
          item_url =  '/' + item.primary.link.type
        }

        // Set Level 1 Active (if no sub menu)

        if (url_uid === item_uid) {
          console.log('active -> ' + item_uid)
          vm.activeLink = item_id
        }

        // ITEM - Level 1
        _item.push(item_text)
        _item.push(item_url)
        _item.push(item_id)
        _item.push(item_sub)
        _item.push(item_uid)


        // SUB MENU
        if (item.items[0] !== undefined) {

          item_sub = item.items
          item.items.forEach(function(item,index) {

            _this_sub = []
            item_sub_id = item_id + (index + 1)

            if (item.link.type === 'content') {
               item_sub_url = '/' + item.link.type + '/' + item.link.uid
               item_sub_text = item.sub_menu_link_label[0].text
               item_sub_uid = item.link.uid
            } else if (item.link.type === 'contact') {
              item_sub_url = item.link.uid
              item_sub_uid = item.link.uid

            } else if (item.link.link_type === 'Media' || (item.link.link_type === 'Web')) {
              item_sub_url = item.link.url 
              item_sub_text = item.sub_menu_link_label[0].text
            } else {
              item_sub_url =  '/' + item.link.type
            }

            if (url_uid === item_sub_uid) {
              console.log('active sub -> ' + item_sub_uid)
              vm.activeLink = item_id
              vm.activeSubLink = item_sub_id
            }

            // THIS (SUB ITEM)
            _this_sub.push(item_sub_text)
            _this_sub.push(item_sub_url)
            _this_sub.push(item_sub_id)
            _this_sub.push(item_sub_id_parent)
            _this_sub.push(item_sub_uid)

            // SUB ITEM
            _item_sub.push(_this_sub)

            console.log(_this_sub);

          });


          // ITEM - Level 2
          _item.push(_item_sub)

          

        }

        

        // TO MENU CLEAN
        vm.menuClean.push(_item)

      });

    },
    toggleMobileMenu: function(){
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
    this.menuAndActiveLink(this.menuData)

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

  .logo-link {
    position: absolute;
    top: 2px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
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
    background: $yellow;
    padding: 10px 24px 24px;
    text-align: center;
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
      .impact-page-startpage & {
        color: $black;
      }
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
      ul.sub {
        display: block;
      }
    }

    li.-active {
      > a, 
      > div {
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
      height: 100vh;
      > ul {
        display: block;
      }
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
      position: absolute;
      top: 18px;
      left: 21px;
      transform: translateX(0);
    }

    .logo {
      margin-top: 0;
      width: 120px;
      height: 38px;
    }

    .menu {
      overflow: visible;
      height: auto;

      > ul {
        display: block;
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
      
      display: block;
      visibility: visible;
      opacity: 1;
      padding: 14px 28px 17px;
      height: auto;
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

}

</style>
