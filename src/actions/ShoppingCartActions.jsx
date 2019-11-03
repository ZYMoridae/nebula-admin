import Zjax from '../utils/zjax';
import Utils from '../utils/Utils';
import ActionType from './ActionType';

// -------- Shopping cart actions ----------
export const receieveShoppingCart = (results) => {
  return {
    type: ActionType.RECEIVE_SHOPPINGCART,
    isFetchingShoppingCart: false,
    isFetchedShoppingCart: true,
    info: results
  }
}

export const fetchingShoppingCart = (option, json) => {
  return {
    type: ActionType.FETCHING_SHOPPINGCART_PENDING,
    option: option,
    isFetchingShoppingCart: true,
    isFetchedShoppingCart: false
  }
}

export const fetchingShoppingCartError = (err) => {
  return {
    type: ActionType.FETCHING_SHOPPINGCART_REJECTED,
    isFetchingShoppingCart: false,
    isFetchedShoppingCart: true
  }
}

export const fetchShoppingCartInfo = () => {
  return function (dispatch) {
    dispatch(fetchingShoppingCart());

    let options = {
      method: 'get'
    };

    Zjax.request({
      url: `/api/carts/my`,
      option: Utils.addToken(options),
      successCallback: (response) => {
        let orderedCartItems = _.orderBy(response.data.cartItems, ['id'], ['asc']);
        dispatch(receieveShoppingCart(orderedCartItems));
      },
      failureCallback: (error) => {
        dispatch(fetchingShoppingCartError(error));
      }
    });
  }
}

// ------ Processing shopping cart ------

export const proceedShoppingCart = (cartItems) => {
  return {
    type: ActionType.PROCEEED_SHOPPING_CART,
    cartItems: cartItems
  }
}
