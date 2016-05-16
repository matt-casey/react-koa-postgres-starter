import chai from 'chai';
import { call, put, fork, take, race, select } from 'redux-saga/effects';
import { apiSaga, PRIVATE } from '../../../app/sagas/api';
import { creators, types } from '../../../app/actions';
import { fetchApi } from '../../../app/util/api';
import {} from '../../../app/selectors';

const {
  handleUnauthorized,
  handleAuth,
} = PRIVATE;

chai.should();

describe('api saga:', () => {
  describe('successful api call', () => {
    const apiAction = {
      payload: {
        route: '/foo',
        config: { requiresAuth: true },
        actions: ['request', 'success', 'failure'],
      },
      meta: {
        attempt: 1,
      },
    };
    const generator = apiSaga(apiAction);

    it('should handle authentication', () => {
      generator.next().value.should.deep.equal(call(handleAuth, apiAction.payload.config));
    });

    it('should dispatch a request starting action', () => {
      const requestAction = creators.apiCallRequested(
        apiAction.payload.actions[0],
        { route: apiAction.payload.route, config: apiAction.payload.config },
        apiAction.meta,
      );
      generator.next().value.should.deep.equal(put(requestAction));
    });

    it('should fetch the resource', () => {
      const apiCallAction = call(
        fetchApi,
        apiAction.payload.route,
        apiAction.payload.config,
      );
      generator.next().value.should.deep.equal(apiCallAction);
    });

    it('should dispatch a request success action', () => {
      const apiResponse = { foo: 'bar' };
      const requestAction = creators.apiCallRequested(
        apiAction.payload.actions[1],
        apiResponse,
        apiAction.meta,
      );
      generator.next(apiResponse).value.should.deep.equal(put(requestAction));
    });
  });

  describe('failed api call', () => {
    const apiAction = {
      payload: {
        route: '/foo',
        config: { requiresAuth: true },
        actions: ['request', 'success', 'failure'],
      },
      meta: {
        attempt: 1,
      },
    };
    const generator = apiSaga(apiAction);

    it('should handle authentication', () => {
      generator.next().value.should.deep.equal(call(handleAuth, apiAction.payload.config));
    });

    it('should dispatch a request starting action', () => {
      const requestAction = creators.apiCallRequested(
        apiAction.payload.actions[0],
        { route: apiAction.payload.route, config: apiAction.payload.config },
        apiAction.meta,
      );
      generator.next().value.should.deep.equal(put(requestAction));
    });

    it('should fetch the resource', () => {
      const apiCallAction = call(
        fetchApi,
        apiAction.payload.route,
        apiAction.payload.config,
      );
      generator.next().value.should.deep.equal(apiCallAction);
    });

    it('should dispatch a request success action', () => {
      const apiResponse = { message: 'foo happened' };
      const requestAction = creators.apiCallFailed(
        apiAction.payload.actions[2],
        apiResponse,
        apiAction.meta,
      );
      generator.throw(apiResponse).value.should.deep.equal(put(requestAction));
    });
  });

  describe('unauthorized api call', () => {
    const apiAction = {
      payload: {
        route: '/foo',
        config: { requiresAuth: true },
        actions: ['request', 'success', 'failure'],
      },
      meta: {
        attempt: 1,
      },
    };
    const generator = apiSaga(apiAction);

    it('should handle authentication', () => {
      generator.next().value.should.deep.equal(call(handleAuth, apiAction.payload.config));
    });

    it('should dispatch a request starting action', () => {
      const requestAction = creators.apiCallRequested(
        apiAction.payload.actions[0],
        { route: apiAction.payload.route, config: apiAction.payload.config },
        apiAction.meta,
      );
      generator.next().value.should.deep.equal(put(requestAction));
    });

    it('should fetch the resource', () => {
      const apiCallAction = call(
        fetchApi,
        apiAction.payload.route,
        apiAction.payload.config,
      );
      generator.next().value.should.deep.equal(apiCallAction);
    });

    it('should dispatch a request success action', () => {
      const apiResponse = { status: 401 };
      const startUnauthorizedHandler = call(handleUnauthorized, apiAction.payload, apiAction.meta);
      generator.throw(apiResponse).value.should.deep.equal(startUnauthorizedHandler);
    });
  });
});
