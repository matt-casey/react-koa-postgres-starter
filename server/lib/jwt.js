import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { JWT_PRIVATE_KEY } from '../config';

const jwtConfig = {
  expiresIn: '30m',
  issuer: 'starterpack app',
};

const createToken = (payload, optConfig) => jwt.sign(
  payload,
  JWT_PRIVATE_KEY,
  { ...jwtConfig, ...optConfig },
);

const decodeToken = token => jwt.verify(token, JWT_PRIVATE_KEY);

const createRefreshToken = () => crypto.randomBytes(64).toString('hex');

export default {
  createToken,
  decodeToken,
  createRefreshToken,
};
