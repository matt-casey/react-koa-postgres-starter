import chai from 'chai';
import { put, fork, take, race, select } from 'redux-saga/effects';
import { push, LOCATION_CHANGE, CALL_HISTORY_METHOD } from 'react-router-redux';
import { PRIVATE } from '../../../app/sagas/routing';
import { types } from '../../../app/actions';
import { getLoggedIn, getAttemptedLocation, getCurrentLocation, getIsProtectedRoute } from '../../../app/selectors';

const {
  handleLocationChange,
  handleSetAuth,
  handleClearAuth,
  routingSaga,
} = PRIVATE;

chai.should();

describe('routing saga:', () => {
  describe('starting the routing saga', () => {
    const generator = routingSaga();

    it('should handle changes in the location', () => {
      generator.next().value.should.deep.equal(fork(handleLocationChange));
    });
  });

  describe('visiting a non-protected route', () => {
    const generator = handleLocationChange();

    it('should select the current location from state', () => {
      generator.next().value.should.deep.equal(select(getCurrentLocation));
    });

    it('should check if the user is logged in', () => {
      generator.next('/foo').value.should.deep.equal(select(getLoggedIn));
    });

    it('should check if the current route requiresAuth', () => {
      generator.next(true).value.should.deep.equal(select(getIsProtectedRoute));
    });

    it('should watch for the route to change again', () => {
      const raceCondition = {
        history: take(CALL_HISTORY_METHOD),
        location: take(LOCATION_CHANGE),
      };
      generator.next(false).value.should.deep.equal(race(raceCondition));
    });
  });

  describe('visiting protected route while logged in', () => {
    const generator = handleLocationChange();

    it('should select the current location from state', () => {
      generator.next().value.should.deep.equal(select(getCurrentLocation));
    });

    it('should check if the user is logged in', () => {
      generator.next('/foo').value.should.deep.equal(select(getLoggedIn));
    });

    it('should check if the current route requiresAuth', () => {
      generator.next(true).value.should.deep.equal(select(getIsProtectedRoute));
    });

    it('should watch for the route to change again', () => {
      const raceCondition = {
        history: take(CALL_HISTORY_METHOD),
        location: take(LOCATION_CHANGE),
      };
      generator.next(true).value.should.deep.equal(race(raceCondition));
    });
  });

  describe('visiting protected route while logged out', () => {
    const generator = handleLocationChange();

    it('should select the current location from state', () => {
      generator.next().value.should.deep.equal(select(getCurrentLocation));
    });

    it('should check if the user is logged in', () => {
      generator.next('/protected-route').value.should.deep.equal(select(getLoggedIn));
    });

    it('should check if the current route requiresAuth', () => {
      generator.next(false).value.should.deep.equal(select(getIsProtectedRoute));
    });

    it('should redirect to the login page, with attempted route in location state', () => {
      const loginLocation = {
        pathname: '/login',
        state: { attemptedLocation: '/protected-route' },
      };
      generator.next(true).value.should.deep.equal(put(push(loginLocation)));
    });

    it('should watch for the route to change again', () => {
      const raceCondition = {
        history: take(CALL_HISTORY_METHOD),
        location: take(LOCATION_CHANGE),
      };
      generator.next().value.should.deep.equal(race(raceCondition));
    });
  });

  describe('rerouting on user log out', () => {
    const generator = handleClearAuth();

    it('should listen for a clear auth event', () => {
      generator.next().value.should.deep.equal(take(types.CLEAR_AUTH));
    });

    it('should redirect to the index route', () => {
      generator.next().value.should.deep.equal(put(push('/')));
    });

    it('should listen for another clear auth event', () => {
      generator.next().value.should.deep.equal(take(types.CLEAR_AUTH));
    });
  });

  describe('rerouting on user log in', () => {
    const generator = handleSetAuth();

    it('should listen for auth to be set', () => {
      generator.next().value.should.deep.equal(take(types.SET_AUTH));
    });

    it('should check the current location for an attempted location in state', () => {
      generator.next({ isNewUser: false }).value.should.deep.equal(select(getAttemptedLocation));
    });

    it('should redirect the user to the main app page', () => {
      const attemptedLocation = undefined;
      generator.next(attemptedLocation).value.should.deep.equal(put(push('/app')));
    });

    it('should listen for another auth event', () => {
      generator.next().value.should.deep.equal(take(types.SET_AUTH));
    });
  });

  describe('rerouting on user log in with a previously attemptedLocation', () => {
    const generator = handleSetAuth();

    it('should listen for auth to be set', () => {
      generator.next().value.should.deep.equal(take(types.SET_AUTH));
    });

    it('should check the current location for an attempted location in state', () => {
      generator.next({ isNewUser: false }).value.should.deep.equal(select(getAttemptedLocation));
    });

    it('should redirect the user to their previously attemptedLocation', () => {
      const attemptedLocation = '/foo';
      generator.next(attemptedLocation).value.should.deep.equal(put(push('/foo')));
    });

    it('should listen for another auth event', () => {
      generator.next().value.should.deep.equal(take(types.SET_AUTH));
    });
  });

  describe('rerouting on user sign up', () => {
    const generator = handleSetAuth();

    it('should listen for auth to be set', () => {
      generator.next().value.should.deep.equal(take(types.SET_AUTH));
    });

    it('should check the current location for an attempted location in state', () => {
      generator.next({ isNewUser: true }).value.should.deep.equal(select(getAttemptedLocation));
    });

    it('should redirect the user to the main app page', () => {
      const attemptedLocation = undefined;
      generator.next(attemptedLocation).value.should.deep.equal(put(push('/app/welcome')));
    });

    it('should listen for another auth event', () => {
      generator.next().value.should.deep.equal(take(types.SET_AUTH));
    });
  });
});
