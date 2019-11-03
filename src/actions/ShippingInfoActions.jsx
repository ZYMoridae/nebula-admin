import Zjax from '../utils/zjax';
import Utils from '../utils/Utils';
import ActionType from './ActionType';
import { doPayment } from './PaymentActions';

// -------- Shipping Info Actions ----------
export const receieveShippingInfo = (results) => {
  return {
    type: ActionType.RECEIVE_SHIPPINGINFO,
    isCreatingShippingInfo: false,
    isCreatedShippingInfo: true,
    info: results
  }
}

export const creatingShippingInfo = (option, json) => {
  return {
    type: ActionType.CREATING_SHIPPINGINFO_PENDING,
    option: option,
    isCreatingShippingInfo: true,
    isCreatedShippingInfo: false
  }
}

export const creatingShippingInfoError = (err) => {
  return {
    type: ActionType.CREATING_SHIPPINGINFO_REJECTED,
    isCreatingShippingInfo: false,
    isCreatedShippingInfo: true
  }
}

export const createShippingInfo = (orderId, data, creditCardInfo) => {
  
  return function (dispatch) {
    dispatch(creatingShippingInfo());

    let options = {
      method: 'post',
      data: data
    };

    console.log(options);

    Zjax.request({
      url: `/api/orders/${orderId}/shipping-info`,
      option: Utils.addToken(options),
      successCallback: (response) => {
        dispatch(receieveShippingInfo(response.data));
        dispatch(doPayment(creditCardInfo));
        // dispatch(redirectToPaymentPage(response.data.id));
      },
      failureCallback: (error) => {
        dispatch(creatingShippingInfoError(error));
      }
    });
  }
}

export const shippingInfoFormInputChanged = (shippingInfoFormData) => {
  return {
    type: ActionType.SHIPPING_INFO_FORM_INPUT_CHANGED,
    info: shippingInfoFormData
  }
}