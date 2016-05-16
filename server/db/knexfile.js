/* eslint-disable */
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'starterpack',
      user: 'mattcasey'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      database: 'starterpack',
      user: 'mattcasey'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  }
};
