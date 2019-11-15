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
// import ProductForm from "./ProductForm";

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

class Edit extends Component {
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
    const { fetchEdit, productId } = this.props;
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

    return (
      <div></div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Edit);
