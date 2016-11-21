import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  notes: [],
  activeNote: {}
}

// define the possible mutations that can be applied to our state
const mutations = {

}

export default new Vuex.Store({
  state,
  mutations
})