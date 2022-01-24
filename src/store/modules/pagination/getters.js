export default {
  getPagination: state => state.Paginate,
  getTotalRows: state => state.TotalRows,
  getCurrentlyPage: state => state.CurrentlyPage,
  getNextPage: state => state.NextPage,
  getPreviousPage: state => state.PreviousPage,
}
