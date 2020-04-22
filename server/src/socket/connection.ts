import Cache from '../service/Cache';
import { Channel } from '../entity/Channel';
import { Friendship } from '../entity/Friendship';

const connections = new Cache();

export default async function (socket, io) {
  /**
   * Save user to cache
   */
  socket.user.channels.forEach((channel: Channel) => socket.join(channel.id.toString()));
  connections.add(socket.user.id, socket);

  const { user: currentUser } = socket;
  const raw = await Friendship
    .createQueryBuilder('friendship')
    .where('friendship.senderId = :id', { id: currentUser.id })
    .orWhere('friendship.targetId = :id', { id: currentUser.id })
    .where('friendship.status = :status', { status: 'accepted' })
    .leftJoinAndSelect('friendship.sender', 'sender')
    .leftJoinAndSelect('friendship.target', 'target')
    .getMany();
  const friends = raw.map((item) => {
    if (item.sender.id !== currentUser.id) return item.sender;
    if (item.target.id !== currentUser.id) return item.target;
  });

  console.log(friends);

  const online = [];
  connections.getdata().forEach(element => {
    if (friends.some(friend => friend.id === element.user.id)) {
      online.push(element.user);
    }
  });

  const sockets = online.map(onlineUser => connections.get(onlineUser.id));

  if (sockets.length > 0) {
    sockets.forEach((socket) => io.to(`${socket.id}`).emit('USER_ONLINE', { user: currentUser, time: new Date() }));
  }

  console.log(`${socket.user.email} comes online.`);

  socket.on('disconnect', async () => {
    const { user: currentUser } = socket;
    const raw = await Friendship
      .createQueryBuilder('friendship')
      .where('friendship.senderId = :id', { id: currentUser.id })
      .orWhere('friendship.targetId = :id', { id: currentUser.id })
      .where('friendship.status = :status', { status: 'accepted' })
      .leftJoinAndSelect('friendship.sender', 'sender')
      .leftJoinAndSelect('friendship.target', 'target')
      .getMany();
    const friends = raw.map((item) => {
      if (item.sender.id !== currentUser.id) return item.sender;
      if (item.target.id !== currentUser.id) return item.target;
    });

    const online = [];
    connections.getdata().forEach(element => {
      if (friends.some(friend => friend.id === element.user.id)) {
        online.push(element.user);
      }
    });

    const sockets = online.map(onlineUser => connections.get(onlineUser.id));

    if (sockets.length > 0) {
      sockets.forEach((socket) => io.to(`${socket.id}`).emit('USER_OFFLINE', { user: currentUser, time: new Date() }));
    }

    console.log(`${socket.user.email} goes offline.`);

    connections.delete(socket.user.id);
  });
};

export { connections };
