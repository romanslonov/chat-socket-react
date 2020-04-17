import CacheService from '../service/Cache';
import ExtendedSocket from '../interface/ExtendedSocket';
import { Channel } from '../entity/Channel';

export default async function (socket: ExtendedSocket, io: SocketIO.Server) {
  /**
   * Save user to cache
   */
  socket.user.channels.forEach((channel: Channel) => socket.join(channel.id));
  CacheService.add(socket.user.id, socket);
  console.log('connected user email', socket.user.email);
  console.log('online now: ', CacheService.count());

  socket.on('disconnect', () => {
    CacheService.delete(socket.user.id);
    console.log('user disconnected id', socket.id)
  });
}
