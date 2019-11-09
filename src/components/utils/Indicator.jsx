import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
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
  }
});

class Indicator extends Component {
  render() {
    const { classes, index } = this.props;
    return <div className={classes.indicator}>{index}</div>;
  }
}

export default withStyles(styles, { withTheme: true })(Indicator);
