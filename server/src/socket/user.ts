import { connections, friends } from '../socket/connection';

const userStatusChange = async (event, socket, { userId, time }, io) => {
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
    sockets.forEach((socket) => io.to(`${socket.id}`).emit(event, { userId, time }));
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

  // socket.on('GET_ONLINE_FRIENDS', async () => {
  //   const { user } = socket;
  //   const data = friends.get(user.id);

  //   console.log(friends.getdata());

  //   const online = [];
  //   connections.getdata().forEach(element => {
  //     if (data.some(friend => friend.id === element.user.id)) {
  //       online.push(element.user);
  //     }
  //   });
  //   socket.emit('GET_ONLINE_FRIENDS', online);
  // })
};
