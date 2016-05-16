## React Koa Postgres Starter

A ~~production-ready~~ _workin-in-progress_ starter repo using an ES6 stack.

| Client      | Server      | Database   | Build            | Tests    |
|-------------|-------------|------------|------------------|----------|
| React       | Node        | PostgreSQL | Webpack (client) | Mocha    |
| Redux       | Koa 2       | KnexJS     | Babel (server)   | Chai     |
| Redux-sagas | BookshelfJS |            |                  | Istanbul |
| SCSS / Sass |             |            |                  |          |

### Getting started
- clone/fork repo
- create ./server/config/index.js
  - add const JWT_PRIVATE_KEY 
- npm install
- setup database in ./server/db/knexfile.js
  - cd server/db && knex migrate:latest

### Running in development
- npm run start:dev
  - client running on port 8000
    - will open in browser when done building
  - server running on port 8080/api

### Running in production
- npm run build
- npm start
  - client running on port 8080
  - server running on port 8080/api
