import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import reducer from './reducers';

import App from './components/App';
import Game from './components/Game/';
import GameList from './components/GameList/';
import Settings from './components/Settings/';

import './index.css';

const getStoreFromLocalStorage = () => {
  try {
    return false && JSON.parse(localStorage.getItem('state'));
  } catch (e) {
    return false;
  }
};

const getReduxDevelopTools = (process.env.NODE_ENV === 'production' ? null : (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));//eslint-disable-line

const prevState = getStoreFromLocalStorage();
let store;

if (prevState && prevState.version === process.env.REACT_APP_VERSION) {
  store = getReduxDevelopTools ?
          createStore(reducer, prevState, getReduxDevelopTools) :
          createStore(reducer, prevState);
} else {
  store = getReduxDevelopTools ?
          createStore(reducer, getReduxDevelopTools) :
          createStore(reducer);
}

window.addEventListener('unload', () => {
  localStorage.setItem('state', JSON.stringify(store.getState()));
});


ReactDOM.render( // eslint-disable-next-line
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Game} />
        <Route path="/saved" component={GameList} />
        <Route path="/settings" component={Settings} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
