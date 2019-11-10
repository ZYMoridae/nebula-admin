import Zjax from "../utils/zjax";
import Utils from "../utils/Utils";
import ActionType from "./ActionType";

import _ from "lodash";
// ------ Product Actions ------
export const createProductFulfilled = result => {
  return {
    type: ActionType.PRODUCT.CREATE.FULFILLED,
    isCreatingProduct: false,
    isCreatedProdudct: true,
    info: result
  };
};

export const createProductPending = () => {
  return {
    type: ActionType.PRODUCT.CREATE.PENDING,
    isCreatingProduct: true,
    isCreatedProdudct: false
  };
};

export const createProductError = error => {
  return {
    type: ActionType.PRODUCT.CREATE.ERROR,
    isCreatingProduct: false,
    isCreatedProdudct: true,
    error: error
  };
};

export const createProduct = product => {
  return function(dispatch) {
    dispatch(createProductPending());

    let options = {
      method: "post",
      data: product
    };

    Zjax.request({
      url: '/api/products',
      option: Utils.addToken(options),
      successCallback: response => {
        if (!_.isNil(response.data.id)) {
          window.location.href = `/products/${response.data.id}`;
        }
        dispatch(createProductFulfilled(response.data));
      },
      failureCallback: error => {
        console.log(error);
        dispatch(createProductError(error));
      }
    });
  };
};
