import { DefaultContext, Next } from 'koa';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { User } from '../entity/User';
import IDataStoredInToken from '../interface/DataStoredInToken';
import config from '../config';

export default async (ctx: DefaultContext, next: Next) => {
  ctx.assert(ctx.request.headers.authorization, 401, 'Not authorized.');

  const token: string = ctx.request.header.authorization.split(' ')[1];
  const userRepository = getRepository(User);

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as IDataStoredInToken;
    const user = await userRepository.findOne(decoded.id);

    ctx.assert(user, 401, 'Token is not provided or invalid.');

    ctx.state.user = user;

    await next();
  } catch(error) {
    ctx.throw(401, 'Token is not provided or invalid.');
  }
};
