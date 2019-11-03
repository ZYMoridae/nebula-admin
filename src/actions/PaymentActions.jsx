import Zjax from '../utils/zjax';
import Utils from '../utils/Utils';
import ActionType from './ActionType';

// ------ Payment Actions ------
export const paymentSucess = (results) => {
  return {
    type: ActionType.PAYMENT_SUCESS,
    isPaymentProcessing: false,
    isPaid: true,
    info: results
  }
}

export const paymentPending = (option, json) => {
  return {
    type: ActionType.PAYMENT_PENDING,
    option: option,
    isPaymentProcessing: true,
    isPaid: false
  }
}

export const paymentError = (err) => {
  return {
    type: ActionType.PAYMENT_REJECTED,
    isPaymentProcessing: false,
    isPaid: true
  }
}


export const doPayment = (creditCardInfo) => {
  return function (dispatch) {
    dispatch(paymentPending());

    let options = {
      method: 'post',
      data: creditCardInfo
    };

    Zjax.request({
      url: `/api/payments/finalise`,
      option: Utils.addToken(options),
      successCallback: (response) => {
        dispatch(paymentSucess(response.data));
      },
      failureCallback: (error) => {
        dispatch(paymentError(error));
      }
    });
  }
}