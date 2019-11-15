import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import _ from "lodash";

import Constants from "../../utils/Contants";

const styles = theme => ({

});

class Form extends Component {
  componentDidMount() {
    // const { fetchUser, id } = this.props;
    // fetchUser(id);
  }

  render() {
    const {
      classes,
      user
    } = this.props;

    return (
        <div></div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Form);
