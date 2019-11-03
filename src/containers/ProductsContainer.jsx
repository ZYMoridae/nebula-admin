import { connect } from 'react-redux';
import {
  fetchProductsInfo
} from '../actions';
import Products from '../components/Products';

const mapStateToProps = state => {
  return {
    info: state.ProductsReducer.info,
    isFetchingProducts: state.ProductsReducer.isFetchingProducts,
    isFetchedProducts: state.ProductsReducer.isFetchedProducts,
    totalPages: state.ProductsReducer.totalPages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    fetchProductsInfo: (page, perPage, orderBy) => {
      dispatch(fetchProductsInfo(page, perPage, orderBy));
    }
  }
}

const ProductsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);

export default ProductsContainer;