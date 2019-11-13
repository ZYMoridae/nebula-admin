import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import _ from "lodash";
import "react-image-gallery/styles/css/image-gallery.css";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContent from "../MySnackbarContent";
import Fade from "@material-ui/core/Fade";
import Constants from "../../utils/Contants";
import ProductForm from "./ProductForm";

const styles = theme => ({
  container: {
    paddingTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 2
  },
  main: {
    marginLeft: `${Constants.styles.sidebar.width}px`
  }
});

class New extends Component {
  constructor() {
    super();
    this.state = {
      age: "",
      name: "hai",
      labelWidth: 0,
      quantity: 1
    };
  }

  render() {
    const {
      classes,
      info,
      isShowSuccessToast,
      hideSuccessToast,
      updateProduct,
      createProduct
    } = this.props;

    let productInfoBlock = "";

    productInfoBlock = (
      <div>
        <ProductForm
          product={info}
          updateProduct={updateProduct}
          createProduct={createProduct}
          mode="new"
        ></ProductForm>
      </div>
    );

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

        <Fade in={true} timeout={1000}>
          <Grid container className={classes.main}>
            <Grid item xs={1} sm={1}>
              {/* <ProductCategorySideBarContainer></ProductCategorySideBarContainer> */}
            </Grid>

            <Grid item xs={10} sm={8} className={classes.container}>
              {productInfoBlock}
            </Grid>
            <Grid item xs={1} sm={1}></Grid>
          </Grid>
        </Fade>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(New);
