import axios from 'axios'

export class ServicePokemon {
  
  constructor() { }

  async GetListPokemon(route) {
    return await axios({
        method: 'get',
        url: route
    })
  }

  async GetItemPokemon(route){
    return await axios({
      method: 'get',
      url: route
    })
  }
}
