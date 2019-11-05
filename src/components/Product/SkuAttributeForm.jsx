import React, { Component } from "react";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";

import "react-image-gallery/styles/css/image-gallery.css";

import Paper from "@material-ui/core/Paper";

import Fade from "@material-ui/core/Fade";

import CircularProgress from "@material-ui/core/CircularProgress";

// import ContentNotFound from "../../utils/ContentNotFound";
import { isValid } from "ipaddr.js";

import TextField from "@material-ui/core/TextField";

import AsyncSelect from "react-select/async";

import "./ProductForm.css";

import Chip from "@material-ui/core/Chip";

const styles = theme => ({
  container: {
    backgroundColor: theme.palette.primary.footerDark,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginLeft: 240
  },
  footerText: {
    color: "white",
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  linkContainer: {
    textAlign: "center",
    display: "inline-flex",
    color: "white",
    width: "100%"
  },
  linkItem: {
    marginRight: theme.spacing.unit * 2,
    transition: "all 0.15s",
    color: "white",
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.primary.main,
      transition: "all 0.15s",
      textDecoration: "underline"
    }
  },
  textField: {
    width: "100%"
  },
  skuContainer: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2
  }
});

class SkuAttributeForm extends Component {
  constructor() {
    super();
    this.state = {
      categoryOptions: [],
      value: ""
    };
  }

  componentDidMount() {
    const { skuAttribute } = this.props;

    console.log(skuAttribute);
    this.setState({
      value: skuAttribute.value,
      categoryOptions: [
        {
          value: skuAttribute.skuAttributeCategory.id,
          label: skuAttribute.skuAttributeCategory.name
        }
      ]
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { classes, skuAttribute } = this.props;

    const loadOptions = async (inputValue, callback) => {
      const url = `/api/skus/attributes/categories${"?keyword=" + inputValue}`;
      let token = sessionStorage.getItem("token");
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      });

      const json = await response.json();
      return json._embedded.skuAttributeCategoryList.map(item => {
        return {
          value: item.id,
          label: item.name
        };
      });
    };

    const handleInputChange = newValue => {
      // const inputValue = newValue.replace(/\W/g, "");
      this.setState({
        categoryOptions: newValue
      });
      // console.log(newValue);
      // return inputValue;
    };

    return (
      <Paper className={classes.skuContainer}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="outlined-number"
            label="Attribute Id"
            type="text"
            disabled
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            multiline
            margin="normal"
            variant="outlined"
            value={skuAttribute.id}
            // onChange={this.handleChange.bind(this)}
          />
        </Grid>

        {/* <Grid item xs={12} sm={12}>
          <TextField
            disabled
            id="outlined-number"
            label="Category"
            name="category"
            type="text"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            multiline
            margin="normal"
            variant="outlined"
            value={
              this.state.skus[index].skuAttributes[index2].skuAttributeCategory
                .name
            }
            onChange={this.handleChange.bind(this)}
          />
        </Grid> */}

        <Grid item xs={12} sm={12}>
          <AsyncSelect
            className={classes.categorySelect}
            cacheOptions
            loadOptions={loadOptions}
            defaultOptions
            classNamePrefix="react-select"
            value={this.state.categoryOptions}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            id="outlined-number"
            label="Value"
            name="value"
            type="text"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            multiline
            margin="normal"
            variant="outlined"
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
          />
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(SkuAttributeForm);
