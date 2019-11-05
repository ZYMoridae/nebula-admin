import Zjax from "../utils/zjax";
import Utils from "../utils/Utils";
import ActionType from "./ActionType";

export const fetchAllSkuAttributeCategoryFulfill = (results) => {
  return {
    type: ActionType.SKU.ATTRIBUTE.CATEGORY.GET_ALL.FULFILLED,
    isFetchingAllSkuAttributeCategory: false,
    isFetchedAllSkuAttributeCategory: true,
    skuAttributeCategory: results
  };
};


export const fetchAllSkuAttributeCategoryPending = () => {
  return {
    type: ActionType.SKU.ATTRIBUTE.CATEGORY.GET_ALL.PENDING,
    isFetchingAllSkuAttributeCategory: true,
    isFetchedAllSkuAttributeCategory: false
  };
};

export const fetchAllSkuAttributeCategoryError = error => {
  return {
    type: ActionType.SKU.ATTRIBUTE.CATEGORY.GET_ALL.ERROR,
    isFetchingAllSkuAttributeCategory: false,
    isFetchedAllSkuAttributeCategory: true,
    error: error
  };
};

export const fetchAllSkuAttributeCategory = (keyword) => {
  return function(dispatch) {
    dispatch(fetchAllSkuAttributeCategoryPending());

    let options = {
      method: "get"
    };

    Zjax.request({
      url: `/api/skus/attributes/categories?page=0&size=10&sort=name&keyword=${keyword}`,
      option: Utils.addToken(options),
      successCallback: response => {
        dispatch(
          fetchAllSkuAttributeCategoryFulfill(
            response.data._embedded.skuAttributeCategoryList
          )
        );
      },
      failureCallback: error => {
        dispatch(fetchAllSkuAttributeCategoryError(error));
      }
    });
  };
};