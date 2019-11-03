import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { isMobile } from 'react-device-detect';

class PaymentMethod extends Component {

  constructor() {
    super();
    this.state = {
      info: {}
    };
  }

  componentWillMount() {
    this.setState({
      info: this.props.creditCardInfo
    });
  }


  render() {
    const { classes, info, creditCardInfo } = this.props;

    const handleChange = event => {
      let _inputValues = creditCardInfo;
      let value = event.target.value;

      if (event.target.name == 'cardnumber') {
        value = value.substring(0, 16);
      }

      if (event.target.name == 'expiry') {
        value = value.substring(0, 4);
      }

      if (event.target.name == 'cvc') {
        value = value.substring(0, 3);
      }

      _inputValues[event.target.name] = value;
      this.setState({
        info: _inputValues
      });
    };


    return (
      <div>
        <Paper className={classes.paymentOrderContainer}>
          <Typography variant="subtitle1">
            Payment Method
          </Typography>

          <Grid container spacing={32} className={classes.paymentMethodContainer}>
            <Grid item xs={12} md={6} className={classes.gridItem + ' ' + isMobile ? classes.ccBlockMobile : ''}>
              <Cards
                number={this.state.info.cardnumber ? this.state.info.cardnumber : ''}
                name={this.state.info.cardname ? this.state.info.cardname : ''}
                expiry={this.state.info.expiry ? this.state.info.expiry : ''}
                cvc={this.state.info.cvc ? this.state.info.cvc : ''}
                focused={'true'}
              />
            </Grid>

            <Grid item xs={12} md={6} className={classes.gridItem}>
              <Grid container spacing={32} className={classes.paymentMethodInputContainer}>
                <Grid item xs={12} md={6} className={classes.gridItem}>
                  <TextField
                    id="outlined-name"
                    label="Card Number"
                    name="cardnumber"
                    type="number"
                    className={classes.textField}
                    margin="normal"
                    value={this.state.info.cardnumber ? this.state.info.cardnumber : ''}
                    // variant="outlined"
                    fullWidth={true}
                    onChange={handleChange}
                  />

                </Grid>

                <Grid item xs={12} md={6} className={classes.gridItem}>
                  <TextField
                    id="outlined-name"
                    label="Name"
                    name="cardname"
                    className={classes.textField}
                    margin="normal"
                    value={this.state.info.cardname ? this.state.info.cardname : ''}
                    // variant="outlined"
                    fullWidth={true}
                    onChange={handleChange}
                  />

                </Grid>

                <Grid item xs={12} md={9} className={classes.gridItem}>
                  <TextField
                    id="outlined-name"
                    label="Expired Date"
                    name="expiry"
                    className={classes.textField}
                    margin="normal"
                    value={this.state.info.expiry ? this.state.info.expiry : ''}
                    // variant="outlined"
                    fullWidth={true}
                    onChange={handleChange}
                    type="number"
                    inputProps={{ min: "0", max: "9999" }}
                  />

                </Grid>

                <Grid item xs={12} md={3} className={classes.gridItem}>
                  <TextField
                    id="outlined-name"
                    label="CVV"
                    name="cvc"
                    className={classes.textField}
                    margin="normal"
                    value={this.state.info.cvc ? this.state.info.cvc : ''}
                    type="number"
                    // variant="outlined"
                    fullWidth={true}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>


        </Paper>
      </div>
    )
  }
}

export default PaymentMethod;