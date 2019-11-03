import { connect } from 'react-redux';
import { 
  fetchProductCategoryInfo
} from '../actions';
import ProductCategorySideBar from '../components/ProductCategorySideBar';

const mapStateToProps = state => {
  return {
    info: state.ProductCategorySideBarReducer.info,
    isFetchingProductCategory: state.ProductCategorySideBarReducer.isFetchingProductCategory,
    isFetchedProductCategory: state.ProductCategorySideBarReducer.isFetchedProductCategory,
    totalPages: state.ProductCategorySideBarReducer.totalPages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    fetchProductCategoryInfo: (page, perPage, orderBy) => {
      dispatch(fetchProductCategoryInfo(page, perPage, orderBy));
    }
  }
}

const ProductCategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCategorySideBar);

export default ProductCategoryContainer;