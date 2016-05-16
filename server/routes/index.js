import Router from 'koa-router';
import compose from 'koa-compose';
import bodyparser from 'koa-bodyparser';
import jwt from 'koa-jwt';

import { JWT_PRIVATE_KEY } from '../config';
import userRouter from './users';
import tokenRouter from './tokens';

const apiRouter = new Router();

apiRouter
  .use(bodyparser())
  .use(
    '/users',
    jwt({ secret: JWT_PRIVATE_KEY }).unless({ method: ['POST', 'OPTIONS'] }),
    userRouter.routes(),
    userRouter.allowedMethods()
  )
  .use(
    '/tokens',
    jwt({ secret: JWT_PRIVATE_KEY }).unless({ method: ['POST', 'PUT', 'OPTIONS'] }),
    tokenRouter.routes(),
    tokenRouter.allowedMethods()
  );

export default () => compose([
  apiRouter.routes(),
  apiRouter.allowedMethods(),
]);
