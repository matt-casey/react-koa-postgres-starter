import { cancel, fork, put, select, take } from 'redux-saga/effects';
import { creators, types } from '../actions';
import { getUserId } from '../selectors';

function* userDataSaga() {
  while(true) { // eslint-disable-line
    const userId = yield select(getUserId);
    yield put(creators.getUser(userId));
    yield take(types.REFRESH_USER);
  }
}

export function* dataSaga() {
  yield take(types.REFRESH_TOKEN_SUCCESS);

  while(true) { // eslint-disable-line
    const userData = yield fork(userDataSaga);

    yield take(types.REFRESH_DATA);

    yield cancel(userData);
  }
}
