import _ from 'lodash';
import bookshelf from '../db/bookshelf';

const toSnakeCase = (memo, val, key) => {
  memo[_.snakeCase(key)] = val; //eslint-disable-line
  return memo;
};

const toCamelCase = (memo, val, key) => {
  memo[_.camelCase(key)] = val; //eslint-disable-line
  return memo;
};

const BaseDefinition = bookshelf.Model.extend({
  format: attrs => _.reduce(attrs, toSnakeCase, {}),
  parse: attrs => _.reduce(attrs, toCamelCase, {}),
}, {
  create(data, options) {
    return this.forge(data).save(null, options);
  },
  findOne(data, options) {
    return this.forge(data).fetch(options);
  },
});

export default bookshelf.model('Base', BaseDefinition);
