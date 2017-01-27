/* eslint-disable jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import reducer from './reducers';

import App from './components/App';
import Game from './components/Game/';

import './index.css';

const getStoreFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('state'));
  } catch (e) {
    return false;
  }
};

const getReduxDevelopTools = () => (process.env.NODE_ENV === 'production' ? null : (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));//eslint-disable-line

const prevState = getStoreFromLocalStorage();
let store;

if (prevState) {
  store = createStore(reducer, prevState, getReduxDevelopTools());
} else {
  store = createStore(reducer, getReduxDevelopTools());
}

window.addEventListener('unload', () => {
  localStorage.setItem('state', JSON.stringify(store.getState()));
});

ReactDOM.render( // eslint-disable-next-line
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Game} />
        <Route path="saved" component={null} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
