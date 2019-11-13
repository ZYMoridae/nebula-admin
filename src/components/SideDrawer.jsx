import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

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

import Constants from "../utils/Contants";
import NebulaIcon from "../components/NebulaIcon";

import _ from "lodash";

import { USER, VENDOR, TEACHER, ADMIN } from "../utils/Role";

const drawerWidth = Constants.styles.sidebar.width;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: {
    height: 64
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
    icon: <CategoryRoundedIcon fontSize="small" />,
    path: "/products/categories"
  },
  {
    name: "Sku Category",
    icon: <CategoryRoundedIcon fontSize="small" />,
    path: "/skus/attributes/categories"
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

    const itemClickHandler = item => {
      if (item.name == "home") {
        window.location.href = "/home";
      } else {
        if (_.isNil(item.path)) {
          window.location.href = `/${item.name.toLowerCase()}s`;
        } else {
          window.location.href = item.path;
        }
      }
    };

    //FIXME: Use regular expression check the status
    const checkSelected = item => {
      let isSelected = false;

      if (_.isNil(item.path)) {
        isSelected = window.location.pathname == `/${item.name.toLowerCase()}s`;
      } else {
        isSelected = window.location.pathname.startsWith(`${item.path}`);
      }

      return isSelected;
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
              selected={checkSelected({
                name: "Home"
              })}
              onClick={() => {
                itemClickHandler({
                  name: "Home"
                });
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
                selected={checkSelected(item)}
                key={index}
                onClick={() => {
                  itemClickHandler(item);
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
                selected={checkSelected(item)}
                onClick={() => {
                  itemClickHandler(item);
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
                selected={checkSelected(item)}
                key={index}
                onClick={() => {
                  itemClickHandler(item);
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
