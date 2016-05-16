import { api } from '../constants/config';
import * as types from './types';

export const setAuth = payload => ({ type: types.SET_AUTH, payload });
export const clearAuth = () => ({ type: types.CLEAR_AUTH });
export const apiCallRequested = (type, payload, meta) => ({ type, payload, meta });
export const apiCallSucceeded = (type, payload, meta) => ({ type, payload, meta });
export const apiCallFailed = (type, payload, meta) => ({ type, payload, meta, error: true });
export const logout = () => ({ type: types.LOG_OUT });
export const refreshData = () => ({ type: types.REFRESH_DATA });
export const refreshUser = () => ({ type: types.REFRESH_USER });
export const refreshToken = () => ({ type: types.REFRESH_TOKEN });

export const callApi = (route, config, actions, meta = {}) => {
  if (!meta.uuid) meta.uuid = Math.floor(Math.random() * 100000); // eslint-disable-line
  if (!meta.attempt) meta.attempt = 1; // eslint-disable-line

  if (typeof actions === 'string') {
    actions = [`${actions}_REQUEST`, `${actions}_SUCCESS`, `${actions}_FAILURE`];
  }

  return {
    type: types.API_CALL,
    payload: { route, config, actions },
    meta,
  };
};

export const login = (email, password) => {
  const actions = types.LOGIN;
  const route = api.tokens;
  const config = {
    method: 'POST',
    body: { email, password },
    requiresAuth: false,
  };
  return callApi(route, config, actions);
};

export const signup = (email, password) => {
  const actions = types.SIGNUP;
  const route = api.users;
  const config = {
    method: 'POST',
    body: { email, password },
    requiresAuth: false,
  };
  return callApi(route, config, actions);
};

export const refreshTokenApi = token => {
  const actions = types.REFRESH_TOKEN;
  const route = api.tokens;
  const config = {
    method: 'PUT',
    body: { refreshToken: token },
    requiresAuth: false,
  };
  return callApi(route, config, actions);
};

export const getUser = userId => {
  const actions = types.GET_USER;
  const route = `${api.users}/${userId}`;
  const config = {
    method: 'GET',
    requiresAuth: true,
  };
  return callApi(route, config, actions);
};
