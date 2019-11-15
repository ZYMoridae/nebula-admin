import ActionType from "../actions/ActionType";

let initState = {
  fetchAllUserPending: false,
  fetchAllUserFulfilled: false,
  totalPages: 1,
  users: [],
  // Below for user GET action
  user: null,
  fetchUserPending: false,
  fetchUserFulfilled: false
};
const UserReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.USER.GET_ALL.PENDING:
      return Object.assign({}, state, {
        fetchAllUserFulfilled: action.fetchAllUserFulfilled,
        fetchAllUserPending: action.fetchAllUserPending
      });
    case ActionType.USER.GET_ALL.ERROR:
      return Object.assign({}, state, {
        fetchAllUserFulfilled: action.fetchAllUserFulfilled,
        fetchAllUserPending: action.fetchAllUserPending
      });
    case ActionType.USER.GET_ALL.FULFILLED:
      return Object.assign({}, state, {
        fetchAllUserFulfilled: action.fetchAllUserFulfilled,
        fetchAllUserPending: action.fetchAllUserPending,
        users: action.users,
        totalPages: action.totalPages
      });
    // GET user action
    case ActionType.USER.GET.PENDING:
      return Object.assign({}, state, {
        fetchUserFulfilled: action.fetchUserFulfilled,
        fetchUserPending: action.fetchUserPending
      });
    case ActionType.USER.GET.ERROR:
      return Object.assign({}, state, {
        fetchUserFulfilled: action.fetchUserFulfilled,
        fetchUserPending: action.fetchUserPending
      });
    case ActionType.USER.GET.FULFILLED:
      return Object.assign({}, state, {
        fetchUserFulfilled: action.fetchUserFulfilled,
        fetchUserPending: action.fetchUserPending,
        user: action.user
      });
    default:
      return state;
  }
};

export default UserReducer;
