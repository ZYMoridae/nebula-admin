import axios from 'axios';
// import configureStore from '../store/configureStore';
import _ from 'lodash';

// let { store } = configureStore();
// store.subscribe(updateHeaders);

let userId = '';
let accessToken = '';

// function updateHeaders() {
// 	let state = store.getState();
// 	let userInfo = state.UserReducer.info;
// 	if(userInfo) {
// 		userId = userInfo.id;
// 		accessToken = userInfo.access_token;
// 	}
// }

function callbackHandler(target, callback) {
	if(callback && typeof callback === 'function') {
		target.then(callback);
	}
	return target
}

class Zjax {
	static request({url, option, successCallback, failureCallback}) {
		if(!url || !option) {
			return
		}
		let default_option = {
			// headers: {
			// 	'X-USER-ID': userId,
			// 	'X-USER-ACCESS-TOKEN': accessToken
			// },
			responseType: 'json',
			url: url
		};
		let _axios = axios(Object.assign({}, option, default_option));
		if(successCallback) {
			if(typeof successCallback === 'function') {
				callbackHandler(_axios, successCallback);
			}else if (_.isArray(successCallback)) {
				_.reduce(successCallback, (prev, callback) => {
					return callbackHandler(_axios, callback)
				});
			}
		}
		if(failureCallback && typeof failureCallback === 'function') {
			// Handle 401 error
			
			_axios.catch((error) => {

				if(error.response.status == 401 || error.response.status == 403) {
					sessionStorage.removeItem('token');
					location.href = '/login';
				}
			});
			_axios.catch(failureCallback);
		}
		return _axios
	}
}

export default Zjax;