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

import Fade from "@material-ui/core/Fade";

import CircularProgress from "@material-ui/core/CircularProgress";

// import ContentNotFound from "../../utils/ContentNotFound";
import { isValid } from "ipaddr.js";

import TextField from "@material-ui/core/TextField";

import AsyncSelect from "react-select/async";

import "./ProductForm.css";

// import Button from "@material-ui/core/Button";

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
    // backgroundColor: "#00B3A0",
    transition: "all 0.3s",
    marginTop: theme.spacing.unit,
    maringRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 4,
    color: "white",
    "&:hover": {
      // backgroundColor: "#00877C",
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
  textField: {
    width: "100%"
  },
  categorySelect: {
    // width: "100%",
    marginTop: "16px",
    height: "56px"
  }
});

class ProductForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      id: 0,
      categoryoOptions: []
    };
    // this.setState.bind(this);
  }

  componentDidMount() {
    const { product } = this.props;
    console.log(product);
    this.setState({
      name: product.name,
      description: product.description,
      id: product.id,
      categoryoOptions: [
        {
          value: product.productCategory.id,
          label: product.productCategory.name
        }
      ]
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit() {
    console.log({
      ...this.props.product,
      ...this.state
    });
    let _product = {
      ...this.props.product,
      ...this.state
    };

    _product.vendorId = this.props.product.vendor.id;
    _product.categoryId = this.state.categoryoOptions.value;

    delete _product.categoryoOptions;

    this.props.updateProduct(_product);
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
      fetchProductInfoError
    } = this.props;

    console.log(this.props.product);

    const onChangeHandler = event => {};

    const handleInputChange = newValue => {
      // const inputValue = newValue.replace(/\W/g, "");
      this.setState({
        categoryoOptions: newValue
      });
      // console.log(newValue);
      // return inputValue;
    };

    const reformatResponse = response => {
      return response._embedded.productCategoryList.map(item => {
        return {
          value: item.id,
          label: item.name
        };
      });
    };

    const loadOptions = async (inputValue, callback) => {
      const url = `/api/product-categories${"?keyword=" + inputValue}`;
      let token = sessionStorage.getItem("token");
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      });

      const json = await response.json();
      return json._embedded.productCategoryList.map(item => {
        return {
          value: item.id,
          label: item.name
        };
      });
    };

    return (
      <div>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h4" gutterBottom>
              Product
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              disabled
              id="outlined-number"
              label="Id"
              name="id"
              type="text"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              variant="outlined"
              value={this.state.id}
              onChange={this.handleChange.bind(this)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-number"
              label="Name"
              name="name"
              type="text"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              variant="outlined"
              value={this.state.name}
              onChange={this.handleChange.bind(this)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <AsyncSelect
              className={classes.categorySelect}
              cacheOptions
              loadOptions={loadOptions}
              defaultOptions
              classNamePrefix="react-select"
              value={this.state.categoryoOptions}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              id="outlined-number"
              label="Description"
              name="description"
              type="text"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              multiline
              margin="normal"
              variant="outlined"
              value={this.state.description}
              onChange={this.handleChange.bind(this)}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.handleSubmit.bind(this)}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ProductForm);
