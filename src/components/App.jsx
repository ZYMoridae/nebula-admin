import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Footer from "./Footer";
import Utils from "../utils/Utils";
import Routes from "../utils/Routes";
import SideDrawer from "./SideDrawer";
import NebulaTheme from "./utils/NebulaTheme";

import PrivateRoute from "./security/PrivateRoute";
import { MuiThemeProvider } from "@material-ui/core/styles";

import HomeContainer from "../containers/HomeContainer";
// import UserContainer from "../containers/NoteContainer";
import LoginContainer from "../containers/LoginContainer";
import ProductsContainer from "../containers/ProductsContainer";
import HeaderBarContainer from "../containers/HeaderBarContainer";
import ProductInfoContainer from "../containers/ProductInfoContainer";
import NewProductContainer from "../containers/product/NewProductContainer";
import ProductCategoryContainer from "../containers/product/product-category/ProductCategoryContainer";
import SkuAttributeCategoryContainer from "../containers/sku/sku-attribute-category/SkuAttributeCategoryContainer";
import UserContainer from "../containers/user/UserContainer";

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
  return (
    <div>
      <ProductsContainer
        {...Utils.getPaginationParameter({})}
      ></ProductsContainer>
    </div>
  );
};

const ProductCategories = () => {
  return (
    <div>
      <ProductCategoryContainer
        {...Utils.getPaginationParameter({})}
      ></ProductCategoryContainer>
    </div>
  );
};

const SkuAttributeCategories = () => {
  return (
    <div>
      <SkuAttributeCategoryContainer
        {...Utils.getPaginationParameter({})}
      ></SkuAttributeCategoryContainer>
    </div>
  );
};

const Users = () => {
  return (
    <div>
      <UserContainer {...Utils.getPaginationParameter({
        orderBy: "username"
      })}></UserContainer>
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

const NewProuctComponent = () => {
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
        <MuiThemeProvider theme={NebulaTheme}>
          <div>
            {location.pathname !== Routes.USER.LOGIN && (
              <HeaderBarContainer></HeaderBarContainer>
            )}

            {location.pathname !== Routes.USER.LOGIN &&
              location.pathname !== "/" && <SideDrawer></SideDrawer>}

            <Switch>
              <Route exact path={Routes.USER.LOGIN} component={Login} />

              <PrivateRoute exact path={Routes.HOME} component={Home} />

              <PrivateRoute exact path={Routes.USER.INDEX} component={Users} />

              <PrivateRoute
                exact
                path={Routes.PRODUCT.INDEX}
                component={Products}
              />

              <PrivateRoute
                exact
                path={Routes.PRODUCT.CATEGORY.INDEX}
                component={ProductCategories}
              />

              <PrivateRoute
                exact
                path={Routes.SKU.ATTRIBUTE.CATEGORY.INDEX}
                component={SkuAttributeCategories}
              />

              <PrivateRoute
                exact
                path={Routes.PRODUCT.NEW}
                component={NewProuctComponent}
              />

              <PrivateRoute
                exact
                path={Routes.PRODUCT.EDIT}
                component={ProductInfo}
              />

              <Route exact path={Routes.USER.LOGIN} component={Login} />
              <Redirect to={Routes.USER.LOGIN} />
            </Switch>

            {location.pathname !== Routes.USER.LOGIN && <Footer></Footer>}
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
