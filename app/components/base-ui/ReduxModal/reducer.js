import { LOCATION_CHANGE, CALL_HISTORY_METHOD } from 'react-router-redux';
import { SHOW, CLOSE } from './actions';

export const initialState = {
  isShowing: false,
  counter: 0,
  name: null,
  props: null,
};

export default function modal(state = initialState, action) {
  switch (action.type) {
    case SHOW:
      return {
        ...state,
        isShowing: true,
        counter: state.counter + 1,
        name: action.payload.name,
        props: action.payload.props,
      };
    case LOCATION_CHANGE:
    case CALL_HISTORY_METHOD:
    case CLOSE:
      return {
        ...state,
        isShowing: false,
      };
    default:
      return state;
  }
}
