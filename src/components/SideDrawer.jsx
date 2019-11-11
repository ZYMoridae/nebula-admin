import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import ClassRoundedIcon from "@material-ui/icons/ClassRounded";
import CardMembershipRoundedIcon from "@material-ui/icons/CardMembershipRounded";
import LocalShippingRoundedIcon from "@material-ui/icons/LocalShippingRounded";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import VerifiedUserRoundedIcon from "@material-ui/icons/VerifiedUserRounded";
import SchoolRoundedIcon from "@material-ui/icons/SchoolRounded";
import CategoryRoundedIcon from "@material-ui/icons/CategoryRounded";
import LocalGroceryStoreRoundedIcon from "@material-ui/icons/LocalGroceryStoreRounded";

import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";

import Constants from "../utils/Contants";
import NebulaIcon from "../components/NebulaIcon";
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
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: {
    height: 64
    // backgroundColor: '#2b8eff'
  },
  itemText: {
    fontSize: "12px",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  }
});

const userBlock = [
  {
    name: "User",
    icon: <PersonRoundedIcon fontSize="small" />
  },
  {
    name: "Teacher",
    icon: <SchoolRoundedIcon fontSize="small" />
  },
  {
    name: "Role",
    icon: <VerifiedUserRoundedIcon fontSize="small" />
  }
];

const productBlock = [
  {
    name: "Product",
    icon: <LocalGroceryStoreRoundedIcon fontSize="small" />
  },
  {
    name: "Product Category",
    icon: <CategoryRoundedIcon fontSize="small" />
  },
  {
    name: "Sku Category",
    icon: <CategoryRoundedIcon fontSize="small" />
  },
  {
    name: "Class",
    icon: <ClassRoundedIcon fontSize="small" />
  }
];

const supportBlock = [
  {
    name: "Order",
    icon: <ShoppingCartRoundedIcon fontSize="small" />
  },
  {
    name: "Invoice",
    icon: <DescriptionRoundedIcon fontSize="small" />
  },
  {
    name: "Shipper",
    icon: <LocalShippingRoundedIcon fontSize="small" />
  },
  {
    name: "Membership",
    icon: <CardMembershipRoundedIcon fontSize="small" />
  }
];

class SideDrawer extends Component {
  render() {
    const { classes } = this.props;

    const itemClickHandler = itemName => {
      if (itemName == "home") {
        window.location.href = "/home";
      } else {
        window.location.href = `/${itemName.toLowerCase()}s`;
      }
    };

    const checkSelected = name => {
      return window.location.pathname.startsWith(`/${name.toLowerCase()}`);
    };

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
          <div className={classes.toolbar}></div>
          <Divider />
          <List>
            <ListItem
              button
              selected={checkSelected("home")}
              onClick={() => {
                itemClickHandler("home");
              }}
            >
              <ListItemIcon>
                <HomeRoundedIcon fontSize="small" />
              </ListItemIcon>
              {/* <ListItemText primary="Home" className={classes.itemText}/> */}
              <span className={classes.itemText}>Home</span>
            </ListItem>
          </List>
          <Divider />
          <List>
            {userBlock.map((item, index) => (
              <ListItem
                button
                selected={checkSelected(item.name)}
                key={index}
                onClick={() => {
                  itemClickHandler(item.name);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <span className={classes.itemText}>{item.name}</span>
                {/* <ListItemText primary={item.name} /> */}
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {productBlock.map((item, index) => (
              <ListItem
                button
                key={index}
                selected={checkSelected(item.name)}
                onClick={() => {
                  itemClickHandler(item.name);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                {/* <ListItemText primary={item.name} /> */}
                <span className={classes.itemText}>{item.name}</span>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {supportBlock.map((item, index) => (
              <ListItem
                button
                selected={checkSelected(item.name)}
                key={index}
                onClick={() => {
                  itemClickHandler(item.name);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                {/* <ListItemText primary={item.name} /> */}
                <span className={classes.itemText}>{item.name}</span>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(SideDrawer);
