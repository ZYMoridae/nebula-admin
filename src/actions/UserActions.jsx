import Zjax from "../utils/zjax";
import Utils from "../utils/Utils";
import ActionType from "./ActionType";

// ANCHOR Fetch all users by pagination

export const fetchAllUserFulfilled = (results, totalPages) => {
  return {
    type: ActionType.USER.GET_ALL.FULFILLED,
    fetchAllUserPending: false,
    fetchAllUserFulfilled: true,
    users: results,
    totalPages: totalPages,
    receivedAt: Date.now()
  };
};

export const fetchAllUserPending = () => {
  return {
    type: ActionType.USER.GET_ALL.PENDING,
    fetchAllUserPending: true,
    fetchAllUserFulfilled: false
  };
};

export const fetchAllUserError = error => {
  return {
    type: ActionType.USER.GET_ALL.ERROR,
    fetchAllUserPending: false,
    fetchAllUserFulfilled: true,
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

// ANCHOR Fetch user based on id

export const fetchUserFulfilled = user => {
  return {
    type: ActionType.USER.GET.FULFILLED,
    fetchUserPending: false,
    fetchUserFulfilled: true,
    user: user
  };
};

export const fetchUserPending = () => {
  return {
    type: ActionType.USER.GET.PENDING,
    fetchUserPending: true,
    fetchUserFulfilled: false
  };
};

export const fetchUserError = error => {
  return {
    type: ActionType.USER.GET.ERROR,
    fetchUserPending: false,
    fetchUserFulfilled: true,
    error: error
  };
};

export const fetchUser = id => {
  return function(dispatch) {
    dispatch(fetchUserPending());

    let options = {
      method: "get"
    };

    Zjax.request({
      url: `/api/users/${id}`,
      option: Utils.addToken(options),
      successCallback: response => {
        dispatch(fetchUserFulfilled(response.data));
      },
      failureCallback: error => {
        dispatch(fetchUserError(error));
      }
    });
  };
};
