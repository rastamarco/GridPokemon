import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import Login from './modules/login/main'
import Paginate from './modules/pagination/main'
import Pokemons from './modules/lists/main'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
      Login,
      Paginate,
      Pokemons
    }
})