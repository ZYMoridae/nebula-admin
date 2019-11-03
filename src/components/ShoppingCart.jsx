import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';

import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';

import ContentLoader from "react-content-loader";
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import CheckCircle from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/WarningRounded';

import ContentNotFound from './utils/ContentNotFound';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2
  },
  table: {
    minWidth: '100%',
  },
  shoppingItemName: {
    color: '#0066c0',
    transition: 'all 0.15s',
    '&:hover': {
      color: '#ff5000',
      textDecoration: 'underline',
      transition: 'all 0.15s'
    }
  },
  itemAction: {
    marginRight: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    borderRight: 'solid 1px',
    borderColor: 'lightgrey'
  },
  itemActionLink: {
    color: '#0066c0',
    transition: 'all 0.15s',
    '&:hover': {
      color: '#ff5000',
      textDecoration: 'underline',
      transition: 'all 0.15s'
    }
  },
  checkoutBlock: {
    marginTop: theme.spacing.unit
  },
  checkoutTotalPrice: {
    color: '#B12704',
    marginLeft: theme.spacing.unit
  },
  itemPrice: {
    color: '#B12704'
  },
  formControl: {
    marginTop: theme.spacing.unit,
    maringRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    minWidth: 120,
  },
  cbox: {
    // color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
  emptyCartCaptionContainer: {
    paddingLeft: theme.spacing.unit * 5,
    paddingRight: theme.spacing.unit * 5,
    paddingTop: theme.spacing.unit * 10,
    paddingBottom: theme.spacing.unit * 10,
    marginBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    textAlign: 'center'
  }
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

/**
 * Get stock text
 * 
 * @param {*} quantity 
 * @param {*} unitsInStock 
 */
const stockText = (quantity, unitsInStock) => {
  return (
    unitsInStock > 0 ? <a style={{ color: 'green' }}>
      In Stock
    </a> : <a style={{ color: 'red' }}>
        Out of Stock
    </a>
  )
}

/**
 * Calculate shopping cart item total prices
 * 
 * @param {*} rowQuantity 
 * @param {*} userSelectedQuantity 
 * @param {*} product 
 */
const calculateItemPrice = (rowQuantity, userSelectedQuantity, product) => {
  let quantity = -1;
  let priceText = '';

  if (rowQuantity <= product.unitsInStock) {
    if (userSelectedQuantity == undefined) {
      quantity = rowQuantity;
    } else {
      quantity = userSelectedQuantity;
    }
  } else {
    if (userSelectedQuantity != undefined) {
      quantity = userSelectedQuantity;
    }
  }

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    console.log(`Product [${product.id}] quantity has been changed to [${userSelectedQuantity}]`);
  }

  if (quantity == -1) {
    priceText = <div>
      N/A
      <div>
        <Typography variant="caption" gutterBottom>
          (Please adjust quantity)
        </Typography>
      </div>
    </div>
  } else {
    priceText = `$${(quantity * product.price).toFixed(2)}`;
  }

  return priceText;
};

/**
 * Get quantity array displayed for dropdown
 * 
 * @param {*} quantity 
 */
const getQuantiyArray = (quantity) => {
  let maxQuantity = quantity > 20 ? 20 : quantity;
  return [...Array(maxQuantity).keys()].map(item => ++item);
};


const renderEmptyCartCaption = (props) => {
  const { classes, isFetchedShoppingCart } = props;

  let block = '';

  if (isFetchedShoppingCart) {
    block = <ContentNotFound warningText={'Your cart is empty. Please add some items!'}/>;
  }

  return block;
}

const renderLoadingIndicator = (isFetchedShoppingCart) => {
  return (
    <Fade in={!isFetchedShoppingCart} timeout={1000}>
      <ContentLoader
        height={80}
        width={400}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      >
        <rect x="0" y="10" width="400" height="160" rx="5" />
      </ContentLoader>
    </Fade>
  )
}

/**
 * Shopping cart component
 *
 * @class ShoppingCart
 * @extends {Component}
 */
class ShoppingCart extends Component {
  constructor() {
    super();
    this.state = {
      itemCheckedState: [],
      itemQuantity: [],
      labelWidth: 0
    };
  }

  componentWillMount() {
    const { fetchShoppingCartInfo } = this.props;
    fetchShoppingCartInfo();
    this.setState({
      labelWidth: 70,
    });
  }

