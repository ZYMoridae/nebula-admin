import ActionType from "../actions/ActionType";

let initState = {
  fetchAllUserPending: false,
  fetchAllUserFulfilled: false,
  totalPages: 1,
  users: []
};
const UserReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.USER.GET_ALL.PENDING:
      return Object.assign({}, state, {
        fetchAllUserFulfilled:
          action.fetchAllUserFulfilled,
        fetchAllUserPending: action.fetchAllUserPending
      });
    case ActionType.USER.GET_ALL.ERROR:
      return Object.assign({}, state, {
        fetchAllUserFulfilled:
          action.fetchAllUserFulfilled,
        fetchAllUserPending: action.fetchAllUserPending
      });
    case ActionType.USER.GET_ALL.FULFILLED:
      return Object.assign({}, state, {
        fetchAllUserFulfilled:
          action.fetchAllUserFulfilled,
        fetchAllUserPending: action.fetchAllUserPending,
        users: action.users,
        totalPages: action.totalPages
      });
    default:
      return state;
  }
};

export default UserReducer;
