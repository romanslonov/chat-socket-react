import CacheService from '../service/Cache';

export function messageNewHandler({ message, user, channel }) {
  const socket = CacheService.get(user.id);

  if (socket) {
    socket.broadcast.to(channel.id).emit('MESSAGE_NEW', message);
  }
};
