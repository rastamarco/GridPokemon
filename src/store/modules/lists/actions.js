export default {
  setListPokemons(context, pokemon) {
    context.commit('SET_LIST_POKEMONS', pokemon)
  },

  setFavoritePokemons(context, pokemon) {
    context.commit('SET_FAVORITE_POKEMONS', pokemon)
    localStorage.setItem('favorites', JSON.stringify(pokemon))
  }
}