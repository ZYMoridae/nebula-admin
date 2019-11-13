import { connect } from "react-redux";
import Index from "../../components/user/Index";
import { fetchAllUser } from "../../actions";

const mapStateToProps = state => {
  return {
    users: state.UserReducer.users,
    fetchAllUserPending: state.UserReducer.fetchAllUserPending,
    fetchAllUserFulfilled: state.UserReducer.fetchAllUserFulfilled,
    totalPages: state.UserReducer.totalPages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    fetchAllUser: (page, perPage, orderBy) => {
      dispatch(fetchAllUser(page, perPage, orderBy));
    }
  };
};

const UserContainer = connect(mapStateToProps, mapDispatchToProps)(Index);

export default UserContainer;
