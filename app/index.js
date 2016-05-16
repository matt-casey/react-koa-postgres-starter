import 'react-hot-loader/patch';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './App';
import { startStore, store } from './store';
import './scss/index.scss';

const history = syncHistoryWithStore(browserHistory, store);
const rootElement = document.getElementById('app');

render(
  <AppContainer>
    <App store={store} history={history} />
  </AppContainer>,
  rootElement
);

startStore().catch(err => { throw err; });

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(
      <AppContainer>
        <NextApp store={store} history={history} />
      </AppContainer>,
      rootElement
    );
  });
}
