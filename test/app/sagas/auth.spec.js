import chai from 'chai';
import proxyquire from 'proxyquire';
import { delay } from 'redux-saga';
import { put, cancel, fork, take, call, select, race } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/utils';
import { dataSaga } from '../../../app/sagas/data';
import { getToken, getRefreshToken, getLoggedIn } from '../../../app/selectors';
import { creators, types } from '../../../app/actions';

const VALID_TOKEN = 'VALID_TOKEN';
const EXPIRED_TOKEN = 'EXPIRED_TOKEN';
const getExpiration = token => (token === EXPIRED_TOKEN ? -500 : 500);
const decode = token => token === VALID_TOKEN || token === EXPIRED_TOKEN;
const { PRIVATE } = proxyquire('../../../app/sagas/auth', {
  '../util/jwt': {
    decode,
    getExpiration,
  },
});

const {
  refreshTokenSaga,
  loggedOutSaga,
  loggedInSaga,
  authSaga,
} = PRIVATE;

chai.should();

describe('auth saga', () => {
  describe('starting the auth saga', () => {
    const generator = authSaga();

    it('should check if the user is logged in', () => {
      generator.next().value.should.deep.equal(select(getLoggedIn));
    });

    it('if the user is logged in, it should start the logged in saga', () => {
      generator.next(true).value.should.deep.equal(call(loggedInSaga));
    });

    it('should check if the user is logged in again', () => {
      generator.next().value.should.deep.equal(select(getLoggedIn));
    });

    it('if the user is logged out, it should start the logged out saga', () => {
      generator.next(false).value.should.deep.equal(call(loggedOutSaga));
    });
  });

  describe('refresh token saga', () => {
    const generator = refreshTokenSaga();

    it('should check the current refresh token', () => {
      generator.next().value.should.deep.equal(select(getRefreshToken));
    });

    it('should refresh the token', () => {
      const testRefreshToken = 'fooBar123';
      const output = generator.next(testRefreshToken).value;
      const expectedOutput = [
        take(types.REFRESH_TOKEN_SUCCESS),
        put(creators.refreshTokenApi(testRefreshToken)),
      ];
      delete expectedOutput[1].PUT.action.meta.uuid;
      delete output[1].PUT.action.meta.uuid;
      output.should.deep.equal(expectedOutput);
    });

    it('should get the value of the new token', () => {
      generator.next().value.should.deep.equal(select(getToken));
    });

    it('should wait for a refresh token action or for the expiration of the current token', () => {
      const expiresIn = getExpiration(VALID_TOKEN);
      const raceCondition = {
        request: take(types.REFRESH_TOKEN),
        delay: call(delay, expiresIn),
      };
      generator.next(VALID_TOKEN).value.should.deep.equal(race(raceCondition));
    });

    it('should get the current refresh token', () => {
      generator.next().value.should.deep.equal(select(getRefreshToken));
    });

    it('should refresh the token again if the current refreshToken is valid', () => {
      const testRefreshToken = 'fooBar123';
      const output = generator.next(testRefreshToken).value;
      const expectedOutput = [
        take(types.REFRESH_TOKEN_SUCCESS),
        put(creators.refreshTokenApi(testRefreshToken)),
      ];
      delete expectedOutput[1].PUT.action.meta.uuid;
      delete output[1].PUT.action.meta.uuid;
      output.should.deep.equal(expectedOutput);
    });
  });

  describe('logged out saga', () => {
    describe('handling login action', () => {
      const generator = loggedOutSaga();

      it('should watch for either a log in or sign up action', () => {
        const raceCondition = {
          loginAction: take('LOGIN_SUCCESS'),
          signupAction: take('SIGNUP_SUCCESS'),
        };
        generator.next().value.should.deep.equal(race(raceCondition));
      });

      it('should dispatch an action with the auth information', () => {
        const raceResult = { loginAction: { payload: { authInfo: 'authInfo' } } };
        const expectedPayload = { authInfo: 'authInfo', isNewUser: false };
        generator.next(raceResult).value.should.deep.equal(put(creators.setAuth(expectedPayload)));
      });

      it('should be done', () => {
        generator.next().done.should.equal(true);
      });
    });

    describe('handling signup action', () => {
      const generator = loggedOutSaga();

      it('should watch for either a log in or sign up action', () => {
        const raceCondition = {
          loginAction: take('LOGIN_SUCCESS'),
          signupAction: take('SIGNUP_SUCCESS'),
        };
        generator.next().value.should.deep.equal(race(raceCondition));
      });

      it('should dispatch an action with the auth information', () => {
        const raceResult = { signupAction: { payload: { authInfo: 'authInfo' } } };
        const expectedPayload = { authInfo: 'authInfo', isNewUser: true };
        generator.next(raceResult).value.should.deep.equal(put(creators.setAuth(expectedPayload)));
      });

      it('should be done', () => {
        generator.next().done.should.equal(true);
      });
    });
  });

  describe('logged in saga', () => {
    const generator = loggedInSaga();
    const dataSagaInstance = createMockTask();
    const refreshTokenSagaInstance = createMockTask();

    it('should start a saga for getting the user\'s data', () => {
      generator.next().value.should.deep.equal(fork(dataSaga));
    });

    it('should start a saga to keep the user\'s token refreshed', () => {
      generator.next(dataSagaInstance).value.should.deep.equal(fork(refreshTokenSaga));
    });

    it('should watch for either a log out or bad token refresh action', () => {
      const raceCondition = {
        manualLogOut: take('LOG_OUT'),
        unableToRefresh: take('REFRESH_TOKEN_FAILURE'),
      };
      generator.next(refreshTokenSagaInstance).value.should.deep.equal(race(raceCondition));
    });

    it('should cancel the data and the refresh token sagas', () => {
      generator.next().value.should.deep.equal(cancel(dataSagaInstance));
      generator.next().value.should.deep.equal(cancel(refreshTokenSagaInstance));
    });

    it('should dispatch a clear auth action', () => {
      generator.next().value.should.deep.equal(put(creators.clearAuth()));
    });

    it('should be done', () => {
      generator.next().done.should.equal(true);
    });
  });
});
