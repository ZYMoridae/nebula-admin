import ActionType from '../actions/ActionType';

let initState = {
  isFetchingShoppingCart: false,
  isFetchedShoppingCart: false,
  cartItems: [],
  info: [],
  isCreatingOrder: false,
  isCreatedOrder: false,
  orderCreationError: null,
  orderInfo: null,
  cartItemDeletedInfo: null,
  isDeletingShoppingCartItem: false,
  isDeletedShoppingCartItem: false,
  cartItemDeletingError: null
}
const shoppingCartReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.FETCHING_SHOPPINGCART_REJECTED:
      return Object.assign({}, state, {
        isFetchedShoppingCart: action.isFetchedShoppingCart,
        isFetchingShoppingCart: action.isFetchingShoppingCart
      })
    case ActionType.FETCHING_SHOPPINGCART_PENDING:
      return Object.assign({}, state, {
        isFetchedShoppingCart: action.isFetchedShoppingCart,
        isFetchingShoppingCart: action.isFetchingShoppingCart
      })
    case ActionType.RECEIVE_SHOPPINGCART:
      return Object.assign({}, state, {
        isFetchedShoppingCart: action.isFetchedShoppingCart,
        isFetchingShoppingCart: action.isFetchingShoppingCart,
        info: action.info,
      })
    case ActionType.PROCEEED_SHOPPING_CART:
      return Object.assign({}, state, {
        cartItems: action.cartItems
      })
    case ActionType.CREATING_ORDERS_PENDING:
      return Object.assign({}, state, {
        isCreatingOrder: action.isCreatingOrder,
        isCreatedOrder: action.isCreatedOrder
      })
    case ActionType.CREATING_ORDERS_REJECTED:
      return Object.assign({}, state, {
        isCreatingOrder: action.isCreatingOrder,
        isCreatedOrder: action.isCreatedOrder,
        orderCreationError: action.error
      })
    case ActionType.RECEIVE_ORDER:
      return Object.assign({}, state, {
        isCreatingOrder: action.isCreatingOrder,
        isCreatedOrder: action.isCreatedOrder,
        orderInfo: action.info
      })
    case ActionType.DELETING_SHOPPING_CART_ITEM_PENDING:
      return Object.assign({}, state, {
        isDeletingShoppingCartItem: action.isDeletingShoppingCartItem,
        isDeletedShoppingCartItem: action.isDeletedShoppingCartItem
      })
    case ActionType.DELETING_SHOPPING_CART_ITEM_REJECTED:
      return Object.assign({}, state, {
        isDeletingShoppingCartItem: action.isDeletingShoppingCartItem,
        isDeletedShoppingCartItem: action.isDeletedShoppingCartItem,
        cartItemDeletingError: action.error
      })
    case ActionType.DELETED_SHOPPING_CART_ITEM: {
      let deletedShoppingCartItemId = action.shoppingCartItemId;
      let _cartItems = state.info;

      _cartItems = _cartItems.filter(item => item.id !== deletedShoppingCartItemId);

      return Object.assign({}, state, {
        isDeletingShoppingCartItem: action.isDeletingShoppingCartItem,
        isDeletedShoppingCartItem: action.isDeletedShoppingCartItem,
        info: _cartItems
      })
    }
    default:
      return state
  }
}

export default shoppingCartReducer;