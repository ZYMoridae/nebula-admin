import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function checkToken() {
    let token = sessionStorage.getItem('token');
    if(token == null && token == undefined) {
      sessionStorage.removeItem('user');
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    checkToken();
    return (
        <Route {...rest} render={props => (
            (sessionStorage.getItem('token') != undefined && sessionStorage.getItem('token') != 'null' && sessionStorage.getItem('token') != 'undefined')
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login' }} />
        )} />
    )
}

export default PrivateRoute;