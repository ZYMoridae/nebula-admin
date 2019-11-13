import Zjax from "../utils/zjax";
import Utils from "../utils/Utils";
import ActionType from "./ActionType";

export const fetchAllSkuAttributeCategoryFulfilled = (results, totalPages) => {
  return {
    type: ActionType.SKU.ATTRIBUTE.CATEGORY.GET_ALL.FULFILLED,
    isFetchingAllSkuAttributeCategory: false,
    isFetchedAllSkuAttributeCategory: true,
    skuAttributeCategories: results,
    totalPages: totalPages,
    receivedAt: Date.now()
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

export const fetchAllSkuAttributeCategory = (page, perPage, orderBy) => {
  return function(dispatch) {
    dispatch(fetchAllSkuAttributeCategoryPending());

    let options = {
      method: "get"
    };

    Zjax.request({
      url: `/api/skus/attributes/categories?page=${page -
        1}&size=${perPage}&sort=${orderBy}&keyword`,
      option: Utils.addToken(options),
      successCallback: response => {
        dispatch(
          fetchAllSkuAttributeCategoryFulfilled(
            response.data._embedded.skuAttributeCategoryList,
            response.data.page.totalPages
          )
        );
      },
      failureCallback: error => {
        dispatch(fetchAllSkuAttributeCategoryError(error));
      }
    });
  };
};
