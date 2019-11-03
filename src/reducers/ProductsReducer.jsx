import ActionType from '../actions/ActionType';

let initState = {
  isFetchingProducts: false,
  isFetchedProducts: false,
  totalPages: 1,
  info: 'null',
  error: null
}
const productsReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.FETCHING_PRODUCTS_REJECTED:
      return Object.assign({}, state, {
        isFetchedProducts: action.isFetchedProducts,
        isFetchingProducts: action.isFetchingProducts,
        error: action.error
      })
    case ActionType.FETCHING_PRODUCTS_PENDING:
      return Object.assign({}, state, {
        isFetchedProducts: action.isFetchedProducts,
        isFetchingProducts: action.isFetchingProducts
      })
    case ActionType.RECEIVE_PRODUCTS:
      return Object.assign({}, state, {
        isFetchedProducts: action.isFetchedProducts,
        isFetchingProducts: action.isFetchingProducts,
        info: action.info,
        totalPages: action.totalPages
      })
    default:
      return state
  }
}

export default productsReducer;