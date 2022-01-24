export default {
  setPaginate(context, params) {
    context.commit('SET_PAGINATE', params)
  },

  setTotalRows({ commit }, total) {
    commit('SET_TOTAL_ROWS', total)
  },

  setCurrentlyPage({ commit }, page) {
    commit('SET_CURRENTLY_PAGE', page)
  },

  setNextPage({ commit }, page) {
    commit('SET_NEXT_PAGE', page)
  },
  
  setPreviousPage({ commit }, page) {
    commit('SET_PREVIOUS_PAGE', page)
  }

}
