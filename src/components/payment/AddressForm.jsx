import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

class PaymentAddressForm extends Component {
  constructor() {
    super();
    this.state = {
      inputValues: {}
    };
  }

  componentWillMount() {
    this.setState({
      inputValues: this.props.shippingInfoFormData
    });
  }


  render() {
    const { classes, info, orderId, createShippingInfo, shippingInfo, shippingInfoFormInputChanged, shippingInfoFormData } = this.props;

    const handleChange = name => event => {
      let _inputValues = shippingInfoFormData;
      _inputValues[name] = event.target.value;
      this.setState({
        inputValues: _inputValues
      });
      console.log(shippingInfoFormData);
    };

    return (
      <div>
        <Paper className={classes.paymentOrderContainer}>
          <Typography variant="subtitle1">
            Address
          </Typography>
          <Grid container spacing={40} className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.gridItem}>
              <TextField
                id="outlined-name"
                label="First Name"
                name="firstname"
                className={classes.textField}
                margin="normal"
                value={this.state.inputValues.firstname ? this.state.inputValues.firstname : ''}
                // variant="outlined"
                fullWidth={true}
                onChange={handleChange('firstname')}
              />
            </Grid>

            <Grid item xs={12} md={6} className={classes.gridItem}>
              <TextField
                id="outlined-name"
                label="Last Name"
                name="lastname"
                className={classes.textField}
                margin="normal"
                value={this.state.inputValues.lastname ? this.state.inputValues.lastname : ''}
                // variant="outlined"
                fullWidth={true}
                onChange={handleChange('lastname')}
              />
            </Grid>

            <Grid item xs={12} md={6} className={classes.gridItem}>
              <TextField
                id="outlined-name"
                label="Email"
                name="email"
                className={classes.textField}
                margin="normal"
                value={this.state.inputValues.email ? this.state.inputValues.email : ''}
                // variant="outlined"
                fullWidth={true}
                onChange={handleChange('email')}
              />
            </Grid>

            <Grid item xs={12} md={6} className={classes.gridItem}>
              <TextField
                id="outlined-name"
                label="Telephone"
                name="telephone"
                className={classes.textField}
                margin="normal"
                value={this.state.inputValues.telephone ? this.state.inputValues.telephone : ''}
                // variant="outlined"
                fullWidth={true}
                onChange={handleChange('telephone')}
              />
            </Grid>

            <Grid item xs={12} md={12} className={classes.gridItem}>
              <TextField
                id="outlined-name"
                label="Postcode"
                name="postCode"
                className={classes.textField}
                margin="normal"
                value={this.state.inputValues.postCode ? this.state.inputValues.postCode : ''}
                // variant="outlined"
                fullWidth={true}
                onChange={handleChange('postCode')}
              />
            </Grid>

            <Grid item xs={12} md={12} className={classes.gridItem}>
              <TextField
                id="outlined-name"
                label="Address1"
                name="address1"
                className={classes.textField}
                margin="normal"
                value={this.state.inputValues.address1 ? this.state.inputValues.address1 : ''}
                // variant="outlined"
                fullWidth={true}
                onChange={handleChange('address1')}
              />
            </Grid>

            <Grid item xs={12} md={12} className={classes.gridItem}>
              <TextField
                id="outlined-name"
                label="Address2"
                name="address2"
                className={classes.textField}
                margin="normal"
                value={this.state.inputValues.address2 ? this.state.inputValues.address2 : ''}
                // variant="outlined"
                fullWidth={true}
                onChange={handleChange('address2')}
              />
            </Grid>

          </Grid>



        </Paper>
      </div>
    )
  }
}

export default PaymentAddressForm;