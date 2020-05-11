import Cache from '../service/Cache';
import { Channel } from '../entity/Channel';
import { Friendship } from '../entity/Friendship';

const connections = new Cache();
const friends = new Cache();

export default async function (socket, io) {
  /**
   * Save user to cache
   */
  socket.user.channels.forEach((channel: Channel) => socket.join(channel.id.toString()));
  connections.add(socket.user.id, socket);

  const { user: currentUser } = socket;
  const raw = await Friendship
    .createQueryBuilder('friendship')
    .where('friendship.status = :status', { status: 'accepted' })
    .andWhere('friendship.senderId = :id', { id: currentUser.id })
    .orWhere('friendship.targetId = :id', { id: currentUser.id })
    .leftJoinAndSelect('friendship.sender', 'sender')
    .leftJoinAndSelect('friendship.target', 'target')
    .getMany();
  const data = raw.map((item) => {
    if (item.sender.id !== currentUser.id) return item.sender;
    if (item.target.id !== currentUser.id) return item.target;
  });

  friends.add(currentUser.id, data);

  const online = [];
  connections.getdata().forEach(element => {
    if (data.some(friend => friend.id === element.user.id)) {
      online.push(element.user.id);
    }
  });

  socket.emit('GET_ONLINE_FRIENDS', online);

  const sockets = online.map(userid => connections.get(userid));

  if (sockets.length > 0) {
    sockets.forEach((socket) => io
      .to(`${socket.id}`)
      .emit('USER_ONLINE', { userId: currentUser.id, time: new Date() })
    );
  }

  console.log(`${socket.user.email} comes online.`);

  socket.on('disconnect', async () => {
    const { user: currentUser } = socket;
    const data = friends.get(currentUser.id);

    const online = [];
    connections.getdata().forEach(element => {
      if (data.some(friend => friend.id === element.user.id)) {
        online.push(element.user.id);
      }
    });

    const sockets = online.map(userid => connections.get(userid));

    if (sockets.length > 0) {
      sockets.forEach((socket) => io
      .to(`${socket.id}`)
      .emit('USER_OFFLINE', { userId: currentUser.id, time: new Date() }));
    }

    console.log(`${socket.user.email} goes offline.`);

    connections.delete(socket.user.id);
    friends.delete(currentUser.id);
  });
};

export { connections, friends };
