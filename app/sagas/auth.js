import { delay } from 'redux-saga';
import { cancel, call, fork, put, race, select, take } from 'redux-saga/effects';
import { creators, types } from '../actions';
import { getExpiration } from '../util/jwt';
import { getToken, getRefreshToken, getLoggedIn } from '../selectors';
import * as data from './data';

function* refreshTokenSaga() {
  let refreshToken = yield select(getRefreshToken);

  while (refreshToken) {
    // Refresh token and wait for success
    yield [
      take(types.REFRESH_TOKEN_SUCCESS),
      put(creators.refreshTokenApi(refreshToken)),
    ];
    // Get new token and check for expiration
    const token = yield select(getToken);
    const expiresIn = getExpiration(token);
    // Wait for expiration or refresh action
    yield race({
      request: take(types.REFRESH_TOKEN),
      delay: call(delay, expiresIn),
    });
    // Get the current refreshToken (it could have been removed/changed in other saga)
    refreshToken = yield select(getRefreshToken);
  }
}

function* loggedOutSaga() {
  const { signupAction, loginAction } = yield race({
    signupAction: take(types.SIGNUP_SUCCESS),
    loginAction: take(types.LOGIN_SUCCESS),
  });

  const payload = signupAction
    ? { ...signupAction.payload, isNewUser: true }
    : { ...loginAction.payload, isNewUser: false };

  yield put(creators.setAuth(payload));
}

function* loggedInSaga() {
  const dataSaga = yield fork(data.dataSaga);
  const tokenSaga = yield fork(refreshTokenSaga);

  yield race({
    manualLogOut: take(types.LOG_OUT),
    unableToRefresh: take(types.REFRESH_TOKEN_FAILURE),
  });

  yield cancel(dataSaga);
  yield cancel(tokenSaga);
  yield put(creators.clearAuth());
}

export function* authSaga() {
  while (true) { // eslint-disable-line
    if (yield select(getLoggedIn)) {
      yield call(loggedInSaga);
    } else {
      yield call(loggedOutSaga);
    }
  }
}

export const PRIVATE = {
  refreshTokenSaga,
  loggedOutSaga,
  loggedInSaga,
  authSaga,
};
