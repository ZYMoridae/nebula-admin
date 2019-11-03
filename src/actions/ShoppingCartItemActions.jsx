import Zjax from '../utils/zjax';
import Utils from '../utils/Utils';
import ActionType from './ActionType';
import fetchShoppingCartInfo from './ShoppingCartActions';

// -------- Shopping cart item actions ----------
export const deletedShoppingCartItem = (results, id) => {
  return {
    type: ActionType.DELETED_SHOPPING_CART_ITEM,
    isDeletingShoppingCartItem: false,
    isDeletedShoppingCartItem: true,
    info: results,
    shoppingCartItemId: id
  }
}

export const deletingShoppingCartItem = (option, json) => {
  return {
    type: ActionType.DELETING_SHOPPING_CART_ITEM_PENDING,
    option: option,
    isDeletingShoppingCartItem: true,
    isDeletedShoppingCartItem: false
  }
}

export const deletingShoppingCartItemError = (err) => {
  return {
    type: ActionType.DELETING_SHOPPING_CART_ITEM_REJECTED,
    isDeletingShoppingCartItem: false,
    isDeletedShoppingCartItem: true
  }
}

export const deleteShoppingCartItem = (id) => {
  return function (dispatch) {
    dispatch(deletingShoppingCartItem());

    let options = {
      method: 'delete'
    };

    Zjax.request({
      url: `/api/cart-items/${id}`,
      option: Utils.addToken(options),
      successCallback: (response) => {
        // let orderedCartItems = _.orderBy(response.data.cartItems, ['id'], ['asc']);
        dispatch(deletedShoppingCartItem(response.data, id));
      },
      failureCallback: (error) => {
        dispatch(deletingShoppingCartItemError(error));
      }
    });
  }
}

