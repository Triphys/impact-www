
import Prismic from "prismic-javascript"
import PrismicConfig from "~/prismic.config.js"

export const state = () => ({
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
  
  async nuxtServerInit ({ commit }, { req }) {

    //console.log('nuxtServerInit');

    // Query to get API object
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, {req})

    //Query to get content
      const prismicSettings = await api.query(
        Prismic.Predicates.at("document.type", "settings")
      )
      const prismicMenu = await api.query(
        Prismic.Predicates.at("document.type", "menu")
      )

    commit('setMenuData', prismicMenu.results[0].data.body)
    commit('setSettingsData', prismicSettings.results[0].data)

    //console.log(prismicMenu.results[0].data.body);
    //console.log(prismicSettings.results[0].data);

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
