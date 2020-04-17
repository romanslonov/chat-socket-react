import { connections } from '../socket/connection';
import { EventType } from '../event';

export function messageNewHandler({ message, user, channel }) {
  const socket = connections.get(user.id);

  if (socket) {
    socket.broadcast.to(channel.id).emit(EventType.MESSAGE_NEW, message);
  }
};
