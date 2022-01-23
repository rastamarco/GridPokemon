export default {
  setPaginate(context, params) {
    context.commit('SET_PAGINATE', params)
  },
  setTotalRows({ commit }, total) {
    commit('SET_TOTAL_ROWS', total)
  }
}
