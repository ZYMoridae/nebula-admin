import React, { Component } from "react";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";

import "react-image-gallery/styles/css/image-gallery.css";
import Paper from "@material-ui/core/Paper";

import Fade from "@material-ui/core/Fade";

import CircularProgress from "@material-ui/core/CircularProgress";

import TextField from "@material-ui/core/TextField";

import AsyncSelect from "react-select/async";

import "./ProductForm.css";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import AddRoundedIcon from "@material-ui/icons/AddRounded";

import SkuForm from "./SkuForm";
import Routes from "../../utils/Routes";
import Utils from "../../utils/Utils";

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
  },
  skuContainer: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2
  },
  skuAttributePanelDetails: {
    display: "block"
  },
  newButton: {
    width: "100%",
    height: 54,
    marginTop: theme.spacing.unit
  },
  indicator: {
    backgroundColor: "#2b8eff",
    color: "white",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "500",
    height: theme.spacing.unit * 3,
    width: theme.spacing.unit * 3,
    textAlign: "center",
    borderRadius: "50%",
    lineHeight: `${theme.spacing.unit * 3}px`,
    marginTop: theme.spacing.unit * 2
  },
  deleteBtnIcon: {
    marginRight: theme.spacing.unit
  }
});

class ProductForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      id: 0,
      categoryOptions: [],
      skus: [],
      skuExpanded: false
    };
    // this.setState.bind(this);
  }

  componentDidMount() {
    const { product, mode } = this.props;
    // console.log(product);
    if (mode != "new") {
      this.setState({
        name: product.name,
        description: product.description,
        id: product.id,
        categoryOptions: [
          {
            value: product.productCategory.id,
            label: product.productCategory.name
          }
        ],
        skus: product.skus
      });
    }
  }

  /**
   * Handler for field change
   *
   * @param {*} event
   */
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSkusChange(event) {
    let nameSplit = event.target.name.split("_");

    let nextSkus = this.state.skus;

    nextSkus[nameSplit[0]][nameSplit[1]] = event.target.value;
    this.setState({
      skus: nextSkus
    });
  }

  /**
   * Update product AJAX call
   */
  handleSubmit() {
    let _product = {
      ...this.props.product,
      ...this.state
    };

    _product.vendorId = this.props.product.vendor.id;
    _product.categoryId = this.state.categoryOptions.value;

    delete _product.categoryOptions;

    this.props.updateProduct(_product);
  }

  /**
   * Triggered when delete button clicked
   *
   * @param {*} index
   * @param {*} event
   */
  onSkuDeleteClick(index, event) {
    this.setState({
      skus: this.state.skus.filter((item, _index) => {
        return _index != index;
      })
    });
  }

  addSkuOnClickHandler() {
    if (this.state.skus.length == 0) {
      this.setState({
        skuExpanded: true
      });
    }

    this.setState({
      skus: [
        ...this.state.skus,
        {
          price: "",
          stock: "",
          skuAttributes: []
        }
      ]
    });
  }

  addSkuAttributeOnClickHandler(skuIndex) {
    let nextSkus = this.state.skus;

    nextSkus[skuIndex].skuAttributes = [
      ...nextSkus[skuIndex].skuAttributes,
      {
        categoryOptions: [],
        value: "",
        skuAttributeCategory: {
          id: "",
          name: ""
        }
      }
    ];

    this.setState({
      skus: nextSkus
    });
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
      mode
    } = this.props;

    const onChangeHandler = event => {};

    const handleInputChange = newValue => {
      this.setState({
        categoryOptions: newValue
      });
    };

    const loadOptions = async (inputValue, callback) => {
      const url = `/api/product-categories${"?keyword=" + inputValue}`;
      let token = sessionStorage.getItem("token");

      let json = [];

      try {
        let response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          }
        });

        let json = await response.json();

        if (json.status == 403) {
          Utils.logout();
          location.href = Routes.USER.LOGIN;
          return json;
        }

        json = json._embedded.productCategoryList.map(item => {
          return {
            value: item.id,
            label: item.name
          };
        });
      } catch (error) {
        console.log(error);
      }

      return json;
    };

    const handlePanelChange = name => {
      let expandFieldName = name + "Expanded";
      console.log(expandFieldName, this.state);
      this.setState({
        [expandFieldName]: !this.state[expandFieldName]
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

          {mode != "new" && (
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
          )}

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
              value={this.state.categoryOptions}
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

          {/* SKU Block*/}

          <Grid item xs={12} sm={12}>
            {this.state.skus.length > 0 ? (
              <Fade in={true} timeout={1000}>
                <ExpansionPanel
                  expanded={this.state.skuExpanded}
                  onChange={() => {
                    handlePanelChange("sku");
                  }}
                >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography variant="subtitle2">Sku</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails
                    className={classes.skuAttributePanelDetails}
                  >
                    {
                      <SkuForm
                        skus={this.state.skus}
                        parentClasses={classes}
                        // skuAttributeExpanded={this.state.skuAttributeExpanded}
                        handleChange={this.handleSkusChange.bind(this)}
                        // handlePanelChange={handlePanelChange}
                        mode={mode}
                        onSkuDeleteClick={this.onSkuDeleteClick.bind(this)}
                        addSkuAttributeOnClickHandler={this.addSkuAttributeOnClickHandler.bind(
                          this
                        )}
                      />
                    }
                    <Grid item xs={12} md={12}>
                      <Button
                        size="small"
                        variant="outlined"
                        className={classes.newButton}
                        color="primary"
                        onClick={this.addSkuOnClickHandler.bind(this)}
                      >
                        <AddRoundedIcon />
                        Add Sku
                      </Button>
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Fade>
            ) : (
              <Button
                size="small"
                variant="outlined"
                className={classes.newButton}
                color="primary"
                onClick={this.addSkuOnClickHandler.bind(this)}
              >
                <AddRoundedIcon />
                Add Sku
              </Button>
            )}
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
