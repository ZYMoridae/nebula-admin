import ActionType from '../actions/ActionType';

let initState = {
  isPaymentProcessing: false,
  isPaid: false,
  info: null,
  isFetchingActivateOrder: false,
  isFetchedActivateOrder: false,
  activateOrder: null,
  fetchingActivateOrderError: null,
  shippingInfo: null,
  isCreatingShippingInfo: false,
  isCreatedShippingInfo: false,
  shippingInfoFormData: {},
  creditCardInfo: {}
}
const paymentReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.PAYMENT_REJECTED:
      return Object.assign({}, state, {
        isPaid: action.isPaid,
        isPaymentProcessing: action.isPaymentProcessing
      })
    case ActionType.PAYMENT_PENDING:
      return Object.assign({}, state, {
        isPaid: action.isPaid,
        isPaymentProcessing: action.isPaymentProcessing
      })
    case ActionType.PAYMENT_SUCESS:
      return Object.assign({}, state, {
        isPaid: action.isPaid,
        isPaymentProcessing: action.isPaymentProcessing,
        info: action.info,
      })
    // case ActionType.FETCHING_PRODUCTS_BY_IDS_PENDING:
    //   return Object.assign({}, state, {
    //     isFetchingProductsByIds: action.isFetchingProductsByIds,
    //     isFetchedProductsByIds: action.isFetchedProductsByIds
    //   })
    // case ActionType.FETCHING_PRODUCTS_BY_IDS_REJECTED:
    //   return Object.assign({}, state, {
    //     isFetchingProductsByIds: action.isFetchingProductsByIds,
    //     isFetchedProductsByIds: action.isFetchedProductsByIds,
    //     productsInfoFetchingError: action.error
    //   })
    // case ActionType.RECEIEVE_PRODUCTS_BY_IDS:
    //   return Object.assign({}, state, {
    //     isFetchingProductsByIds: action.isFetchingProductsByIds,
    //     isFetchedProductsByIds: action.isFetchedProductsByIds,
    //     productsInfo: action.info
    //   })
    case ActionType.FETCHING_ACTIVATE_ORDER_PENDING:
      return Object.assign({}, state, {
        isFetchingActivateOrder: action.isFetchingActivateOrder,
        isFetchedProductsByIds: action.isFetchedProductsByIds
      })
    case ActionType.FETCHING_ACTIVATE_ORDER_REJECTED:
      return Object.assign({}, state, {
        isFetchingActivateOrder: action.isFetchingActivateOrder,
        isFetchedProductsByIds: action.isFetchedProductsByIds,
        fetchingActivateOrderError: action.error
      })
    case ActionType.RECEIEVE_ACTIVATE_ORDER:
      return Object.assign({}, state, {
        isFetchingActivateOrder: action.isFetchingActivateOrder,
        isFetchedProductsByIds: action.isFetchedProductsByIds,
        activateOrder: action.info
      })
    case ActionType.RECEIVE_SHIPPINGINFO:
      return Object.assign({}, state, {
        isCreatingShippingInfo: action.isCreatingShippingInfo,
        isCreatedShippingInfo: action.isCreatedShippingInfo,
        shippingInfo: action.info
      })
    case ActionType.CREATING_SHIPPINGINFO_PENDING:
      return Object.assign({}, state, {
        isCreatingShippingInfo: action.isCreatingShippingInfo,
        isCreatedShippingInfo: action.isCreatedShippingInfo
      })
    case ActionType.CREATING_SHIPPINGINFO_REJECTED:
      return Object.assign({}, state, {
        isCreatingShippingInfo: action.isCreatingShippingInfo,
        isCreatedShippingInfo: action.isCreatedShippingInfo
      })
    case ActionType.SHIPPING_INFO_FORM_INPUT_CHANGED:
      return Object.assign({}, state, {
        shippingInfoFormData: action.info
      })
    default:
      return state
  }
}

export default paymentReducer;