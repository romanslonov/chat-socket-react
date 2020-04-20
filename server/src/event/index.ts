import { getEventManager } from '../service/eventManager';
import { signUpHandler } from './user';
import { messageNewHandler } from './message';
import { channelNewHandler } from './channel';
import { friendRequestHandler } from './friendship';

export enum EventType {
  USER_SIGN_UP = 'USER_SIGN_UP',
  MESSAGE_NEW = 'MESSAGE_NEW',
  CHANNEL_NEW = 'CHANNEL_NEW',
  FRIEND_REQUEST = 'FRIEND_REQUEST',
};

export function initEventsListeners() {
  const eventManager = getEventManager();

  eventManager.on(EventType.USER_SIGN_UP, signUpHandler);
  eventManager.on(EventType.MESSAGE_NEW, messageNewHandler);
  eventManager.on(EventType.CHANNEL_NEW, channelNewHandler);
  eventManager.on(EventType.FRIEND_REQUEST, friendRequestHandler);
};
