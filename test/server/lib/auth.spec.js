import { expect } from 'chai';
import auth from '../../../server/lib/auth';

describe('auth lib', () => {
  it('should hash plainText', async () => {
    const hash = await auth.createHash('fooBar');
    expect(hash.substring(0, 7)).to.equal('$2a$10$');
    expect(hash.length).to.equal(60);
  });

  it('should return true if plainText matches hash', async () => {
    const hash = await auth.createHash('fooBar');
    const shouldBeValid = await auth.compareHash('fooBar', hash);
    expect(shouldBeValid).to.equal(true);
  });

  it('should return false if plainText doesn\'t match hash', async () => {
    const hash = await auth.createHash('fooBar');
    const shouldNotBeValid = await auth.compareHash('foobar', hash);
    expect(shouldNotBeValid).to.equal(false);
  });
});
