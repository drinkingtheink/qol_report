import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/* eslint no-console: 0, no-mixed-spaces-and-tabs: 0 */

export default new Vuex.Store({
  state: {
  	currentLocale: null,
    localeBasicInfo: null,
    localeQOLData: null
  },
  actions: {
    updateCurrentLocale ({commit}, locale) {
      commit('updateCurrentLocale', locale)
    },
    updateBasicInfo ({commit}, info) {
      commit('updateBasicInfo', info)
    }
  },
  mutations: {
  	updateCurrentLocale (state, location) {
  		state.currentLocale = location
  	},
    updateBasicInfo (state, info) {
      state.localeBasicInfo = info
    }
  }
})
