import Router from 'koa-router';
import { findUser, createUser } from '../models/user';

const userRouter = new Router();

userRouter
  .param('user', async (id, ctx, next) => {
    const matchesToken = parseInt(id, 10) === parseInt(ctx.state.user.userId, 10);
    ctx.assert(matchesToken, 403, 'you don\'t have access to that user');
    ctx.user = await findUser({ id });
    ctx.assert(ctx.user, 404, 'that user does not exist');
    return next();
  })
  .post('/', async ctx => {
    const { email, password } = ctx.request.body;
    const user = await createUser(email, password);
    const response = await user.getTokens();
    ctx.status = 201;
    ctx.body = response;
  })
  .get('/:user', async ctx => {
    ctx.body = ctx.user;
  });

export default userRouter;
