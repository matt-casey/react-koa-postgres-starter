import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import filter from 'redux-storage-decorator-filter';
import { LOCATION_CHANGE, CALL_HISTORY_METHOD } from 'react-router-redux';

const whiteListedActions = undefined;
const blackListedActions = [
  'API_CALL',
  LOCATION_CHANGE,
  CALL_HISTORY_METHOD,
];
const whiteListedStores = undefined;
const blackListedStores = [
  'routing',
  'modal',
];

const engine = filter(createEngine('starterpack'), whiteListedStores, blackListedStores);
const storageMiddleware = storage.createMiddleware(engine, blackListedActions, whiteListedActions);

export { storage, engine, storageMiddleware };
