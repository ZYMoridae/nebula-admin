import ActionType from "../actions/ActionType";

let initState = {
  isFetchingProductInfo: false,
  isFetchedProductInfo: false,
  fetchProductInfoError: undefined,
  isAddedCartItem: false,
  isAddingCartItem: false,
  isShowSuccessToast: false,
  isFetchingProductComments: false,
  isFetchedProductComments: false,
  info: "null",
  productComments: [],
  isUpdatingProduct: false,
  isUpdatedProduct: false,
  skuAttributeCategory: []
};

const productInfoReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.FETCHING_PRODUCT_INFO_REJECTED:
      return Object.assign({}, state, {
        isFetchedProductInfo: action.isFetchedProductInfo,
        isFetchingProductInfo: action.isFetchingProductInfo,
        fetchProductInfoError: action.error
      });
    case ActionType.FETCHING_PRODUCT_INFO_PENDING:
      return Object.assign({}, state, {
        isFetchedProductInfo: action.isFetchedProductInfo,
        isFetchingProductInfo: action.isFetchingProductInfo
      });
    case ActionType.RECEIVE_PRODUCT_INFO:
      return Object.assign({}, state, {
        isFetchedProductInfo: action.isFetchedProductInfo,
        isFetchingProductInfo: action.isFetchingProductInfo,
        info: action.info
      });
    case ActionType.ADD_CART_ITEM_REJECTED:
      return Object.assign({}, state, {
        isAddedCartItem: action.isAddedCartItem,
        isAddingCartItem: action.isAddingCartItem
      });
    case ActionType.ADD_CART_ITEM_PENDING:
      return Object.assign({}, state, {
        isAddedCartItem: action.isAddedCartItem,
        isAddingCartItem: action.isAddingCartItem
      });
    case ActionType.ADD_CART_ITEM_FULLFILLED:
      return Object.assign({}, state, {
        isAddedCartItem: action.isAddedCartItem,
        isAddingCartItem: action.isAddingCartItem,
        isShowSuccessToast: action.isShowSuccessToast
      });
    case ActionType.HIDE_SUCCESS_TOAST:
      return Object.assign({}, state, {
        isShowSuccessToast: action.isShowSuccessToast
      });
    case ActionType.FETCHING_PRODUCT_COMMENTS_PENDING:
      return Object.assign({}, state, {
        isFetchingProductComments: action.isFetchingProductComments,
        isFetchedProductComments: action.isFetchedProductComments
      });
    case ActionType.FETCHING_PRODUCT_COMMENTS_REJECTED:
      return Object.assign({}, state, {
        isFetchingProductComments: action.isFetchingProductComments,
        isFetchedProductComments: action.isFetchedProductComments
      });
    case ActionType.RECEIVE_PRODUCT_COMMENTS:
      return Object.assign({}, state, {
        isFetchingProductComments: action.isFetchingProductComments,
        isFetchedProductComments: action.isFetchedProductComments,
        productComments: action.info
      });
    // Update product
    case ActionType.PRODUCT.UPDATE.PENDING:
      return Object.assign({}, state, {
        isUpdatingProduct: action.isUpdatingProduct,
        isUpdatedProduct: action.isUpdatedProduct
      });
    case ActionType.PRODUCT.UPDATE.ERROR:
      return Object.assign({}, state, {
        isUpdatingProduct: action.isUpdatingProduct,
        isUpdatedProduct: action.isUpdatedProduct
      });
    case ActionType.PRODUCT.UPDATE.FULFILLED:
      return Object.assign({}, state, {
        isUpdatingProduct: action.isUpdatingProduct,
        isUpdatedProduct: action.isUpdatedProduct,
        info: action.info
      });

    // Fetch sku attribute category
    case ActionType.SKU.ATTRIBUTE.CATEGORY.GET_ALL.PENDING:
      return Object.assign({}, state, {
        isFetchingAllSkuAttributeCategory:
          action.isFetchingAllSkuAttributeCategory,
        isFetchedAllSkuAttributeCategory:
          action.isFetchedAllSkuAttributeCategory
      });
    case ActionType.SKU.ATTRIBUTE.CATEGORY.GET_ALL.ERROR:
      return Object.assign({}, state, {
        isFetchingAllSkuAttributeCategory:
          action.isFetchingAllSkuAttributeCategory,
        isFetchedAllSkuAttributeCategory:
          action.isFetchedAllSkuAttributeCategory
      });
    case ActionType.SKU.ATTRIBUTE.CATEGORY.GET_ALL.FULFILLED:
      return Object.assign({}, state, {
        isFetchingAllSkuAttributeCategory:
          action.isFetchingAllSkuAttributeCategory,
        isFetchedAllSkuAttributeCategory:
          action.isFetchedAllSkuAttributeCategory,
        skuAttributeCategory: action.skuAttributeCategory
      });

    // Create product
    case ActionType.PRODUCT.CREATE.PENDING:
      return Object.assign({}, state, {
        isCreatingProduct: action.isCreatingProduct,
        isCreatedProdudct: action.isCreatedProdudct
      });
    case ActionType.PRODUCT.CREATE.ERROR:
      return Object.assign({}, state, {
        isCreatingProduct: action.isCreatingProduct,
        isCreatedProdudct: action.isCreatedProdudct
      });
    case ActionType.PRODUCT.CREATE.FULFILLED:
      return Object.assign({}, state, {
        isCreatingProduct: action.isCreatingProduct,
        isCreatedProdudct: action.isCreatedProdudct,
        info: action.info
      });

    default:
      return state;
  }
};

export default productInfoReducer;
