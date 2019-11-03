import { connect } from 'react-redux';
import Home from '../components/Home';
import {
  fetchHomeBannerInfo,
  fetchProductsInfo
} from '../actions';

const mapStateToProps = state => {
  return {
    info: state.HomeReducer.info,
    isFetchingHomeBanner: state.HomeReducer.isFetchingHomeBanner,
    isFetchedHomeBanner: state.HomeReducer.isFetchedHomeBanner,
    featuredProducts: state.HomeReducer.featuredProducts,
    isFetchingProducts: state.HomeReducer.isFetchingProducts,
    isFetchedProducts: state.HomeReducer.isFetchedProducts,
    fetchProductsError: state.HomeReducer.fetchProductsError,
    fetchHomeBannerError: state.HomeReducer.fetchHomeBannerError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    fetchHomeBannerInfo: () => {
      dispatch(fetchHomeBannerInfo());
    },
    fetchFeaturedProducts: (page, perPage) => {
      dispatch(fetchProductsInfo(page, perPage, 'updatedAt'));
    }
  }
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomeContainer;