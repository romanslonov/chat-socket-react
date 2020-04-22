import { DefaultContext } from 'koa';
import { BAD_REQUEST } from 'http-status';
import { Friendship } from '../entity/Friendship';
import { User } from '../entity/User';
import { EventType } from '../event';
import { getEventManager } from '../service/eventManager';
import { FriendshipType } from '../entity/Friendship';

export async function makeRequest(ctx: DefaultContext) {
  const target = await User.findOne({ email: ctx.request.body.email });
  const sender = ctx.state.user;

  const exist = await Friendship.findOne({ where: [
    { target, sender },
    { sender, target }
  ]});

  ctx.assert(!exist, BAD_REQUEST, 'Friend request already sent.');

  const request = new Friendship();

  request.sender = sender;
  request.target = target;
  request.lastActionByUser = sender;

  await request.save();

  getEventManager().emit(EventType.FRIEND_REQUEST_SENT, { request, io: ctx.state.io });

  ctx.status = 201;
  ctx.body = { request };
}

export async function accept(ctx: DefaultContext) {
  const { id } = ctx.params;
  const currentUser = ctx.state.user;

  const request = await Friendship.findOne({ where: { id }, relations: ['sender', 'target'] });

  request.status = FriendshipType.ACCEPTED;
  request.lastActionByUser = currentUser;

  await request.save();

  getEventManager().emit(EventType.FRIEND_REQUEST_ACCEPTED, { request, io: ctx.state.io });

  ctx.status = 200;
  ctx.body = { request };
}

export async function cancel(ctx: DefaultContext) {
  const { id } = ctx.params;
  const request = await Friendship.findOne(id);

  await Friendship.delete(id);

  getEventManager().emit(EventType.FRIEND_REQUEST_CANCELED, { request, io: ctx.state.io });

  ctx.status = 204;
}

export async function block(ctx: DefaultContext) {
  // const { id } = ctx.params;
  // const friendship = await Friendship.findOne(id);

  // friendship.status = FriendshipType.ACCEPTED;

  // await friendship.save();

  // ctx.status = 200;
}

export async function getAll(ctx: DefaultContext) {
  const currentUser = ctx.state.user;
  const friendships = await Friendship.find({
    where: [ { sender: currentUser }, { target: currentUser } ],
    relations: ['target', 'sender'],
  });

  ctx.status = 201;
  ctx.body = { friendships };
}
