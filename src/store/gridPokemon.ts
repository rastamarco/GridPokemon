import axios from 'axios';

export const gridPokemon = {
  state:{
    allPokemons: null,
    dataAPI: null
  },
  getters:{
    allPokemons(state) {
      return state.allPokemons;
    },
    dataAPI(state) {
      return state.dataAPI;
    },

  },
  mutations:{
    SetAllPokemons(state, value) {
      state.allPokemons = value;
    },
    SetDataAPI(state, value) {
      state.dataAPI = value;
    },


  },
  actions:{
    async GetAllPokemons({ commit }, options){
      const routeAPI = `${process.env.VUE_APP_API_URL}`;
      const response = await axios({
        method: 'get',
        url: routeAPI
      });
      if (response) {
        if (response.status === 200) {
          await commit('SetAllPokemons', response.data.data);
          await commit('SetDataAPI', response.data)
        }
      } 
    }, 

  }
};