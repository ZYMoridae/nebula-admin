import { connect } from "react-redux";
import Edit from "../../components/user/Edit";
import { fetchUser } from "../../actions";

const mapStateToProps = state => {
  return {
    user: state.UserReducer.user,
    fetchUserPending: state.UserReducer.fetchUserPending,
    fetchUserFulfilled: state.UserReducer.fetchUserFulfilled
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    fetchUser: (id) => {
      dispatch(fetchUser(id));
    }
  };
};

const EditUserContainer = connect(mapStateToProps, mapDispatchToProps)(Edit);

export default EditUserContainer;
