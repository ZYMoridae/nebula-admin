import ActionType from '../actions/ActionType';

let initState = {
  isFetchingProductCategory: false,
  isFetchedProductCategory: false,
  totalPages: 1,
  info: []
}
const productCategorySideBarReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.FETCHING_PRODUCTCATEGORY_REJECTED:
      return Object.assign({}, state, {
        isFetchedProductCategory: action.isFetchedProductCategory,
        isFetchingProductCategory: action.isFetchingProductCategory
      })
    case ActionType.FETCHING_PRODUCTCATEGORY_PENDING:
      return Object.assign({}, state, {
        isFetchedProductCategory: action.isFetchedProductCategory,
        isFetchingProductCategory: action.isFetchingProductCategory
      })
    case ActionType.RECEIVE_PRODUCTCATEGORY:
      return Object.assign({}, state, {
        isFetchedProductCategory: action.isFetchedProductCategory,
        isFetchingProductCategory: action.isFetchingProductCategory,
        info: action.info,
        totalPages: action.totalPages
      })
    default:
      return state
  }
}

export default productCategorySideBarReducer;