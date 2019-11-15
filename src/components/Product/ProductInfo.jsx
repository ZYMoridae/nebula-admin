import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import _ from "lodash";

import "react-image-gallery/styles/css/image-gallery.css";

import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContent from "../MySnackbarContent";

import Fade from "@material-ui/core/Fade";

import CircularProgress from "@material-ui/core/CircularProgress";

import ContentNotFound from "../utils/ContentNotFound";

import Constants from "../../utils/Contants";
import ProductForm from "./ProductForm";

const styles = theme => ({
  container: {
    paddingTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 2,
    marginLeft: `${Constants.styles.sidebar.width}px`
  },
  priceCaption: {
    color: "#B12704",
    marginLeft: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  button: {
    backgroundColor: "#00B3A0",
    transition: "all 0.3s",
    marginTop: theme.spacing.unit,
    maringRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    color: "white",
    "&:hover": {
      backgroundColor: "#00877C",
      transition: "all 0.3s"
    }
  },
  metaContainer: {
    paddingLeft: theme.spacing.unit * 2
  },
  formControl: {
    marginTop: theme.spacing.unit,
    maringRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    minWidth: 120
  },
  table: {
    // minWidth: 700
  },
  divider: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit
  },
  main: {
    marginLeft: `${Constants.styles.sidebar.width}px`
  }
});

const renderProductNotFoundBlock = () => {
  return <ContentNotFound />;
};

class ProductInfo extends Component {
  constructor() {
    super();
    this.state = {
      age: "",
      name: "hai",
      labelWidth: 0,
      quantity: 1
    };
  }

  componentDidMount() {
    const { fetchProductInfo, productId } = this.props;
    fetchProductInfo(productId);
  }

  render() {
    const {
      classes,
      info,
      isShowSuccessToast,
      hideSuccessToast,
      fetchProductInfoError,
      isFetchedProductInfo,
      isFetchingProductInfo,
      updateProduct
    } = this.props;

    let productInfoBlock = "";

    if (fetchProductInfoError != undefined) {
      productInfoBlock = renderProductNotFoundBlock();
    } else {
      productInfoBlock = (
        <div>
          <ProductForm
            product={info}
            updateProduct={updateProduct}
            mode="update"
          ></ProductForm>
        </div>
      );
    }

    return (
      <div>
        {/* <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={isShowSuccessToast}
          autoHideDuration={1500}
          onClose={hideSuccessToast}
        >
          <MySnackbarContent
            onClose={hideSuccessToast}
            variant="success"
            message="Item has been added!"
          />
        </Snackbar> */}

        <Fade in={true} timeout={1000}>
          <Grid container>
            <Grid item xs={1} sm={1}>
              {/* <ProductCategorySideBarContainer></ProductCategorySideBarContainer> */}
            </Grid>

            <Grid item xs={10} sm={8} className={classes.container}>
              {isFetchingProductInfo && <CircularProgress />}
              {isFetchedProductInfo && info && productInfoBlock}
            </Grid>
            <Grid item xs={1} sm={1}></Grid>
          </Grid>
        </Fade>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ProductInfo);
