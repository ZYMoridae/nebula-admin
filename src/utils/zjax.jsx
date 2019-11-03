import axios from 'axios';
import _ from 'lodash';
import Routes from './Routes';

function callbackHandler(target, callback) {
	if (callback && typeof callback === 'function') {
		target.then(callback);
	}
	return target
}

class Zjax {
	static request({ url, option, successCallback, failureCallback }) {
		if (!url || !option) {
			return
		}
		let default_option = {
			responseType: 'json',
			url: url
		};
		let _axios = axios(Object.assign({}, option, default_option));
		if (successCallback) {
			if (typeof successCallback === 'function') {
				callbackHandler(_axios, successCallback);
			} else if (_.isArray(successCallback)) {
				_.reduce(successCallback, (prev, callback) => {
					return callbackHandler(_axios, callback)
				});
			}
		}
		if (failureCallback && typeof failureCallback === 'function') {
			_axios.catch((error) => {
				console.log(error);
				switch (error.response.status) {
					case 401:
					case 504:
						sessionStorage.removeItem('token');
						break;
					case 403:
						{
							sessionStorage.removeItem('token');
							location.href = Routes.USER.LOGIN;
							break;
						}
					default:
						break;
				}
			});
			_axios.catch(failureCallback);
		}
		return _axios
	}
}

export default Zjax;