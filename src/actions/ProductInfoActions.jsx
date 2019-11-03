import Zjax from '../utils/zjax';
import Utils from '../utils/Utils';
import ActionType from './ActionType';

// ------ Shopping cart item actions ------
export const addCartItemSuccess = (result) => {
  return {
    type: ActionType.ADD_CART_ITEM_FULLFILLED,
    isAddingCartItem: false,
    isAddedCartItem: true,
    info: result,
    isShowSuccessToast: true
  }
}

export const addingCartItem = () => {
  return {
    type: ActionType.ADD_CART_ITEM_PENDING,
    isAddingCartItem: true,
    isAddedCartItem: false,
    isShowSuccessToast: false
  }
}

export const addingCartItemError = (err) => {
  return {
    type: ActionType.ADD_CART_ITEM_REJECTED,
    isAddingCartItem: false,
    isAddedCartItem: true,
    isShowSuccessToast: false
  }
}

export const addCartItem = (productInfo) => {
  return function (dispatch) {
    dispatch(addingCartItem());

    let options = {
      method: 'post',
      data: productInfo
    };

    Zjax.request({
      url: `/api/cart-items`,
      option: Utils.addToken(options),
      successCallback: (response) => {
        dispatch(addCartItemSuccess(response.data));
      },
      failureCallback: (error) => {
        dispatch(addingCartItemError(error));
      }
    });
  }
}

export const hideSuccessToast = () => {
  return {
    type: ActionType.HIDE_SUCCESS_TOAST,
    isShowSuccessToast: false
  }
}

// ------ ProductInfo Actions ------
export const receieveProductInfo = (result) => {
  return {
    type: ActionType.RECEIVE_PRODUCT_INFO,
    isFetchingProductInfo: false,
    isFetchedProductInfo: true,
    info: result
  }
}

export const fetchingProductInfo = () => {
  return {
    type: ActionType.FETCHING_PRODUCT_INFO_PENDING,
    isFetchingProductInfo: true,
    isFetchedProductInfo: false
  }
}

export const fetchingProductInfoError = (error) => {
  return {
    type: ActionType.FETCHING_PRODUCT_INFO_REJECTED,
    isFetchingProductInfo: false,
    isFetchedProductInfo: true,
    error: error
  }
}


export const fetchProductInfo = (productId) => {
  return function (dispatch) {
    dispatch(fetchingProductInfo());

    let options = {
      method: 'get'
    };

    Zjax.request({
      url: `/api/products/${productId}`,
      option: Utils.addToken(options),
      successCallback: (response) => {
        dispatch(receieveProductInfo(response.data));
      },
      failureCallback: (error) => {
        console.log(error);
        dispatch(fetchingProductInfoError(error));
      }
    });
  }
}

// ------ Product Comments Actions ------
export const receieveProductComments = (result) => {
  return {
    type: ActionType.RECEIVE_PRODUCT_COMMENTS,
    isFetchingProductComments: false,
    isFetchedProductComments: true,
    info: result.content
  }
}

export const fetchingProductComments = () => {
  return {
    type: ActionType.FETCHING_PRODUCT_COMMENTS_PENDING,
    isFetchingProductComments: true,
    isFetchedProductComments: false
  }
}

export const fetchingProductCommentsError = (err) => {
  return {
    type: ActionType.FETCHING_PRODUCT_COMMENTS_REJECTED,
    isFetchingProductComments: false,
    isFetchedProductComments: true
  }
}


export const fetchProductComments = (productId) => {
  return function (dispatch) {
    dispatch(fetchingProductComments());

    let options = {
      method: 'get'
    };

    Zjax.request({
      url: `/api/products/${productId}/comments`,
      option: Utils.addToken(options),
      successCallback: (response) => {
        dispatch(receieveProductComments(response.data));
      },
      failureCallback: (error) => {
        dispatch(fetchingProductCommentsError(error));
      }
    });
  }
}