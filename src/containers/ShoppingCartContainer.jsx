import { connect } from 'react-redux';
import {
  fetchShoppingCartInfo,
  proceedShoppingCart,
  createOrder,
  deleteShoppingCartItem
} from '../actions';
import ShoppingCart from '../components/ShoppingCart';

const mapStateToProps = state => {
  return {
    info: state.ShoppingCartReducer.info,
    isFetchingShoppingCart: state.ShoppingCartReducer.isFetchingShoppingCart,
    isFetchedShoppingCart: state.ShoppingCartReducer.isFetchedShoppingCart,
    isCreatingOrder: state.ShoppingCartReducer.isCreatingOrder,
    isCreatedOrder: state.ShoppingCartReducer.isCreatedOrder,
    orderCreationError: state.ShoppingCartReducer.orderCreationError,
    orderInfo: state.ShoppingCartReducer.orderInfo,
    cartItemDeletedInfo: state.ShoppingCartReducer.cartItemDeletedInfo,
    isDeletingShoppingCartItem: state.ShoppingCartReducer.isDeletingShoppingCartItem,
    isDeletedShoppingCartItem: state.ShoppingCartReducer.isDeletedShoppingCartItem,
    cartItemDeletingError: state.ShoppingCartReducer.cartItemDeletingError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    fetchShoppingCartInfo: () => {
      dispatch(fetchShoppingCartInfo());
    },
    proceedShoppingCart: (cartItems) => {
      dispatch(proceedShoppingCart(cartItems));
    },
    createOrder: (data) => {
      dispatch(createOrder(data));
    },
    deleteShoppingCartItem: (id) => {
      dispatch(deleteShoppingCartItem(id));
    }
  }
}

const ShoppingCartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart);

export default ShoppingCartContainer;