import { connections } from '../socket/connection';
import { User } from '../entity/User';
import { Friendship } from '../entity/Friendship';

const userStatusChange = async (event, socket, { user, time }, io) => {
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

  // console.log(online);

  const sockets = online.map(onlineUser => connections.get(onlineUser.id));

  if (sockets.length > 0) {
    sockets.forEach((socket) => io.to(`${socket.id}`).emit(event, { user, time }));
  }
}

export default function (socket, io) {
  socket.on('USER_ONLINE', (payload) => {
    userStatusChange('USER_ONLINE', socket, payload, io);
  });

  socket.on('USER_OFFLINE', (payload) => {
    console.log(`${payload.user.email} goes to offline!`);
    userStatusChange('USER_OFFLINE', socket, payload, io);
  });

  socket.on('GET_ONLINE_FRIENDS', async () => {
    const { user } = socket;
    const raw = await Friendship
      .createQueryBuilder('friendship')
      .where('friendship.senderId = :id', { id: user.id })
      .orWhere('friendship.targetId = :id', { id: user.id })
      .where('friendship.status = :status', { status: 'accepted' })
      .leftJoinAndSelect('friendship.sender', 'sender')
      .leftJoinAndSelect('friendship.target', 'target')
      .getMany();
    const friends = raw.map((item) => {
      if (item.sender.id !== user.id) return item.sender;
      if (item.target.id !== user.id) return item.target;
    });
    const online = [];
    connections.getdata().forEach(element => {
      if (friends.some(friend => friend.id === element.user.id)) {
        online.push(element.user);
      }
    });
    socket.emit('GET_ONLINE_FRIENDS', online);
  })
};
