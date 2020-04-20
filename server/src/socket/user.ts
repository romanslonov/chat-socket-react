import { connections } from '../socket/connection';

const userStatusChange = (socket, { userId, time }, io) => {
  const receviers: number[] = socket.user.channels
	.map((channel) => channel.users)
  .reduce((acc, users) => acc.concat(users))
  .map(user => user.id)
  .filter(id => id !== socket.user.id);
  const rcvs: number[] = [...new Set(receviers)];

  const sockets = rcvs.map(id => connections.get(id));

  if (sockets.length > 0) {
    console.log(sockets[0].id);
    sockets.forEach((socket) => io.to(`${socket.id}`).emit('USER_STATUS_CHANGE', { userId, time }));
  }
}

export default function (socket, io) {
  socket.on('USER_ONLINE', (payload) => {
    userStatusChange(socket, payload, io);
  });

  socket.on('USER_OFFLINE', (payload) => {
    userStatusChange(socket, payload, io);
  });

  socket.on('GET_ONLINE_FRIENDS', () => {
    socket.emit('GET_ONLINE_FRIENDS', []);
  })
};
