// index.js

import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';

const adminApp = combineReducers({
  LoginReducer
})

export default adminApp