  render() {
    const { info, classes, proceedShoppingCart, createOrder, isCreatingOrder, deleteShoppingCartItem, isFetchingShoppingCart, isFetchedShoppingCart } = this.props;

    let _itemCheckedState = [];
    info.forEach(row => {
      _itemCheckedState.push(false);
    });

    /**
     * Handle input change
     * 
     * @param {*} index 
     */
    const handleChange = index => event => {
      let _itemCheckedState = this.state.itemCheckedState;
      _itemCheckedState[index] = event.target.checked;
      this.setState({ itemCheckedState: _itemCheckedState });
    };

    /**
     * Check out function
     */
    const handleCheckout = () => {
      let productForCheckout = [];
      info.forEach((cartItem, index) => {
        if (this.state.itemCheckedState[index]) {
          let checkoutItem = {
            productId: cartItem.product.id,
            quantity: this.state.itemQuantity[index] == undefined ? cartItem.quantity : this.state.itemQuantity[index]
          };
          productForCheckout.push(checkoutItem);
        }
      });

      // TODO: Checkout action
      localStorage.setItem('_pfc', JSON.stringify(productForCheckout));

      // TODO: Product validation
      if (productForCheckout.length == 0) {
        return;
      }

      // TODO: Fixed shipper id
      createOrder({
        orderItems: productForCheckout,
        shipperId: 6
      });

      proceedShoppingCart(productForCheckout);
    };

    /**
     * 
     * @param {*} index 
     */
    const itemQuantityChangeHandler = index => event => {
      let _itemQuantity = this.state.itemQuantity;
      _itemQuantity[index] = event.target.value
      this.setState({ itemQuantity: _itemQuantity });
    };

    /**
     * Get total item count
     */
    const getTotalItemCount = () => {
      return this.state.itemCheckedState.filter(item => item == true).length;
    };

    /**
     * Get total price of the shopping cart
     */
    const getTotalPrice = () => {
      let totalPrice = 0;
      info.forEach((row, index) => {
        if (this.state.itemCheckedState[index]) {
          let quantity = this.state.itemQuantity[index] == undefined ? row.quantity : this.state.itemQuantity[index]
          totalPrice += quantity * row.product.price
        }
      });
      return totalPrice.toFixed(2)
    };

    /**
     * When user click the delete button
     * 
     * @param {*} id 
     */
    const handleDeleteClick = (id) => {
      deleteShoppingCartItem(id);
    };

    return (
      <div className={classes.root}>
        <Grid container >
          <Grid item xs={12} sm={2}></Grid>
          <Grid item xs={12} sm={8}>
            {isFetchingShoppingCart && renderLoadingIndicator(isFetchedShoppingCart)}

            {!isFetchingShoppingCart && isFetchedShoppingCart && info && info.length > 0 ?
              <Fade in={true} timeout={1000}>
                <div>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography variant="h5" gutterBottom>
                            Shopping Cart
                    </Typography>
                        </TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {info && info.map((row, index) => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row">
                            <Typography variant="h6" children={
                              <a className={classes.shoppingItemName} href={`/products/${row.product.id}`}>
                                {row.product.name}
                              </a>
                            } gutterBottom>
                            </Typography>
                            <Typography variant="caption" children={
                              stockText(row.quantity, row.product.unitsInStock)
                            } gutterBottom>
                            </Typography>
                            <div style={{ display: "inline-flex" }}>
                              <Typography className={classes.itemAction} onClick={() => { handleDeleteClick(row.id) }} variant="caption" children={
                                <span className={classes.itemActionLink} >
                                  Delete
                          </span>
                              } gutterBottom>
                              </Typography>
                              <Typography className={classes.itemAction} variant="caption" children={
                                <a className={classes.itemActionLink}>
                                  Save for later
                          </a>
                              } gutterBottom>
                              </Typography>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="h6" gutterBottom className={classes.itemPrice}>
                              {calculateItemPrice(row.quantity, this.state.itemQuantity[index], row.product)}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            {/* {row.quantity} */}
                            <FormControl variant="outlined" className={classes.formControl}>
                              <InputLabel
                                ref={ref => {
                                  this.InputLabelRef = ref;
                                }}
                                htmlFor="outlined-age-simple"
                              >
                                Quantity
                        </InputLabel>

                              <Select
                                value={this.state.itemQuantity[index] == undefined ? row.quantity : this.state.itemQuantity[index]}
                                onChange={itemQuantityChangeHandler(index)}
                                input={
                                  <OutlinedInput
                                    labelWidth={this.state.labelWidth}
                                    name="quantity"
                                    id="outlined-age-simple"
                                  />
                                }
                              >
                                {
                                  getQuantiyArray(row.product.unitsInStock).map((item, index) =>
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                  )
                                }
                              </Select>
                            </FormControl>

                          </TableCell>
                          <TableCell align="right">
                            <Checkbox
                              checked={this.state.itemCheckedState[index] || false}
                              onChange={handleChange(index)}
                              value="checkedB"
                              icon={<CheckCircleOutline fontSize="large" />}
                              checkedIcon={<CheckCircle fontSize="large" />}
                              classes={{
                                root: classes.cbox,
                                checked: classes.checked
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Typography variant="h6" gutterBottom align="right" className={classes.checkoutBlock}>
                    Subtotal ({getTotalItemCount()} items):
              <span className={classes.checkoutTotalPrice}>
                      ${getTotalPrice()}
                    </span>
                  </Typography>
                  <div style={{ textAlign: 'right' }}>
                    <Button variant="contained" color="primary" size="large" onClick={handleCheckout} disabled={isCreatingOrder ? true : false}>
                      Proceed to Checkout
              </Button>
                  </div>
                </div></Fade>
              : renderEmptyCartCaption(this.props)}
          </Grid>
          <Grid item xs={12} sm={2}></Grid>
        </Grid>
      </div>

    );
  }
}

export default withStyles(styles)(ShoppingCart);