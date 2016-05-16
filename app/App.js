import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from './routes';

const App = ({ store, history }) => (
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
);

App.propTypes = {
  store: React.PropTypes.object.isRequired,
  history: React.PropTypes.object.isRequired,
};

export default App;
