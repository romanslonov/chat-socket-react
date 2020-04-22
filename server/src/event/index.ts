import { getEventManager } from '../service/eventManager';
import { signUpHandler } from './user';
import { messageNewHandler } from './message';
import { channelNewHandler } from './channel';
import {
  friendRequestSentHandler,
  friendRequestAcceptedHandler,
  friendRequestCanceledHandler,
  friendRequestBlockedHandler,
} from './friendship';

export enum EventType {
  USER_SIGN_UP = 'USER_SIGN_UP',
  MESSAGE_NEW = 'MESSAGE_NEW',
  CHANNEL_NEW = 'CHANNEL_NEW',
  FRIEND_REQUEST_SENT = 'FRIEND_REQUEST_SENT',
  FRIEND_REQUEST_ACCEPTED = 'FRIEND_REQUEST_ACCEPTED',
  FRIEND_REQUEST_CANCELED = 'FRIEND_REQUEST_CANCELED',
  FRIEND_REQUEST_BLOCKED = 'FRIEND_REQUEST_BLOCKED',
};

export function initEventsListeners() {
  const eventManager = getEventManager();

  eventManager.on(EventType.USER_SIGN_UP, signUpHandler);
  eventManager.on(EventType.MESSAGE_NEW, messageNewHandler);
  eventManager.on(EventType.CHANNEL_NEW, channelNewHandler);
  eventManager.on(EventType.FRIEND_REQUEST_SENT, friendRequestSentHandler);
  eventManager.on(EventType.FRIEND_REQUEST_ACCEPTED, friendRequestAcceptedHandler);
  eventManager.on(EventType.FRIEND_REQUEST_CANCELED, friendRequestCanceledHandler);
  eventManager.on(EventType.FRIEND_REQUEST_BLOCKED, friendRequestBlockedHandler);
};
