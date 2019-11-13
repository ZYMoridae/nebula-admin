import { connect } from "react-redux";
import Index from "../../../components/product/product-category/Index";
import { fetchAllProductCategory } from "../../../actions";

const mapStateToProps = state => {
  return {
    productCategories: state.ProductCategoryReducer.productCategories,
    fetchAllProductCategoryPending:
      state.ProductCategoryReducer.fetchAllProductCategoryPending,
    fetchAllProductCategoryFulfilled:
      state.ProductCategoryReducer.fetchAllProductCategoryFulfilled,
    totalPages: state.ProductCategoryReducer.totalPages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    fetchAllProductCategory: (page, perPage, orderBy) => {
      dispatch(fetchAllProductCategory(page, perPage, orderBy));
    }
  };
};

const ProductCategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);

export default ProductCategoryContainer;
