import { expect } from 'chai';
import jwt from '../../../server/lib/jwt';

describe('jwt lib', () => {
  it('should encode a jwt with 3 parts', () => {
    const token = jwt.createToken({ foo: 'bar' });
    const parts = token.split('.');
    expect(parts.length).to.equal(3);
  });

  it('should encode with HS256', () => {
    const token = jwt.createToken({ foo: 'bar' });
    const parts = token.split('.');
    expect(parts[0]).to.equal('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
  });

  it('should decode a valid jwt', () => {
    const token = jwt.createToken({ foo: 'bar' });
    const { foo, iss } = jwt.decodeToken(token);
    expect({ foo, iss }).to.deep.equal({ foo: 'bar', iss: 'starterpack app' });
  });

  it('should expire after 6 hours', () => {
    const token = jwt.createToken({ foo: 'bar' });
    const { exp, iat } = jwt.decodeToken(token);
    expect(exp - iat).to.equal(1 * 30 * 60);
  });

  it('should throw jwt errors', () => {
    const token = jwt.createToken({ foo: 'bar' }, { expiresIn: -4 });
    try {
      jwt.decodeToken(token);
      // should not reach here
      expect(false).to.equal(true);
    } catch (error) {
      expect(error.name).to.equal('TokenExpiredError');
    }
  });
});
