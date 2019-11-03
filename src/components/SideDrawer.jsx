import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import Constants from '../utils/Contants';

const drawerWidth = Constants.styles.sidebar.width;

const styles = theme => ({
  container: {
    backgroundColor: theme.palette.primary.footerDark,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  footerText: {
    color: "white",
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  linkContainer: {
    textAlign: "center",
    display: "inline-flex",
    color: "white",
    width: "100%"
  },
  linkItem: {
    marginRight: theme.spacing.unit * 2,
    transition: "all 0.15s",
    color: "white",
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.primary.main,
      transition: "all 0.15s",
      textDecoration: "underline"
    }
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  }
});

class SideDrawer extends Component {
  render() {
    const { classes } = this.props;

    const itemClickHandler = (itemName) => {
      window.location.href = `/${itemName.toLowerCase()}s`;
    }

    return (
      <div>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />
          <Divider />
          <List>
            {["User", "Product", "Product Category ", "Payment"].map((text, index) => (
              <ListItem button key={text} onClick = {()=>{itemClickHandler(text)}}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["Support", "Analytics", "Others"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(SideDrawer);
