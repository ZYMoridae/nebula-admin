import _ from "lodash";
import { Z_MEM_ERROR } from "zlib";

const Utils = {
  addToken: options => {
    let token = sessionStorage.getItem("token");
    let tokenOption = {};
    if (!_.isNil(token)) {
      tokenOption = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    }
    return Object.assign({}, options, tokenOption);
  },
  isUserLogin: () => {
    return (
      !_.isNil(sessionStorage.getItem("token")) &&
      sessionStorage.getItem("token") != "null" &&
      sessionStorage.getItem("token") != "undefined"
    );
  },
  logout: () => {
    // Clear session storage
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  },
  getCurrentUser: () => {
    return JSON.parse(sessionStorage.getItem("user"));
  },
  // NOTE: Global debug mode
  debug: true,
  getPaginationParameter: ({ orderBy = "name" }) => {
    let params = new URLSearchParams(window.location.search);
    let page = 1,
      perPage = 10,
      _orderBy = !_.isNil(orderBy) ? orderBy : "name",
      userPage = params.get("page"),
      userPerPage = params.get("perPage"),
      userOrderBy = params.get("orderBy");

    if (!_.isNil(userPage)) {
      page = parseInt(userPage);
    }

    if (!_.isNil(userPerPage)) {
      perPage = parseInt(userPerPage);
    }

    if (!_.isNil(userOrderBy)) {
      _orderBy = userOrderBy;
    }

    return {
      page: page,
      perPage: perPage,
      orderBy: _orderBy
    };
  },
  // FIXME:
  isAdmin: () => {
    return true;
  }
};

export default Utils;
