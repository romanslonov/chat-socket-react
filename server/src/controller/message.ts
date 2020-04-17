import { DefaultContext } from 'koa';
import { Channel } from '../entity/Channel';
import { Message } from '../entity/Message';
import { CREATED } from 'http-status';
import { getEventManager } from '../service/eventManager';

export async function create(ctx: DefaultContext) {
  const { type, content } = ctx.request.body;
  const user = ctx.state.user;
  const channel = await Channel.findOne(ctx.request.body.channelId);
  const message = new Message();

  message.user = user;
  message.channel = channel;
  message.type = type;
  message.content = content;

  await message.save();

  getEventManager().emit('MESSAGE_NEW', { user, message, channel });

  ctx.status = CREATED;
  ctx.body = { message };
}
