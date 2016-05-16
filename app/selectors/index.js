import { createSelector } from 'reselect';

// redux-storage
export const getLoaded = state => state.storage.loaded;

// redux-router
export const getRouting = state => state.routing;
export const getCurrentLocation = createSelector(
  getRouting,
  routing => routing.locationBeforeTransitions
);
export const getAttemptedLocation = createSelector(
  getCurrentLocation,
  location => (location.state ? location.state.attemptedLocation : false)
);
export const getIsProtectedRoute = createSelector(
  getCurrentLocation,
  location => (location.state ? location.state.requiresAuth : false)
);

// Auth
export const getAuth = state => state.auth;
export const getTokens = createSelector(
  getAuth,
  ({ token, refreshToken }) => ({ token, refreshToken })
);
export const getUserId = createSelector(getAuth, auth => auth.userId);
export const getAuthError = createSelector(getAuth, auth => auth.error);
export const getToken = createSelector(getTokens, tokens => tokens.token);
export const getRefreshToken = createSelector(getTokens, tokens => tokens.refreshToken);
export const getLoggedIn = createSelector(getToken, token => !!token);

// User
export const getUser = state => state.user;
export const getEmail = createSelector(getUser, user => user.email);
export const getUserError = createSelector(getUser, user => user.error);
