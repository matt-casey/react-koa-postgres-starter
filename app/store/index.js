import { compose, createStore, applyMiddleware } from 'redux';
import { storage, engine, storageMiddleware } from './storageMiddleware';
import { sagaMiddleware, runSagaMiddleware } from './sagaMiddleware';
import { loggerMiddleware } from './loggerMiddleware';
import { routerMiddleware } from './routerMiddleware';
import rootReducer from '../reducers';

const reduxDevTools = window.devToolsExtension ? window.devToolsExtension() : f => f;

const middlewares = [routerMiddleware, sagaMiddleware, storageMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(loggerMiddleware);
}

const store = createStore(
  storage.reducer(rootReducer),
  compose(
    applyMiddleware(...middlewares),
    reduxDevTools,
  )
);

const startStore = () => {
  const load = storage.createLoader(engine);
  runSagaMiddleware();
  return load(store);
};

export {
  store,
  startStore,
};
