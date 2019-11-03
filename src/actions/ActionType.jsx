// ActionType.js

const ActionType = {
  RECEIVE_NOTE: 'RECEIVE_NOTE',
  FETCHING_NOTE_PENDING: 'FETCHING_NOTE_PENDING',
  FETCHING_NOTE_REJECTED: 'FETCHING_NOTE_REJECTED',

  // Authentication
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_PENDING: 'AUTH_PENDING',
  AUTH_FAIL: 'AUTH_FAIL',
  HIDE_ERROR: 'HIDE_ERROR',

  // Products action
  RECEIVE_PRODUCTS: 'RECEIVE_PRODUCTS',
  FETCHING_PRODUCTS_PENDING: 'FETCHING_PRODUCTS_PENDING',
  FETCHING_PRODUCTS_REJECTED: 'FETCHING_PRODUCTS_REJECTED',

  // Product info action
  RECEIVE_PRODUCT_INFO: 'RECEIVE_PRODUCT_INFO',
  FETCHING_PRODUCT_INFO_PENDING: 'FETCHING_PRODUCT_INFO_PENDING',
  FETCHING_PRODUCT_INFO_REJECTED: 'FETCHING_PRODUCT_INFO_REJECTED',

  RECEIEVE_PRODUCTS_BY_IDS: 'RECEIEVE_PRODUCTS_BY_IDS',
  FETCHING_PRODUCTS_BY_IDS_PENDING: 'FETCHING_PRODUCTS_BY_IDS_PENDING',
  FETCHING_PRODUCTS_BY_IDS_REJECTED: 'FETCHING_PRODUCTS_BY_IDS_REJECTED',

  // Cart item action
  ADD_CART_ITEM_FULLFILLED: 'ADD_CART_ITEM_FULLFILLED',
  ADD_CART_ITEM_PENDING: 'ADD_CART_ITEM_PENDING',
  ADD_CART_ITEM_REJECTED: 'ADD_CART_ITEM_REJECTED',

  HIDE_SUCCESS_TOAST: 'HIDE_SUCCESS_TOAST',

  // Product category action
  RECEIVE_PRODUCTCATEGORY: 'RECEIVE_PRODUCTCATEGORY',
  FETCHING_PRODUCTCATEGORY_PENDING: 'FETCHING_PRODUCTCATEGORY_PENDING',
  FETCHING_PRODUCTCATEGORY_REJECTED: 'FETCHING_PRODUCTCATEGORY_REJECTED',

  // Shopping cart action
  RECEIVE_SHOPPINGCART: 'RECEIVE_SHOPPINGCART',
  FETCHING_SHOPPINGCART_PENDING: 'FETCHING_SHOPPINGCART_PENDING',
  FETCHING_SHOPPINGCART_REJECTED: 'FETCHING_SHOPPINGCART_REJECTED',
  PROCEEED_SHOPPING_CART: 'PROCEEED_SHOPPING_CART',

  // Product comments action
  RECEIVE_PRODUCT_COMMENTS: 'RECEIVE_PRODUCT_COMMENTS',
  FETCHING_PRODUCT_COMMENTS_PENDING: 'FETCHING_PRODUCT_COMMENTS_PENDING',
  FETCHING_PRODUCT_COMMENTS_REJECTED: 'FETCHING_PRODUCT_COMMENTS_REJECTED',

  // Payment actions
  PAYMENT_SUCESS: 'PAYMENT_SUCESS',
  PAYMENT_PENDING: 'PAYMENT_PENDING',
  PAYMENT_REJECTED: 'PAYMENT_REJECTED',

  // Order actions
  RECEIVE_ORDER: 'RECEIVE_ORDER',
  CREATING_ORDERS_PENDING: 'CREATING_ORDERS_PENDING',
  CREATING_ORDERS_REJECTED: 'CREATING_ORDERS_REJECTED',

  // Promotion actions
  FETCHING_HOMEBANNER_PENDING: 'FETCHING_HOMEBANNER_PENDING',
  RECEIVE_HOMEBANNER: 'RECEIVE_HOMEBANNER',
  FETCHING_HOMEBANNER_REJECTED: 'FETCHING_HOMEBANNER_REJECTED',

  RECEIEVE_ACTIVATE_ORDER: 'RECEIEVE_ACTIVATE_ORDER',
  FETCHING_ACTIVATE_ORDER_PENDING: 'FETCHING_ACTIVATE_ORDER_PENDING',
  FETCHING_ACTIVATE_ORDER_REJECTED: 'FETCHING_ACTIVATE_ORDER_REJECTED',

  // Shipping info actions
  RECEIVE_SHIPPINGINFO: 'RECEIVE_SHIPPINGINFO',
  CREATING_SHIPPINGINFO_PENDING: 'CREATING_SHIPPINGINFO_PENDING',
  CREATING_SHIPPINGINFO_REJECTED: 'CREATING_SHIPPINGINFO_REJECTED',

  SHIPPING_INFO_FORM_INPUT_CHANGED: 'SHIPPING_INFO_FORM_INPUT_CHANGED',

  // Shopping cart item actions
  DELETED_SHOPPING_CART_ITEM: 'DELETED_SHOPPING_CART_ITEM',
  DELETING_SHOPPING_CART_ITEM_PENDING: 'DELETING_SHOPPING_CART_ITEM_PENDING',
  DELETING_SHOPPING_CART_ITEM_REJECTED: 'DELETING_SHOPPING_CART_ITEM_REJECTED',

  PRODUCT: {
    UPDATE: {
      ERROR: 'PRODUCT_UPDATE_ERROR',
      PENDING: 'PRODUCT_UPDATE_PENDING',
      FULFILLED: 'PRODUCT_UPDATE_FULFILLED'
    }
  }
}

export default ActionType;