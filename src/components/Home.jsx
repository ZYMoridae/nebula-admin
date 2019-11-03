import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import HomeIcon from "@material-ui/icons/Home";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";

import FeaturedProduct from "../components/home/FeaturedProduct";
import TodayDealsProduct from "../components/home/TodayDealsProduct";
import RecommendProduct from "../components/home/RecommendProduct";
import ContentLoader from "react-content-loader";
import _ from "lodash";
import IconButton from "@material-ui/core/IconButton";
import AutorenewIcon from "@material-ui/icons/Autorenew";

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
import { Bar } from "react-chartjs-2";

import { useTranslation } from "react-i18next";

import Constants from "../utils/Contants";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  subHeader: {
    fontWeight: 600
  },
  promotionMetaContainer: {
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  title: {
    color: "#3d3d3d"
  },
  nav: {
    color: "#3d3d3d"
  },
  blockContainer: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3
  },
  productsHero: {
    width: "100%",
    borderBottom: "1px solid #d3d3d3",
    display: "flex",
    justifyContent: "space-between"
  },
  fetchedProductsContainer: {
    marginBottom: theme.spacing.unit * 3
  },
  renewIcon: {
    paddingTop: "4px",
    textAlign: "right",
    color: theme.palette.primary.main,
    transition: "all 0.5s",
    "&:hover": {
      color: "#d14d12",
      transition: "all 0.5s"
    }
  },
  wrapperTop: {
    marginTop: theme.spacing.unit * 5
  },
  moreIcon: {
    fontSize: "0.75rem",
    lineHeight: "1.66",
    verticalAlign: "text-top"
  },
  // toolbar: theme.mixins.toolbar,
  content: {
    marginLeft: Constants.styles.sidebar.width,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

const RenderLoadingPlaceholder = () => {
  return (
    <ContentLoader
      height={250}
      width={400}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="0" y="0" rx="5" ry="5" width="100%" height="180" />
      <rect x="0" y="190" rx="3" ry="3" width="100" height="10" />
      <rect x="120" y="190" rx="3" ry="3" width="200" height="10" />
      <rect x="0" y="210" rx="3" ry="3" width="100%" height="10" />
      <rect x="0" y="230" rx="3" ry="3" width="200" height="10" />
      <rect x="220" y="230" rx="3" ry="3" width="80" height="10" />
    </ContentLoader>
  );
};

const BlockComponent = props => {
  const {
    classes,
    isFetchedProducts,
    items,
    title,
    error,
    moreCaption
  } = props;
  const TagName = props.tag;
  const contentLoadersArray = _.range(4);
  const renewClicked = () => {
    console.log("clicked");
  };
  return (
    <div>
      <div className={classes.blockContainer}>
        {/* <Fab
                  variant="extended"
                  size="medium"
                  color="primary"
                  aria-label="Add"
                  href="/products"
                >
                  <HomeIcon />
                  Products
                </Fab> */}
        <div className={classes.productsHero}>
          <a
            href="/products"
            style={{ textDecoration: "none", display: "inline-flex" }}
          >
            <Typography variant="h6" gutterBottom className={classes.nav}>
              {title}
            </Typography>
            <Typography
              variant="caption"
              style={{ paddingTop: "9px", marginLeft: "12px" }}
            >
              {moreCaption}
              <ChevronRight fontSize="large" className={classes.moreIcon} />
            </Typography>
          </a>

          <span>
            <AutorenewIcon
              className={classes.renewIcon}
              onClick={renewClicked}
            />
          </span>
        </div>
      </div>

      <Grid container spacing={32} className={classes.fetchedProductsContainer}>
        {error == null && isFetchedProducts && Array.isArray(items)
          ? items.map((product, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <TagName product={product} />
              </Grid>
            ))
          : contentLoadersArray.map((item, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                {RenderLoadingPlaceholder()}
              </Grid>
            ))}
      </Grid>
    </div>
  );
};

const BlockComponents = props => {
  const { t, i18n } = useTranslation();

  const {
    classes,
    isFetchedProducts,
    featuredProducts,
    FeaturedProduct,
    fetchProductsError
  } = props;

  return (
    <div>
      <BlockComponent
        classes={classes}
        title={t("featured_products")}
        isFetchedProducts={isFetchedProducts}
        items={featuredProducts}
        tag={FeaturedProduct}
        error={fetchProductsError}
        moreCaption={t("more")}
      ></BlockComponent>

      <BlockComponent
        classes={classes}
        title={t("todays_deal")}
        isFetchedProducts={isFetchedProducts}
        items={featuredProducts}
        tag={TodayDealsProduct}
        error={fetchProductsError}
        moreCaption={t("more")}
      ></BlockComponent>

      <BlockComponent
        classes={classes}
        title={t("recommend_for_you")}
        isFetchedProducts={isFetchedProducts}
        items={featuredProducts}
        tag={RecommendProduct}
        error={fetchProductsError}
        moreCaption={t("more")}
      ></BlockComponent>
    </div>
  );
};

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { fetchHomeBannerInfo, fetchFeaturedProducts } = this.props;
    fetchHomeBannerInfo();
    fetchFeaturedProducts(1, 4);
  }

  render() {
    const {
      classes,
      info,
      featuredProducts,
      isFetchedProducts,
      fetchProductsError,
      fetchHomeBannerError
    } = this.props;
    console.log(fetchProductsError);

    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };

    return (
      <div classes={styles.root}>
        <Fade in={true} timeout={1000}>
          <div>
            <main className={classes.content}>
              <div className={classes.toolbar} />

              <Bar
                data={data}
                width={100}
                height={50}
                options={{ maintainAspectRatio: false }}
              />
              <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Rhoncus dolor purus non enim praesent elementum facilisis leo
                vel. Risus at ultrices mi tempus imperdiet. Semper risus in
                hendrerit gravida rutrum quisque non tellus. Convallis convallis
                tellus id interdum velit laoreet id donec ultrices. Odio morbi
                quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                adipiscing bibendum est ultricies integer quis. Cursus euismod
                quis viverra nibh cras. Metus vulputate eu scelerisque felis
                imperdiet proin fermentum leo. Mauris commodo quis imperdiet
                massa tincidunt. Cras tincidunt lobortis feugiat vivamus at
                augue. At augue eget arcu dictum varius duis at consectetur
                lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                sapien faucibus et molestie ac.
              </Typography>
              <Typography paragraph>
                Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
                ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
                elementum integer enim neque volutpat ac tincidunt. Ornare
                suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
                volutpat consequat mauris. Elementum eu facilisis sed odio
                morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                tincidunt ornare massa eget egestas purus viverra accumsan in.
                In hendrerit gravida rutrum quisque non tellus orci ac.
                Pellentesque nec nam aliquam sem et tortor. Habitant morbi
                tristique senectus et. Adipiscing elit duis tristique
                sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                eleifend. Commodo viverra maecenas accumsan lacus vel facilisis.
                Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
              </Typography>
            </main>
          </div>
        </Fade>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
