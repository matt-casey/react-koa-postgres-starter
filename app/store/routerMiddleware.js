import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

const middleware = routerMiddleware(browserHistory);

export {
  middleware as routerMiddleware,
};
