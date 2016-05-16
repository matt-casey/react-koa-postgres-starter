import { put, take, race, call, select } from 'redux-saga/effects';
import * as selectors from '../selectors';
import { creators, types } from '../actions';
import { fetchApi } from '../util/api';

const { apiCallRequested, apiCallSucceeded, apiCallFailed } = creators;

function* handleUnauthorized({ route, config, actions }, meta) {
  yield put(creators.refreshToken());
  const { success } = yield race({
    success: take(types.REFRESH_TOKEN_SUCCESS),
    failure: take(types.REFRESH_TOKEN_FAILURE),
  });
  if (success) {
    const attempt = meta.attempt + 1;
    yield put(creators.callApi(route, config, actions, { ...meta, attempt }));
  }
}

function* handleAuth(config) {
  if (config.requiresAuth) {
    const token = yield select(selectors.getToken);
    const Authorization = `Bearer ${token}`;
    config.headers = { ...config.headers, Authorization }; // eslint-disable-line
  }
}

export function* apiSaga({ payload, meta }) {
  const { route, config, actions } = payload;
  const [requestAction, successAction, failureAction] = actions;

  try {
    yield call(handleAuth, config);
    yield put(apiCallRequested(requestAction, { route, config }, meta));
    const response = yield call(fetchApi, route, config);
    yield put(apiCallSucceeded(successAction, response, meta));
  } catch (error) {
    if (error.status === 401 && meta.attempt === 1) {
      yield call(handleUnauthorized, payload, meta);
    } else {
      yield put(apiCallFailed(failureAction, error, meta));
    }
  }
}

export const PRIVATE = {
  handleUnauthorized,
  handleAuth,
};
