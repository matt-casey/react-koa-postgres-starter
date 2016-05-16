import Base from '../base-model';
import bookshelf from '../../db/bookshelf';
import { authenticate, create } from './model-methods';
import {
  addRefreshToken, createToken, checkPassword, getTokens, tokenTypes,
   refreshTokenFn, getPasswordResetToken, update, changePassword,
} from './instance-methods';


const UserDefinition = Base.extend({
  tableName: 'users',

  refreshToken() {
    return this.hasOne('RefreshToken');
  },

  addRefreshToken,
  createToken,
  checkPassword,
  getTokens,
  tokenTypes,
  refreshTokenFn,
  getPasswordResetToken,
  update,
  changePassword,
}, {
  authenticate,
  create,
});

const UserModel = bookshelf.model('User', UserDefinition);

const authenticateUser = (...args) => UserModel.authenticate(...args);
// User.create NOT inherited from base-model
const createUser = (...args) => UserModel.create(...args);
const findUser = (...args) => UserModel.findOne(...args);

export {
  UserModel as default,
  authenticateUser,
  createUser,
  findUser,
};
