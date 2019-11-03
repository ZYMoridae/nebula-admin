import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import _ from 'lodash';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
  categoryItem: {
    padding: 0
  },
  categoryItemLink: {
    color: 'rgba(0, 0, 0, 0.87)',
    transition: 'all 0.3s',
    textDecoration: 'none',
    padding: 0,
    '&:hover': {
      color: '#ff5000',
      transition: 'all 0.3s'
    }
  },
  categoryContainer: {
    marginLeft: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    borderRight: 'solid 1px',
    borderColor: '#d3d3d3',
    height: 'max-content'
  },
  categoryListContainer: {
    marginLeft: theme.spacing.unit
  },
});

class ProductCategorySideBar extends Component {
  componentDidMount() {
    const { fetchProductCategoryInfo } = this.props;
    fetchProductCategoryInfo(1, 20, '');
  }

  render() {
    const { classes, info } = this.props;

    return (
      <div className={classes.categoryContainer}>
        <Typography variant="subtitle1" gutterBottom>
          Show results for:
        </Typography>
        <List dense={true} className={classes.categoryListContainer}>
          {info && info.map((item, index) => (
            <ListItem key={index} className={classes.categoryItem}>
              {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
              <ListItemText children={
                <a href='/' className={classes.categoryItemLink}>
                  {_.capitalize(item.name)}
                </a>} />
            </ListItem>
          ))}
        </List>
      </div>
    )
  }

}

export default withStyles(styles)(ProductCategorySideBar);