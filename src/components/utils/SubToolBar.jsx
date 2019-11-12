import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    float: "right",
    fontSize: "12px",
    marginTop: "0px"
  },
  title: {
    fontSize: "20px",
    marginBottom: "20px"
  }
});

class SubToolBar extends Component {
  render() {
    const { classes, href, title } = this.props;

    return (
      <div>
        <Typography variant="h4" gutterBottom className={classes.title}>
          {title}
          <Button
            size="small"
            variant="outlined"
            className={classes.button}
            color="primary"
            onClick={() => {
              window.location.href = href;
            }}
          >
            Add
          </Button>
        </Typography>
        <Divider />
      </div>
    );
  }
}

export default withStyles(styles)(SubToolBar);
