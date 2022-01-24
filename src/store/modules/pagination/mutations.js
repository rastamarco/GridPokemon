export default {
  SET_PAGINATE(state, param) {
    state.Paginate = param
  },

  SET_TOTAL_ROWS(state, total) {
    state.TotalRows = total
  },

  SET_CURRENTLY_PAGE(state, page) {
    state.CurrentlyPage = page
  },

  SET_NEXT_PAGE(state, page) {
    state.NextPage = page
  },

  SET_PREVIOUS_PAGE(state, page) {
    state.PreviousPage = page
  }
}
