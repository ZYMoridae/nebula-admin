import Zjax from '../utils/zjax';
import Utils from '../utils/Utils';
import ActionType from './ActionType';

// ------ ProductCategory Action ------
export const receieveProductCategory = (results, totalPages) => {
  return {
    type: ActionType.RECEIVE_PRODUCTCATEGORY,
    isFetchingProductCategory: false,
    isFetchedProductCategory: true,
    info: results,
    totalPages: totalPages,
    receivedAt: Date.now()
  }
}

export const fetchingProductCategory = (option, json) => {
  return {
    type: ActionType.FETCHING_PRODUCTCATEGORY_PENDING,
    option: option,
    isFetchingProductCategory: true,
    isFetchedProductCategory: false
  }
}

export const fetchingProductCategoryError = (err) => {
  return {
    type: ActionType.FETCHING_PRODUCTCATEGORY_REJECTED,
    isFetchingProductCategory: false,
    isFetchedProductCategory: true
  }
}


export const fetchProductCategoryInfo = (page, perPage, orderBy) => {
  return function (dispatch) {
    dispatch(fetchingProductCategory());

    let options = {
      method: 'get'
    };

    Zjax.request({
      url: `/api/product-categories?page=${page - 1}&size=${perPage}&sort=${orderBy}&keyword`,
      option: Utils.addToken(options),
      successCallback: (response) => {
        dispatch(receieveProductCategory(response.data.content, response.data.page.totalPages));
      },
      failureCallback: (error) => {
        dispatch(fetchingProductCategoryError(error));
      }
    });
  }
}