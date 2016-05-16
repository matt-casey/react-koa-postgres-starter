import err from '../../errors';
import auth from '../../lib/auth';

const validateEmail = email => {
  const isValid = /\S+@\S+\.\S+/.test(email);
  if (!isValid) throw err.create(err.types.badRequest, 'valid email required');
  return true;
};

const validatePassword = pass => {
  const isValid = typeof pass === 'string' && pass.length;
  if (!isValid) throw err.create(err.types.badRequest, 'password required');
  return true;
};

async function authenticate(email, plainTextPass) {
  validateEmail(email);
  validatePassword(plainTextPass);

  const userModel = await this.findOne({ email }, { withRelated: ['refreshToken'] });
  if (!userModel) throw err.create(err.types.notFound, 'user doesn\'t exist');

  const passwordMatches = await userModel.checkPassword(plainTextPass);
  if (!passwordMatches) throw err.create(err.types.badRequest, 'wrong password');

  if (!userModel.related('refreshToken').id) {
    await userModel.addRefreshToken();
  }

  return userModel;
}

async function create(email, plainTextPass) {
  validateEmail(email);
  validatePassword(plainTextPass);

  const alreadyExists = await this.findOne({ email });
  if (alreadyExists) throw err.create(err.types.conflict, 'user already exists');

  const hashedPass = await auth.createHash(plainTextPass);
  const userModel = await this.forge({ email, password: hashedPass }).save();
  await userModel.addRefreshToken();

  return userModel;
}

export {
  authenticate,
  create,
};
