
// import Prismic from "prismic-javascript"

export const state = () => ({
  activeLink: 1,
  footerData: false,
  menuData: false,
  settingsData: false,
  menu: false,
  orientation: false,
  menuNavigate: false,
  pageData: null,
  api: null,
  searchIndex: false
})

export const mutations = {
  setActiveLink(state, res) {
    state.activeLink = res
  },
  setFooterData(state, res) {
    state.footerData = res
  },
  setMenuData(state, res) {
    state.menuData = res
  },
  setSettingsData(state, res) {
    state.settingsData = res
  },
  setMenu(state, res) {
    state.menu = res
  },
  setOrientation(state, res) {
    state.orientation = res
  },
  setMenuNavigate(state, res) {
    state.menuNavigate = res
  },
  setPageData(state, res) {
    state.pageData = res
  },
  setApi(state, res) {
    state.api = res
  },
  setSearchIndex(state, data) {
    state.searchIndex = data
  }
}

export const actions = {
  
  async fetchData({ commit }, $prismic) {

    // Init -> layouts/default.vue

    try {

      //Query to get content
      const prismicSettings = await $prismic.api.query($prismic.predicates.at('document.type', 'settings'))

      const prismicMenu = await $prismic.api.query($prismic.predicates.at('document.type', 'menu'))
      const prismicFooter = await $prismic.api.getSingle('footer') 

      // Add to store
      commit('setMenuData', prismicMenu.results[0].data.body)
      commit('setSettingsData', prismicSettings.results[0].data)
      commit('setFooterData', prismicFooter)

    } catch (e) {
      console.log('fetchData() - - - CATCH - - - ' , e);
    }

  },
  setActiveLink(vuexContext, res) {
    vuexContext.commit('setActiveLink', res)
  },
  setFooterData(vuexContext, res) {
    vuexContext.commit('setFooterData', res)
  },
  setMenuData(vuexContext, res) {
    vuexContext.commit('setMenuData', res)
  },
  setSettingsData(vuexContext, res) {
    vuexContext.commit('setSettingsData', res)
  },
  setMenu(vuexContext, res) {
    vuexContext.commit('setMenu', res)
  },
  setOrientation(vuexContext, res) {
    vuexContext.commit('setOrientation', res)
  },
  setMenuNavigate(vuexContext, res) {
    vuexContext.commit('setMenuNavigate', res)
  },
  setPageData(vuexContext, res) {
    vuexContext.commit('setPageData', res)
  },
  setApi(vuexContext, res) {
    vuexContext.commit('setApi', res)
  },
  setSearchIndex(vuexContext, data) {
    vuexContext.commit('setSearchIndex', data)
  }
}

export const getters = {
  getActiveLink(state) {
    return state.activeLink
  },
  getFooterData(state) {
    return state.footerData
  },
  getMenuData(state) {
    return state.menuData
  },
  getSettingsData(state) {
    return state.settingsData
  },
  getMenu(state) {
    return state.menu
  },
  getOrientation(state) {
    return state.orientation
  },
  getMenuNavigate(state) {
    return state.menuNavigate
  },
  getPageData(state) {
    return state.pageData
  },
  getApi(state) {
    return state.api
  },
  getSearchIndex(state) {
    return state.searchIndex
  }
}
