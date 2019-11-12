import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import HeaderBarContainer from "../containers/HeaderBarContainer";
import HomeContainer from "../containers/HomeContainer";
import LoginContainer from "../containers/LoginContainer";

import UserContainer from "../containers/NoteContainer";
import PrivateRoute from "./security/PrivateRoute";
import ProductsContainer from "../containers/ProductsContainer";
import ProductInfoContainer from "../containers/ProductInfoContainer";
import ShoppingCartContainer from "../containers/ShoppingCartContainer";
import PaymentContainer from "../containers/PaymentContainer";

import Footer from "./Footer";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Routes from "../utils/Routes";
import { green, orange, blue } from "@material-ui/core/colors";
import SideDrawer from "./SideDrawer";

import NewProduct from "../containers/product/NewProductContainer";
import NewProductContainer from "../containers/product/NewProductContainer";

const nebulaTheme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#2b8eff",
      // footerDark: '#401500',
      footerDark: "#1d1d1d"
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#0066ff",
      main: "#ff5666",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffffff"
    }
    // error: will use the default color
  },
  overrides: {
    MuiInputBase: {
      input: {
        // padding: "12px !important",
        fontSize: "12px"
      },
      inputType: {
        height: "inherit"
      }
    },
    MuiOutlinedInput: {
      multiline: {
        padding: "12px !important"
      },
      input: {
        padding: "12px"
      }
    },
    MuiFormLabel: {
      root: {
        fontSize: '12px'
      }
    },
    MuiInputLabel: {
      outlined: {
        transform: 'translate(14px, 16px) scale(1)'
      }
    },
    MuiPrivateTextarea: {
      textarea: {
        padding: "0px !important"
      }
    },
    MuiFormControl: {
      marginNormal: {
        marginTop: '8px',
        marginBottom: '8px'
      }
    },
    MuiTypography: {
      h4: {
        fontSize: "20px"
      },
      subtitle2: {
        fontSize: "12px"
      }
    },
    MuiButton: {
      label: {
        fontSize: "12px"
      },
      root: {
        marginTop: "8px",
        maringBottom: "8px",
        fontSize: "12px",
        textTransform: 'none'
      }
    },
    MuiMenuItem: {
      root: {
        fontSize: "12px"
      }
    },
    MuiExpansionPanelSummary: {
      root: {
        marginTop: "4px",
        backgroundColor: "#2b8eff",
        borderRadius: "5px",
        color: "white"
      },
      content: {
        color: "white !important",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: "12px"
      },
      expanded: {
        borderRadius: "5px 5px 0px 0px"
      },
      expandIcon: {
        color: "white"
      }
    },
    MuiPaper: {
      root: {
        borderRadius: "5px !important",
        "&::before": {
          backgroundColor: "transparent !important"
        }
      },
      rounded: {
        borderRadius: "5px !important"
      }
    }
  }
});

const Home = () => (
  <div>
    <UserContainer></UserContainer>
    <HomeContainer></HomeContainer>
  </div>
);

const Login = () => (
  <div>
    <LoginContainer></LoginContainer>
  </div>
);

const Products = () => {
  let params = new URLSearchParams(window.location.search);
  let page = 1,
    perPage = 12,
    orderBy = "name",
    userPage = params.get("page"),
    userPerPage = params.get("perPage"),
    userOrderBy = params.get("orderBy");

  if (userPage != undefined) {
    page = parseInt(userPage);
  }

  if (userPerPage != undefined) {
    perPage = parseInt(userPerPage);
  }

  if (userOrderBy != undefined) {
    orderBy = userOrderBy;
  }

  return (
    <div>
      <ProductsContainer
        page={page}
        perPage={perPage}
        orderBy={orderBy}
      ></ProductsContainer>
    </div>
  );
};

const ProductInfo = ({ match }) => {
  return (
    <div>
      <ProductInfoContainer productId={match.params.id}></ProductInfoContainer>
    </div>
  );
};

const CartInfo = () => {
  return (
    <div>
      <ShoppingCartContainer></ShoppingCartContainer>
    </div>
  );
};

const PaymentComponent = ({ match }) => {
  return (
    <div>
      <PaymentContainer orderId={match.params.orderId}></PaymentContainer>
    </div>
  );
};

const NewProuctComponent = ({ match }) => {
  return (
    <div>
      <NewProductContainer />
    </div>
  );
};

class App extends React.Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={nebulaTheme}>
          <div>
            {location.pathname !== Routes.USER.LOGIN && (
              <HeaderBarContainer></HeaderBarContainer>
            )}

            {location.pathname !== Routes.USER.LOGIN &&
              location.pathname !== "/" && <SideDrawer></SideDrawer>}

            <Switch>
              <Route exact path="/login" component={Login} />

              <PrivateRoute exact path="/home" component={Home} />
              <PrivateRoute exact path="/products" component={Products} />
              <PrivateRoute
                exact
                path="/products/new"
                component={NewProuctComponent}
              />
              <PrivateRoute
                exact
                path="/products/:id"
                component={ProductInfo}
              />
              <PrivateRoute exact path="/cart" component={CartInfo} />
              <PrivateRoute
                exact
                path="/payment/:orderId"
                component={PaymentComponent}
              />

              <Route exact path={Routes.USER.LOGIN} component={Login} />
              <Redirect to="/login" />
            </Switch>

            {location.pathname !== Routes.USER.LOGIN && <Footer></Footer>}
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
