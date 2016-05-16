import Router from 'koa-router';

import { authenticateUser } from '../models/user';
import { findRefreshToken } from '../models/refresh-token';

const tokenRouter = new Router();

tokenRouter
  .post('/', async ctx => {
    const { email, password } = ctx.request.body;
    const user = await authenticateUser(email, password);
    const response = await user.getTokens();
    ctx.status = 201;
    ctx.body = response;
  })
  .put('/', async ctx => {
    const refreshToken = await findRefreshToken({ token: ctx.request.body.refreshToken });
    ctx.assert(refreshToken, 404, 'token doesn\'t exist');
    const newToken = await refreshToken.getNewToken();
    ctx.body = newToken;
  });

export default tokenRouter;
