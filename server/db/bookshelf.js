import knex from 'knex';
import bookshelf from 'bookshelf';
import dbConfig from './knexfile';

const currentConfig = dbConfig[process.env.NODE_ENV || 'development'];
const knexInstance = knex(currentConfig);
const bookshelfInstance = bookshelf(knexInstance);

bookshelfInstance.plugin('registry');

export default bookshelfInstance;
