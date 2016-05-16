## React Koa Postgres Starter

A ~~production-ready~~ _workin-in-progress_ starter repo using an ES6 stack.

### Overview

| Client      | Server      | Database   | Build            | Tests    | Misc |
|-------------|-------------|------------|------------------|----------|------|
| React       | Node        | PostgreSQL | Webpack (client) | Mocha    | JWT  |
| Redux       | Koa 2       | KnexJS     | Babel (server)   | Chai     |      |
| Redux-sagas | BookshelfJS |            |                  | Istanbul |      |
| SCSS / Sass |             |            |                  |          |      |


Aims
- Provide only features that are used in the vast majority of projects
- Provide a flexible, modular, tested code base that can scale as a project grows
- Provide lots of the shiny new parts of javascript, without the headache of getting them to play nice together every project


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

### Running tests
- npm test -- --watch
- npm run coverage

## TODO
- clean up some of the bookshelf model errors
- remove sensitive info from server responses
- add user password reset
- add email verification
- improve test coverage
- make make redux modals their own repo
