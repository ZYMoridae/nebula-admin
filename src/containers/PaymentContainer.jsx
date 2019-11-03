import { connect } from 'react-redux';
import {
  doPayment,
  fetchProductsByIds,
  fetchActivateOrder,
  createShippingInfo,
  shippingInfoFormInputChanged
} from '../actions';
import Payment from '../components/Payment';

const mapStateToProps = state => {
  return {
    info: state.PaymentReducer.info,
    isPaymentProcessing: state.PaymentReducer.isPaymentProcessing,
    isPaid: state.PaymentReducer.isPaid,
    cartItems: state.ShoppingCartReducer.cartItems,
    isFetchingActivateOrder: state.PaymentReducer.isFetchingActivateOrder,
    isFetchedActivateOrder: state.PaymentReducer.isFetchedActivateOrder,
    activateOrder: state.PaymentReducer.activateOrder,
    fetchingActivateOrderError: state.PaymentReducer.fetchingActivateOrderError,
    shippingInfo: state.PaymentReducer.shippingInfo,
    isCreatingShippingInfo: state.PaymentReducer.isCreatingShippingInfo,
    isCreatedShippingInfo: state.PaymentReducer.isCreatedShippingInfo,
    shippingInfoFormData: state.PaymentReducer.shippingInfoFormData,
    creditCardInfo: state.PaymentReducer.creditCardInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    doPayment: () => {
      dispatch(doPayment());
    },
    fetchActivateOrder: (orderId) => {
      dispatch(fetchActivateOrder(orderId));
    },
    createShippingInfo: (orderId, shippingInfo, creditCardInfo) => {
      console.log(shippingInfo);
      dispatch(createShippingInfo(orderId, shippingInfo, creditCardInfo));
    },
    shippingInfoFormInputChanged: (shippingInfoFormData) => {
      dispatch(shippingInfoFormInputChanged(shippingInfoFormData));
    }
  }
}

const PaymentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment);

export default PaymentContainer;