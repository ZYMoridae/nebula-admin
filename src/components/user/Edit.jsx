import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import _ from "lodash";

import CircularProgress from "@material-ui/core/CircularProgress";
import Constants from "../../utils/Contants";
import Form from "./Form";

const styles = theme => ({
  container: {
    paddingTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 2,
    marginLeft: `${Constants.styles.sidebar.width}px`
  },
  priceCaption: {
    color: "#B12704",
    marginLeft: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  button: {
    backgroundColor: "#00B3A0",
    transition: "all 0.3s",
    marginTop: theme.spacing.unit,
    maringRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    color: "white",
    "&:hover": {
      backgroundColor: "#00877C",
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
  main: {
    marginLeft: `${Constants.styles.sidebar.width}px`
  }
});

class Edit extends Component {
  componentDidMount() {
    const { fetchUser, id } = this.props;
    fetchUser(id);
  }

  render() {
    const { classes, user, fetchUserPending, fetchUserFulfilled } = this.props;

    return (
      <Fade in={true} timeout={1000}>
        <Grid container>
          <Grid item xs={1} sm={1}></Grid>
          <Grid item xs={10} sm={8} className={classes.container}>
            {fetchUserPending && <CircularProgress />}
            {fetchUserFulfilled && user && <Form user={user} mode="edit"></Form>}
          </Grid>
          <Grid item xs={1} sm={1}></Grid>
        </Grid>
      </Fade>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Edit);
