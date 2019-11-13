import ActionType from "../actions/ActionType";

let initState = {
  fetchAllSkuAttributeCategoryPending: false,
  fetchAllSkuAttributeCategoryFulfilled: false,
  skuAttributeCategories: [],
  totalPages: 1
};
const SkuAttributeCategoryReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.SKU.ATTRIBUTE.CATEGORY.GET_ALL.PENDING:
      return Object.assign({}, state, {
        fetchAllSkuAttributeCategoryFulfilled:
          action.fetchAllSkuAttributeCategoryFulfilled,
        fetchAllSkuAttributeCategoryPending: action.fetchAllSkuAttributeCategoryPending
      });
    case ActionType.SKU.ATTRIBUTE.CATEGORY.GET_ALL.ERROR:
      return Object.assign({}, state, {
        fetchAllSkuAttributeCategoryFulfilled:
          action.fetchAllSkuAttributeCategoryFulfilled,
        fetchAllSkuAttributeCategoryPending: action.fetchAllSkuAttributeCategoryPending
      });
    case ActionType.SKU.ATTRIBUTE.CATEGORY.GET_ALL.FULFILLED:
      return Object.assign({}, state, {
        fetchAllSkuAttributeCategoryFulfilled:
          action.fetchAllSkuAttributeCategoryFulfilled,
        fetchAllSkuAttributeCategoryPending: action.fetchAllSkuAttributeCategoryPending,
        skuAttributeCategories: action.skuAttributeCategories,
        totalPages: action.totalPages
      });
    default:
      return state;
  }
};

export default SkuAttributeCategoryReducer;
