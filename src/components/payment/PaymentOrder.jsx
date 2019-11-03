import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class PaymentOrder extends Component {

  calculateTotalAmount(orderItems) {
    return orderItems.map(orderItem => orderItem.quantity * orderItem.product.price)
      .reduce((total, sum) => total + sum, 0);
  }

  render() {
    const { classes, info, activateOrder } = this.props;

    let totalAmount = 0;
    if (activateOrder && activateOrder.orderItems) {
      totalAmount = this.calculateTotalAmount(activateOrder.orderItems);
    }

    return (
      <div>
        <Paper className={classes.paymentOrderContainer}>
          <Typography variant="subtitle1">
            Orders
          </Typography>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activateOrder && activateOrder.orderItems.map((orderItem, index) =>
                <TableRow key={index}>
                  <TableCell>{orderItem.product ? orderItem.product.name : ''}</TableCell>
                  <TableCell align="right">${orderItem.product ? orderItem.product.price : ''}</TableCell>
                  <TableCell align="right">{orderItem.quantity}</TableCell>
                </TableRow>
              )}

            </TableBody>
          </Table>
          <Typography variant="h6" gutterBottom align="right" style={{ color: '#ff5000', marginTop: '10px' }}>
            Total Amount:
              <span style={{ marginLeft: '5px' }}>
              ${totalAmount.toFixed(2)}
            </span>
          </Typography>
        </Paper>
      </div>
    )
  }
}

export default PaymentOrder;