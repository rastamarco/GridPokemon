import Vue from 'vue'
import Vuex from 'vuex'
import { gridPokemon }  from './gridPokemon'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    gridPokemon
  }
})
