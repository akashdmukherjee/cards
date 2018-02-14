import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { onPageLoad } from 'meteor/server-render';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import routes from '../both/routes';
import mainReducer from '../../api/redux/reducers';
import { receiveLogin } from '../../api/redux/actions';

const preloadedState = window.__PRELOADED_STATE__; // eslint-disable-line
delete window.__PRELOADED_STATE__; // eslint-disable-line

const store = createStore(
  mainReducer,
  { loginReducer: { isLogging: false, data: {} } },
  applyMiddleware(thunk),
);

Tracker.autorun(() => {
  if (Meteor.loggingIn()) {
    store.dispatch(receiveLogin({ isLogging: true, data: {} }));
  }
});

Tracker.autorun(() => {
  if (Meteor.user()) {
    store.dispatch(receiveLogin({ isLogging: false, data: Meteor.user() }));
  }
});

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        {routes}
      </Switch>
    </BrowserRouter>
  </Provider>
);

onPageLoad(() => {
  ReactDOM.hydrate(<App />, document.getElementById('app'));
});
