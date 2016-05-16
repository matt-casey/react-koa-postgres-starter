import { types } from '../actions';

export const initialState = {
  userId: null,
  token: null,
  refreshToken: null,
  isNewUser: false,
  error: null,
};

export default function auth(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case types.LOGIN_FAILURE:
    case types.SIGNUP_FAILURE:
      return {
        ...state,
        error: payload.message,
      };

    case types.REFRESH_TOKEN_SUCCESS:
    case types.SET_AUTH:
      return {
        userId: payload.userId,
        token: payload.token,
        refreshToken: payload.refreshToken,
        isNewUser: payload.isNewUser,
        error: null,
      };

    case types.CLEAR_AUTH:
      return initialState;

    default:
      return state;
  }
}
