
import Prismic from "prismic-javascript"
import PrismicConfig from "~/prismic.config.js"

export const state = () => ({
  menu: false,
  orientation: false,
  menuNavigate: false,
  pageData: null,
  api: null,
  searchIndex: false
})

export const mutations = {
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
