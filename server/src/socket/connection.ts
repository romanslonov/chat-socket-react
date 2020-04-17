import Cache from '../service/Cache';
import { Channel } from '../entity/Channel';

const connections = new Cache();

export default async function (socket, io) {
  /**
   * Save user to cache
   */
  socket.user.channels.forEach((channel: Channel) => socket.join(channel.id.toString()));
  connections.add(socket.user.id, socket);
  console.log('connected user email', socket.user.email);
  console.log('online now: ', connections.count());

  socket.on('disconnect', () => {
    connections.delete(socket.user.id);
    console.log('user disconnected id', socket.id)
  });
};

export { connections };
