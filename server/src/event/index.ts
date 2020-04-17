import { getEventManager } from '../service/eventManager';
import { signUpHandler } from './user';
import { messageNewHandler } from './message';

export function initEventsListeners() {
  const eventManager = getEventManager();

  eventManager.on('USER_SIGN_UP', signUpHandler);
  eventManager.on('MESSAGE_NEW', messageNewHandler);
};
