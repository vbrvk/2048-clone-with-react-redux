/* eslint-disable jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from './reducers';
import App from './components/App';
import './index.css';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__()); //eslint-disable-line

ReactDOM.render( // eslint-disable-next-line
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
