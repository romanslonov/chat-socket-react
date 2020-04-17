const userStatusChange = (socket, { userId, time }) => {
  socket.broadcast.emit('USER_STATUS_CHANGE', { userId, time });
}

export default function (socket, io) {
  socket.on('USER_ONLINE', (payload) => {
    userStatusChange(socket, payload);
  });

  socket.on('USER_OFFLINE', (payload) => {
    userStatusChange(socket, payload);
  });
};
