import React, { Component } from "react";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";

import ShoppingCart from "@material-ui/icons/ShoppingCart";
import PlayCircleOutline from "@material-ui/icons/PlayCircleOutline";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Divider from "@material-ui/core/Divider";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContent from "./MySnackbarContent";

import Fade from "@material-ui/core/Fade";

import CircularProgress from "@material-ui/core/CircularProgress";

import ProductCategorySideBarContainer from "../containers/ProductCategorySideBarContainer";

import ProductComments from "./ProductComments";

import ContentNotFound from "./utils/ContentNotFound";
import { isValid } from "ipaddr.js";

import TextField from "@material-ui/core/TextField";

import Constants from "../utils/Contants";
import ProductForm from "./Product/ProductForm";

const styles = theme => ({
  container: {
    paddingTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 2
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
    const { fetchProductInfo, productId, fetchProductComments, isFetchedProductInfo } = this.props;
    // this.setState({
    //   labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    // });
    fetchProductInfo(productId);
    fetchProductComments(productId);
  }

  render() {
    const {
      theme,
      classes,
      info,
      addCartItem,
      isShowSuccessToast,
      hideSuccessToast,
      productComments,
      isAddingCartItem,
      fetchProductInfoError,
      isFetchedProductInfo,
      updateProduct
    } = this.props;

    let productInfoBlock = "";

    if (fetchProductInfoError != undefined) {
      productInfoBlock = renderProductNotFoundBlock();
    } else {
      productInfoBlock = (
        <div>
          <ProductForm product={info} updateProduct={updateProduct}></ProductForm>
        </div>
      );
    }

    return (
      <div>
        <Snackbar
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
        </Snackbar>

        {!info && <CircularProgress />}

        <Fade in={true} timeout={1000}>
          <Grid container className={classes.main}>
            <Grid item xs={1} sm={1}>
              {/* <ProductCategorySideBarContainer></ProductCategorySideBarContainer> */}
            </Grid>

            <Grid item xs={10} sm={8} className={classes.container}>
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
