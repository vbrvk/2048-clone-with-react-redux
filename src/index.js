import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import reducer from './reducers';

import App from './components/App';
import Game from './components/Game/';
import GameList from './components/GameList/';

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

if (prevState) {
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

const rootPath = process.env.NODE_ENV === 'production' ? '/2048-clone-with-react-redux' : '/';

ReactDOM.render( // eslint-disable-next-line
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path={rootPath} component={App}>
        <IndexRoute component={Game} />
        <Route path="saved" component={GameList} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
