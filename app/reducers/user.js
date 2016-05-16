import { types } from '../actions';

export const initialState = {
  email: '',
  avatarUrl: null,
  createdAt: null,
  details: null,
  emailVerified: null,
  googleId: null,
  name: null,
  phoneNumber: null,

  error: null,
  loading: false,
};

export default function user(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case types.GET_USER_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case types.GET_USER_SUCCESS:
      return {
        avatarUrl: payload.avatarUrl,
        createdAt: payload.createdAt,
        details: payload.details,
        email: payload.email,
        emailVerified: payload.emailVerified,
        googleId: payload.googleId,
        name: payload.name,
        phoneNumber: payload.phoneNumber,
        error: null,
        loading: false,
      };

    case types.GET_USER_FAILURE:
      return {
        ...state,
        error: payload.message,
        loading: false,
      };

    case types.CLEAR_AUTH:
      return {
        ...initialState,
        email: state.email,
      };

    default:
      return state;
  }
}
