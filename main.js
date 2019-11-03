import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './src/components/App';

import './i18n';

import configureStore from './src/store/configureStore';

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)