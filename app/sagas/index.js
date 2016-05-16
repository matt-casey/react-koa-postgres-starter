import { takeEvery } from 'redux-saga';
import { fork, take } from 'redux-saga/effects';
import { LOAD } from 'redux-storage';

import * as types from '../actions/types';
import * as auth from './auth';
import * as api from './api';
import * as routing from './routing';

export function* rootSaga() {
  yield take(LOAD);
  yield [
    fork(routing.routingSaga),
    fork(takeEvery, types.API_CALL, api.apiSaga),
    fork(auth.authSaga),
  ];
}
