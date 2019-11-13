import Zjax from "../utils/zjax";
import Utils from "../utils/Utils";
import ActionType from "./ActionType";

export const fetchAllUserFulfilled = (results, totalPages) => {
  return {
    type: ActionType.USER.GET_ALL.FULFILLED,
    isFetchingAllUser: false,
    isFetchedAllUser: true,
    users: results,
    totalPages: totalPages,
    receivedAt: Date.now()
  };
};

export const fetchAllUserPending = () => {
  return {
    type: ActionType.USER.GET_ALL.PENDING,
    isFetchingAllUser: true,
    isFetchedAllUser: false
  };
};

export const fetchAllUserError = error => {
  return {
    type: ActionType.USER.GET_ALL.ERROR,
    isFetchingAllUser: false,
    isFetchedAllUser: true,
    error: error
  };
};

export const fetchAllUser = (page, perPage, orderBy) => {
  return function(dispatch) {
    dispatch(fetchAllUserPending());

    let options = {
      method: "get"
    };

    Zjax.request({
      url: `/api/users?page=${page -
        1}&size=${perPage}&sort=${orderBy}&keyword`,
      option: Utils.addToken(options),
      successCallback: response => {
        let userList = [];
        Object.keys(response.data._embedded).forEach(key => {
          if (Array.isArray(response.data._embedded[key])) {
            userList = userList.concat(response.data._embedded[key]);
          }
        });

        userList = userList.sort(function(a, b) {
          return a.id - b.id || a.name.localeCompare(b.name);
        });

        dispatch(
          fetchAllUserFulfilled(userList, response.data.page.totalPages)
        );
      },
      failureCallback: error => {
        dispatch(fetchAllUserError(error));
      }
    });
  };
};
