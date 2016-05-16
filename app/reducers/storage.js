import { LOAD } from 'redux-storage';

export default function reduxStorage(state = { loaded: false }, action) {
  switch (action.type) {
    case LOAD:
      return { ...state, loaded: true };
    default:
      return state;
  }
}
