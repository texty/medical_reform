import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    left: 0,
    width: 0 
  },
  mutations: {
    setValueWidth(state, width) { 
      state.width = width;
     },
     setValueLeft(state, left) { 
      state.left = left;
     }
  },
  actions: {
    setValueWidth({commit}, width) {
      commit('setValueWidth', width)
    },
    setValueLeft({commit}, left) {
      commit('setValueLeft', left)
    }
  }
})
