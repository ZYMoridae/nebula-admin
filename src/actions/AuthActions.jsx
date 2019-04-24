import Zjax from '../utils/zjax';
import ActionType from './ActionType';

// var zjax = new Zjax();

// -------- User Actions ----------
export const receieveAuth = (json) => {
  return {
    type: ActionType.AUTH_SUCCESS,
    isFetchingAuth: false,
    isFetchedAuth: true,
    isShowLoginError: false,
    info: json,
    receivedAt: Date.now()
  }
}

export const fetchingAuth = (option, json) => {
  return {
    type: ActionType.AUTH_PENDING,
    option: option,
    isFetchingAuth: true,
    isFetchedAuth: false,
    isShowLoginError: false
  }
}

export const fetchingAuthError = (err) => {
  return {
    type: ActionType.AUTH_FAIL,
    isFetchingAuth: false,
    isFetchedAuth: true,
    isShowLoginError: true
  }
}

export const hideLoginError = () => {
  return {
    type: ActionType.HIDE_ERROR,
    isShowLoginError: false
  }
}

export const fetchAuthInfo = (data) => {
  return function (dispatch) {
    dispatch(fetchingAuth());
    var headers = {};
    if(data.headers) {
      headers = data.headers;
    }
    delete data.headers;
    Zjax.request({
      url: '/api/auth/signin',
      option: {
        method: 'post',
        data: data,
        headers: headers
      },
      successCallback: (response) => {
        console.log(response);
        // Set auth token
        sessionStorage.setItem('user', response.data);
        localStorage.setItem('token', response.data.token);
        dispatch(receieveAuth(response.data));
      },
      failureCallback: (error) => {
        dispatch(fetchingAuthError(error));
      }
    });
  }
}