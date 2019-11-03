import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import WarningIcon from '@material-ui/icons/WarningRounded';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  warningText: {
    color: '#a9a9a9'
  }
});


class ContentNotFound extends Component {  
  render() {
    const { theme, warningText, classes, paddingTop, paddingBottom } = this.props;

    let defaultStyle = {
      emptyCartCaptionContainer: {
        paddingLeft: theme.spacing.unit * 5,
        paddingRight: theme.spacing.unit * 5,
        paddingTop: theme.spacing.unit * 10,
        paddingBottom: theme.spacing.unit * 10,
        marginBottom: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 3,
        textAlign: 'center'
      }
    };

    if(paddingTop != undefined) {
      defaultStyle.emptyCartCaptionContainer.paddingTop = paddingTop;
    }

    if(paddingBottom != undefined) {
      defaultStyle.emptyCartCaptionContainer.paddingBottom = paddingBottom;
    }

    console.log(defaultStyle.emptyCartCaptionContainer);

    return(
      <Paper style={defaultStyle.emptyCartCaptionContainer}>
        <WarningIcon fontSize="large" color="primary" />
        <Typography variant="caption" gutterBottom className={classes.warningText}>
          {warningText && warningText != '' ? warningText : 'Content was not found!'}
        </Typography>
      </Paper>
    )
  }
}

export default withStyles(styles, { withTheme: true })(ContentNotFound);
