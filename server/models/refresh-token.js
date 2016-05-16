import Base from './base-model';
import bookshelf from '../db/bookshelf';
import jwt from '../lib/jwt';

const addRefreshToken = async (model) => {
  const token = await jwt.createRefreshToken();
  model.set({ token });
};

const RefreshTokenDefinition = Base.extend({
  tableName: 'refresh_tokens',

  constructor(...args) {
    bookshelf.Model.apply(this, args);
    this.on('creating', addRefreshToken);
  },

  user() {
    return this.belongsTo('User');
  },

  async getNewToken() {
    await this.load(['user']);
    const user = this.related('user');
    const newToken = await user.getTokens();
    return newToken;
  },
});

const RefreshTokenModel = bookshelf.model('RefreshToken', RefreshTokenDefinition);
const createRefreshToken = (...args) => RefreshTokenModel.create(...args);
const findRefreshToken = (...args) => RefreshTokenModel.findOne(...args);

export {
  RefreshTokenModel as default,
  createRefreshToken,
  findRefreshToken,
};
