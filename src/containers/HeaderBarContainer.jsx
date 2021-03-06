import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import NebulaIcon from '../components/NebulaIcon';
import Routes from '../utils/Routes';

// import ProductSearchComponent from '../components/ProductSearchComponent';

import { withTranslation } from "react-i18next";

import Constants from '../utils/Contants';

const drawerWidth = Constants.styles.sidebar.width;


const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
    height: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    height: '100%',
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: theme.spacing.unit * 40,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  homeButton: {
    textDecoration: 'none',
    color: 'white',
    fontFamily: 'Megrim, cursive; !important'
  },
  myAppBar: {
    zIndex: theme.zIndex.drawer + 1,
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
  },
  loginButton: {
    color: 'white'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 2,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 7,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadge: {
    '& > span': {
      backgroundColor: '#9a3300'
    }
  }
});


const renderLoginButton = (props) => {
  const { classes, t } = props;

  let block = '';

  if (location.pathname !== Routes.USER.LOGIN) {
    block = <div className={classes.sectionDesktop}>
      <Typography variant="button" color="inherit" noWrap>
        <a href={Routes.USER.LOGIN} className={classes.homeButton}>
          {t('login_btn')}
      </a>
      </Typography>
    </div>;
  }

  return block;
}

class PrimarySearchAppBar extends React.Component {
  componentWillMount() {
    // TODO: user login check wrongly when network disconnected
    this.setState({
      anchorEl: null,
      mobileMoreAnchorEl: null,
      isUserLogin: sessionStorage.getItem('user') != null && sessionStorage.getItem('user') != 'undefined' && sessionStorage.getItem('user') != 'null'
    });
  }

  componentDidMount() {


    this.handleProfileMenuOpen = event => {
      this.setState({ anchorEl: event.currentTarget });
    };

    this.handleMenuClose = () => {
      this.setState({ anchorEl: null });
      this.handleMobileMenuClose();
    };

    this.handleMobileMenuOpen = event => {
      this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    this.handleMobileMenuClose = () => {
      this.setState({ mobileMoreAnchorEl: null });
    };

    this.handleLogout = () => {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
      location.href = Routes.USER.LOGIN;
    }
  }

  render() {
    const { anchorEl, mobileMoreAnchorEl, isUserLogin } = this.state;
    const { classes, t } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={this.handleLogout}>Log Out</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
        <MenuItem onClick={this.handleLogout}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Log Out</p>
        </MenuItem>

      </Menu>
    );

    const cartIconButtonClickHandler = (event) => {
      window.location.href = '/cart';
    }

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.myAppBar}>
          <Toolbar>
            {/* {isUserLogin ? <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton> : ''} */}
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              <Toolbar>
                {/* <NebulaIcon /> */}
                <Typography variant="h6" color="inherit" noWrap>
                  <a href="/" className={classes.homeButton}>
                    {t('max_studio')}
                  </a>
                </Typography>
              </Toolbar>
            </Typography>
            {/* <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div> */}
            <div className={classes.grow} />
            {isUserLogin ?
              <div className={classes.sectionDesktop}>
                {/* <ProductSearchComponent /> */}
                            {/* <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div> */}
                {/* <IconButton color="inherit" onClick={cartIconButtonClickHandler}>
                  <ShoppingCartIcon />
                </IconButton>
                <IconButton color="inherit">
                  <Badge badgeContent={1} color="primary" className={classes.notificationBadge}>
                    <NotificationsIcon />
                  </Badge>
                </IconButton> */}
                <IconButton
                  aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={(e) => { this.handleProfileMenuOpen(e) }}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div> : renderLoginButton(this.props)}
            {isUserLogin ?
              <div className={classes.sectionMobile}>
                <IconButton aria-haspopup="true" onClick={(e) => { this.handleMobileMenuOpen(e) }} color="inherit">
                  <MoreIcon />
                </IconButton>
              </div> : ''
            }
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTranslation()(withStyles(styles)(PrimarySearchAppBar));