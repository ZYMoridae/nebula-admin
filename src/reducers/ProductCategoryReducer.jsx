import ActionType from "../actions/ActionType";

let initState = {
  fetchAllProductCategoryPending: false,
  fetchAllProductCategoryFulfilled: false,
  productCategories: [],
  totalPages: 1,
};
const ProductCategoryReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.PRODUCT.CATEGORY.GET_ALL.PENDING:
      return Object.assign({}, state, {
        fetchAllProductCategoryFulfilled:
          action.fetchAllProductCategoryFulfilled,
        fetchAllProductCategoryPending: action.fetchAllProductCategoryPending
      });
    case ActionType.PRODUCT.CATEGORY.GET_ALL.ERROR:
      return Object.assign({}, state, {
        fetchAllProductCategoryFulfilled:
          action.fetchAllProductCategoryFulfilled,
        fetchAllProductCategoryPending: action.fetchAllProductCategoryPending
      });
    case ActionType.PRODUCT.CATEGORY.GET_ALL.FULFILLED:
      return Object.assign({}, state, {
        fetchAllProductCategoryFulfilled:
          action.fetchAllProductCategoryFulfilled,
        fetchAllProductCategoryPending: action.fetchAllProductCategoryPending,
        productCategories: action.productCategories,
        totalPages: action.totalPages
      });
    default:
      return state;
  }
};

export default ProductCategoryReducer;
