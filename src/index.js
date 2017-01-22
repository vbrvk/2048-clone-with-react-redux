/* eslint-disable jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from './reducers';
import App from './components/App';
import './index.css';

const getStoreFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('state'));
  } catch (e) {
    return false;
  }
};

const prevState = getStoreFromLocalStorage(); // TODO enable
let store;

if (prevState) {
  store = createStore(reducer, prevState, window.__REDUX_DEVTOOLS_EXTENSION__()); //eslint-disable-line
} else {
  store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__()); //eslint-disable-line
}

window.addEventListener('unload', () => {
  localStorage.setItem('state', JSON.stringify(store.getState()));
});

ReactDOM.render( // eslint-disable-next-line
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
