import Promise from 'bluebird';
import bcrypt from 'bcrypt';

Promise.promisifyAll(bcrypt);

const addBcryptType = err => {
  // Compensate for `bcrypt` not using identifiable error types
  err.type = 'bcryptError'; // eslint-disable-line
  throw err;
};

const createHash = async plainText => {
  try {
    const hash = await bcrypt.hashAsync(plainText, 10);
    return hash;
  } catch (error) {
    throw addBcryptType(error);
  }
};

const compareHash = async (plainText, hash) => {
  try {
    const isValid = await bcrypt.compareAsync(plainText, hash);
    return isValid;
  } catch (error) {
    throw addBcryptType(error);
  }
};

export default {
  createHash,
  compareHash,
};
