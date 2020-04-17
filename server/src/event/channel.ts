import { connections } from '../socket/connection';
import { EventType } from '../event';

export function channelNewHandler({ userIds, channel, io }) {
  const sockets: SocketIO.Client[] = userIds.map((id: number) => connections.get(id));

  if (sockets.length > 0) {
    sockets.forEach((socket) => {
      io.to(`${socket.id}`).emit(EventType.CHANNEL_NEW, channel);
    });
  }
};
