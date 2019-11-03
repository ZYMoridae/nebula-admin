import Zjax from '../utils/zjax';
import Utils from '../utils/Utils';
import ActionType from './ActionType';

// -------- Shopping Cart Actions ----------
export const receieveOrder = (results) => {
  return {
    type: ActionType.RECEIVE_ORDER,
    isCreatingOrder: false,
    isCreatedOrder: true,
    info: results
  }
}

export const creatingOrder = (option, json) => {
  return {
    type: ActionType.CREATING_ORDERS_PENDING,
    option: option,
    isCreatingOrder: true,
    isCreatedOrder: false
  }
}

export const creatingOrderError = (err) => {
  return {
    type: ActionType.CREATING_ORDERS_REJECTED,
    isCreatingOrder: false,
    isCreatedOrder: true
  }
}

export const createOrder = (data) => {
  return function (dispatch) {
    dispatch(creatingOrder());

    let options = {
      method: 'post',
      data: data
    };

    Zjax.request({
      url: `/api/orders`,
      option: Utils.addToken(options),
      successCallback: (response) => {
        dispatch(receieveOrder(response.data));
        dispatch(redirectToPaymentPage(response.data.id));
      },
      failureCallback: (error) => {
        dispatch(creatingOrderError(error));
      }
    });
  }
}

// Get activate order

// ------ Fetch product by ids ------

export const receieveActivateOrder = (results) => {
  return {
    type: ActionType.RECEIEVE_ACTIVATE_ORDER,
    isFetchingActivateOrder: false,
    isFetchedActivateOrder: true,
    info: results
  }
}

export const fetchingActivateOrder = () => {
  return {
    type: ActionType.FETCHING_ACTIVATE_ORDER_PENDING,
    isFetchingActivateOrder: true,
    isFetchedActivateOrder: false
  }
}

export const fetchingActivateOrderError = (error) => {
  return {
    type: ActionType.FETCHING_ACTIVATE_ORDER_REJECTED,
    isFetchingActivateOrder: false,
    isFetchedActivateOrder: true,
    error: error
  }
}

export const fetchActivateOrder = (orderId) => {
  return function (dispatch) {
    dispatch(fetchingActivateOrder());

    let options = {
      method: 'get'
    };

    Zjax.request({
      url: `/api/orders/${orderId}`,
      option: Utils.addToken(options),
      successCallback: (response) => {
        dispatch(receieveActivateOrder(response.data));
      },
      failureCallback: (error) => {
        dispatch(fetchingActivateOrderError(error));
      }
    });
  }
}

export const redirectToPaymentPage = (orderId) => {
  location.href = `/payment/${orderId}`;
}

