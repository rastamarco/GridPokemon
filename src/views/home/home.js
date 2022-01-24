import { mapActions } from 'vuex'
import { ServicePokemon } from '../../service/ServicePokemon'

const service = new ServicePokemon()

export default {
  ...mapActions(['setListPokemons', 'setFavoritePokemons', 'setUser']),
  
  //MÉTODO QUE BUSCA OS POKEMONS DA API
  async getContent() {
    const paginate = this.getPagination
    
    const routeApi  =  `${process.env.API}limit=${paginate.itemsPerPage}&offset=200`
    
    if (paginate.page > this.getCurrentlyPage)
      this.routeChange = this.getNextPage
    else if (paginate.page < this.getCurrentlyPage)
      this.routeChange = this.getPreviousPage
    
    //A PARTIR DO SERVIÇO FAZ-SEA BUSCA PELOS POKEMONS
    service
      .GetListPokemon(this.routeChange.length > 0 ? this.routeChange : routeApi)
      .then(response => {
          //SE SUCESSO INSERE OS POKEMONS
          let pokemons = response.data.results
          // CRIA VARIÁVEIS PARA SEREM MANIPULADAS E MOSTRADAS AO GRID 
          pokemons.forEach(item => {
              item._name = item.name.toUpperCase()
              item.action = "action"
          })
          
          //INSERE GLOBALMENTE NO VUEX O TOTAL DE DADOS
          this.setTotalRows(response.data.count)
          //INSERE NO VUEX A PAGINA ATUAL PARA FAZER A COMPARAÇÃO DE PAGINAÇÃO
          this.setCurrentlyPage(paginate.page)
          //INSERE NO VUEX A PRÓXIMA PÁGINA JÁ DEFINIDA NA API
          this.setNextPage(response.data.next)
          //INSERE NO VUEX A PAGINA ANTERIOR JÁ DEFINIDA NA API
          this.setPreviousPage(response.data.previous)
          //INSERE A LISTA PAGINADA DE POKEMONS NO VUEX
          this.setListPokemons(pokemons)
      })
      .catch(_ => {
        this.showToast('error', 'Aconteceu algum erro ao fazer a busca pelos Pokémons')
      })
  },

  async getItem(item) {
    //BUSCA OS DADOS DO POKEMON
    service
      .GetItemPokemon(item.url)
      .then(response => {
        this.pokemonDetails = response.data
        this.showDetails = true
      })
      .catch(_ => {
        this.showToast('error', 'Aconteceu algum erro ao buscar O Pokémon')
      })
    
  },

  //MÉTODO QUE ADICIONA O POKEMON NOS FAVORITOS
  addToFavorite(pokemon) {
    let pokemons = this.getFavoritePokemons

    const poke = {
      id: pokemon.id,
      name: pokemon.name,
      img: pokemon.sprites.front_default 
    }

    let exist = pokemons.find(p => p.id === pokemon.id)

    if (!exist){
      pokemons.push(poke)
      this.setFavoritePokemons(pokemons)
      this.showToast('success', 'Adicionado nos favoritos')
    }
    else 
      this.showToast('error', 'Esse Pokémon já está nos seus Favoritos')
  },

  //MÉTODO QUE REMOVE UM POKEMON DOS FAVORITOS
  removeFavorite(id) {
    let pokemons = this.getFavoritePokemons.filter(p => p.id !== id)
    
    localStorage.removeItem('favorites')
    this.setFavoritePokemons(pokemons) 
  }
  
}