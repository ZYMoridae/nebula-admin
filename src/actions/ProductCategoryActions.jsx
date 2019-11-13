import Zjax from "../utils/zjax";
import Utils from "../utils/Utils";
import ActionType from "./ActionType";

// ------ ProductCategory Action ------
export const fetchAllProductCategoryFulfilled = (results, totalPages) => {
  return {
    type: ActionType.PRODUCT.CATEGORY.GET_ALL.FULFILLED,
    fetchAllProductCategoryPending: false,
    fetchAllProductCategoryFulfilled: true,
    productCategories: results,
    totalPages: totalPages,
    receivedAt: Date.now()
  };
};

export const fetchAllProductCategoryPending = (option, json) => {
  return {
    type: ActionType.PRODUCT.CATEGORY.GET_ALL.PENDING,
    option: option,
    fetchAllProductCategoryPending: true,
    fetchAllProductCategoryFulfilled: false
  };
};

export const fetchAllProductCategoryError = err => {
  return {
    type: ActionType.PRODUCT.CATEGORY.GET_ALL.ERROR,
    fetchAllProductCategoryPending: false,
    fetchAllProductCategoryFulfilled: true
  };
};

export const fetchAllProductCategory = (page, perPage, orderBy) => {
  return function(dispatch) {
    dispatch(fetchAllProductCategoryPending());

    let options = {
      method: "get"
    };

    Zjax.request({
      url: `/api/product-categories?page=${page -
        1}&size=${perPage}&sort=${orderBy}&keyword`,
      option: Utils.addToken(options),
      successCallback: response => {
        dispatch(
          fetchAllProductCategoryFulfilled(
            response.data._embedded.productCategoryList,
            response.data.page.totalPages
          )
        );
      },
      failureCallback: error => {
        dispatch(fetchAllProductCategoryError(error));
      }
    });
  };
};
