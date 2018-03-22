import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { onPageLoad } from 'meteor/server-render';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import routes from '../both/routes';
import mainReducer from '../../ui/redux/main-reducer';
import { CMS } from '../../api/cms/collection';
import { Tags } from '../../api/tags/collection';

onPageLoad((sink) => {
  const context = {};
  const cmsListInitial = CMS.find().fetch();
  const cmsInitial = CMS.findOne({ slug: sink.request.url.path.replace('/page/', '') });
  const tagsInitial = Tags.find().fetch();

  const store = createStore(
    mainReducer,
    {
      cmsListReducer: { isLoading: false, data: cmsListInitial },
      cmsReducer: { isLoading: false, data: cmsInitial },
      tagsReducer: { isLoading: false, data: tagsInitial },
    },
    applyMiddleware(thunk),
  );

  const App = props => (
    <Provider store={store}>
      <StaticRouter location={props.location} context={context}>
        {routes}
      </StaticRouter>
    </Provider>
  );

  App.propTypes = {
    location: PropTypes.object.isRequired,
  };

  const preloadedState = store.getState() || '';

  sink.renderIntoElementById('app', renderToNodeStream(<App location={sink.request.url} />));

  const helmet = Helmet.renderStatic();
  sink.appendToHead(helmet.meta.toString());
  sink.appendToHead(helmet.title.toString());

  sink.appendToBody(`
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>
  `);
});
