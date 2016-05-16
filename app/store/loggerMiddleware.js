import createLogger from 'redux-logger';
import { types } from '../actions';

const blackList = [
  'REDUX_STORAGE_SAVE',
  'API_CALL',
];

let currentColor = 0;
let currentFruit = 0;
const colors = ['#331919', '#2a2337', '#3e0b1f', '#1c2605', '#3b1b02'];
const fruits = ['🍆', '🍊', '🍒', '🍉', '🍌'];
const colorByUUID = {};
const fruitByUUID = {};

const title = action => {
  if (action.error) return 'red';
  if (action.meta && action.meta.uuid) {
    if (colorByUUID[action.meta.uuid]) return colorByUUID[action.meta.uuid];
    colorByUUID[action.meta.uuid] = colors[++currentColor % colors.length];
    return colorByUUID[action.meta.uuid];
  }
  if (action.type === 'SET_AUTH 👤') return 'blue';
  if (action.type === types.CLEAR_AUTH) return 'blue';

  return 'black';
};

const actionTransformer = action => {
  let symbol = '';
  let fruit = '';

  if (action.meta && action.meta.uuid) {
    if (fruitByUUID[action.meta.uuid]) {
      fruit = ` ${fruitByUUID[action.meta.uuid]}`;
    } else {
      fruitByUUID[action.meta.uuid] = fruits[++currentFruit % fruits.length];
      fruit = ` ${fruitByUUID[action.meta.uuid]}`;
    }
  }

  if (action.type === types.SET_AUTH) symbol = ' 👤';
  if (action.type.indexOf('_REQUEST') > -1) symbol = ' ❔';
  if (action.type.indexOf('_SUCCESS') > -1) symbol = ' ✅';
  if (action.type.indexOf('_FAILURE') > -1) symbol = ' ❌';

  return { ...action, type: `${action.type}${fruit}${symbol}` };
};

export const loggerMiddleware = createLogger({
  actionTransformer,
  colors: { title },
  collapsed: true,
  predicate: (getState, action) => blackList.indexOf(action.type) === -1,
});
