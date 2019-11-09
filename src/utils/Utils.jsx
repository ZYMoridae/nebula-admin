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
  }
};

export default Utils;
