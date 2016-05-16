import auth from '../../lib/auth';
import jwt from '../../lib/jwt';
import err from '../../errors';
import { createRefreshToken, findRefreshToken } from '../refresh-token';

const tokenTypes = {
  default: 'BEARER',
  resetPassword: 'RESET_PASSWORD',
};

async function addRefreshToken() {
  const userId = this.get('id');
  await createRefreshToken({ userId });
}

async function checkPassword(password) {
  const passwordHash = this.get('password');
  return await auth.compareHash(password, passwordHash);
}

async function createToken(tokenType, config) {
  const id = this.get('id');
  const type = tokenType ? tokenTypes[tokenType] : tokenTypes.default;
  const token = await jwt.createToken({ userId: id, type, ...config });

  return token;
}

async function getTokens(config) {
  const userId = this.get('id');
  const token = await this.createToken(tokenTypes.default, config);
  const refreshTokenModel = await findRefreshToken({ userId });

  return { userId, token, refreshToken: refreshTokenModel.get('token') };
}

async function refreshTokenFn(refreshToken) {
  const usersToken = this.related('refreshToken').toJSON().token;
  if (!usersToken) throw err.create(err.types.notFound, 'token not found');
  if (usersToken !== refreshToken) throw err.create(err.types.badRequest, 'token doesn\'t match');

  return await this.getTokens();
}

async function getPasswordResetToken() {
  return await this.createToken('resetPassword');
}

async function update(props) {
  const { id, email, password, ...safeProps } = props; // eslint-disable-line
  return await this.save(safeProps);
}

async function changePassword(password) {
  this.related('refreshToken').destroy();
  return await this.save({ password });
}

export {
  addRefreshToken,
  createToken,
  checkPassword,
  getTokens,
  tokenTypes,
  refreshTokenFn,
  getPasswordResetToken,
  update,
  changePassword,
};
