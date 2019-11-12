import React, { Component } from "react";
import ProductItem from "../components/ProductItem";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Grow from "@material-ui/core/Grow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import AddRoundedIcon from "@material-ui/icons/AddRounded";
import IconButton from "@material-ui/core/IconButton";

import SubToolBar from "./utils/SubToolBar";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {},
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  loginContainer: {
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 12,
    display: "flex",
    flexWrap: "wrap",
    width: 350
  },
  loginButton: {
    marginTop: theme.spacing.unit * 2
  },
  productsContainer: {
    marginLeft: theme.spacing.unit * 10,
    marginRight: theme.spacing.unit * 10,
    marginBottom: theme.spacing.unit * 7
  },
  pagination: {
    marginTop: theme.spacing.unit * 5,
    textAlign: "center"
  },
  prodcutContainer: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: 340
  },
  idClick: {
    textDecoration: "underline",
    color: "#0044ff",
    "&:hover": {
      cursor: "pointer"
    }
  },
  table: {
    width: "100%"
  },
  newButton: {
    float: "right"
  },
  paginationWrapper: {
    textAlign: "center"
  }
});

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = { offset: 0 };
  }

  componentDidMount() {
    const { fetchProductsInfo, page, perPage, orderBy } = this.props;
    let currentOffset = (page - 1) * perPage;
    this.handleClick(currentOffset);
    // fetchProductsInfo(page, perPage, orderBy);
  }

  updateUrlParmas(page, perPage, orderBy) {
    if (history.pushState) {
      let url = `${window.location.protocol}//${window.location.host}${window.location.pathname}?page=${page}&perPage=${perPage}&orderBy=${orderBy}`;
      window.history.pushState(
        {
          path: url
        },
        "",
        url
      );
    }
  }

  /**
   * Handle pagination click
   *
   * @param {*} offset
   */
  handleClick(offset) {
    const { perPage, orderBy, fetchProductsInfo } = this.props;
    let page = offset / this.props.perPage + 1;
    this.setState({ offset });
    this.updateUrlParmas(page, perPage, orderBy);
    fetchProductsInfo(page, perPage, orderBy);
  }

  render() {
    const {
      info,
      classes,
      perPage,
      totalPages,
      page,
      isFetchingProducts,
      isFetchedProducts
    } = this.props;

    const theme = createMuiTheme({
      typography: {
        useNextVariants: true
      }
    });

    const onDeleteClick = product => {
      window.location.href = "/products/" + product.id;
    };

    return (
      <div className={classes.productsContainer}>
        <main className={classes.content}>
          <Grid
            // container
            // spacing={32}
            // direction="row"
            className={classes.prodcutContainer}
          >
            <Grid item xs={1} lg={2}></Grid>
            <Grid item xs={10} lg={12}>
              <Grid
              // container
              // spacing={32}
              // direction="row"
              // alignContent="center"
              >
                <Grid item xs={12}>
                  <SubToolBar title="Products" href="/products/new" />
                </Grid>

                {isFetchingProducts ? (
                  <CircularProgress />
                ) : (
                  <Grid item xs={12}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell align="right">Name</TableCell>
                          <TableCell align="right">Category</TableCell>
                          <TableCell align="right">Created At</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Array.isArray(info) &&
                          info.map((product, index) => (
                            <TableRow key={index}>
                              <TableCell component="th" scope="row">
                                <a
                                  className={classes.idClick}
                                  onClick={() => {
                                    onDeleteClick(product);
                                  }}
                                >
                                  {product.id}
                                </a>
                              </TableCell>
                              <TableCell align="right">
                                {product.name}
                              </TableCell>
                              <TableCell align="right">
                                {product.productCategory.name}
                              </TableCell>
                              <TableCell align="right">
                                {product.createdAt}
                              </TableCell>
                              <TableCell align="right">
                                <IconButton
                                  aria-label="delete"
                                  className={classes.margin}
                                  size="small"
                                  onClick={() => {
                                    onDeleteClick(product);
                                  }}
                                >
                                  <DeleteIcon fontSize="inherit" />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <div className={classes.paginationWrapper}>
                    <MuiThemeProvider theme={theme}>
                      <CssBaseline />
                      <Pagination
                        limit={perPage}
                        offset={this.state.offset}
                        total={totalPages * perPage}
                        onClick={(e, offset) => this.handleClick(offset)}
                      />
                    </MuiThemeProvider>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1} lg={2}></Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Products);
