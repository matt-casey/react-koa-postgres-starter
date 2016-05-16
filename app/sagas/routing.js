import { fork, put, race, select, take } from 'redux-saga/effects';
import { push, LOCATION_CHANGE, CALL_HISTORY_METHOD } from 'react-router-redux';
import { types } from '../actions';
import {
  getLoggedIn,
  getAttemptedLocation,
  getCurrentLocation,
  getIsProtectedRoute,
} from '../selectors';

function* handleLocationChange() {
  while (true) { // eslint-disable-line
    const currentLocation = yield select(getCurrentLocation);
    const isLoggedIn = yield select(getLoggedIn);
    const isProtected = yield select(getIsProtectedRoute);

    if (isProtected && !isLoggedIn) {
      yield put(push({ pathname: '/login', state: { attemptedLocation: currentLocation } }));
    }

    yield race({
      location: take(LOCATION_CHANGE),
      history: take(CALL_HISTORY_METHOD),
    });
  }
}

function* handleSetAuth() {
  while (true) { // eslint-disable-line
    const authAction = yield take(types.SET_AUTH);
    const attemptedLocation = yield select(getAttemptedLocation);
    const nextRoute = authAction.isNewUser ? '/app/welcome' : '/app';
    yield put(push(attemptedLocation || nextRoute));
  }
}

function* handleClearAuth() {
  while (true) { // eslint-disable-line
    yield take(types.CLEAR_AUTH);
    yield put(push('/'));
  }
}

export function* routingSaga() {
  yield fork(handleLocationChange);
  yield fork(handleSetAuth);
  yield fork(handleClearAuth);
}

export const PRIVATE = {
  handleLocationChange,
  handleSetAuth,
  handleClearAuth,
  routingSaga,
};
