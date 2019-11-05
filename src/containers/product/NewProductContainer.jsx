import { connect } from "react-redux";
import {
  fetchProductInfo,
  addCartItem,
  hideSuccessToast,
  fetchProductComments
} from "../../actions/ProductInfoActions";

import { updateProduct } from "../../actions/ProductsActions";

import NewProduct from "../../components/Product/New";

const mapStateToProps = state => {
  return {
    info: state.ProductInfoReducer.info,
    isFetchingProductInfo: state.ProductInfoReducer.isFetchingProductInfo,
    isFetchedProductInfo: state.ProductInfoReducer.isFetchedProductInfo,
    fetchProductInfoError: state.ProductInfoReducer.fetchProductInfoError,
    isAddedCartItem: state.ProductInfoReducer.isAddedCartItem,
    isAddingCartItem: state.ProductInfoReducer.isAddingCartItem,
    isShowSuccessToast: state.ProductInfoReducer.isShowSuccessToast,
    isFetchingProductComments:
      state.ProductInfoReducer.isFetchingProductComments,
    isFetchedProductComments: state.ProductInfoReducer.isFetchedProductComments,
    productComments: state.ProductInfoReducer.productComments,

    isUpdatingProduct: state.ProductInfoReducer.isUpdatingProduct,
    isUpdatedProduct: state.ProductInfoReducer.isUpdatedProduct,
    // SKU attribute category
    isFetchingAllSkuAttributeCategory:
      state.ProductInfoReducer.isFetchingAllSkuAttributeCategory,
    isFetchedAllSkuAttributeCategory:
      state.ProductInfoReducer.isFetchedAllSkuAttributeCategory,
    skuAttributeCategory: state.ProductInfoReducer.skuAttributeCategory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    fetchProductInfo: productId => {
      dispatch(fetchProductInfo(productId));
    },
    addCartItem: productInfo => {
      dispatch(addCartItem(productInfo));
    },
    hideSuccessToast: () => {
      dispatch(hideSuccessToast());
    },
    fetchProductComments: productId => {
      dispatch(fetchProductComments(productId));
    },
    updateProduct: product => {
      dispatch(updateProduct(product));
    },
    fetchAllSkuAttributeCategory: keyword => {
      dispatch(fetchAllSkuAttributeCategory(keyword));
    }
  };
};

const NewProductContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProduct);

export default NewProductContainer;
