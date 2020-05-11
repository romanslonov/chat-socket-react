import { connections } from '../socket/connection';

export default function (socket, io) {
  socket.on('CALL_SDP', (payload) => {
    const target = connections.get(payload.target);

    io.to(target.id).emit('CALL_SDP', { sdp: payload.sdp, callerId: socket.user.id });
  });
  socket.on('CALL_START', (payload) => {
    const target = connections.get(payload.target);

    io.to(target.id).emit('CALL_STARTED', { offer: payload.offer, callerId: socket.user.id });
  });
  socket.on('CALL_SEND_CANDIDATE', (payload) => {
    const target = connections.get(payload.target);

    io.to(target.id).emit('CALL_GET_CANDIDATE', { candidate: payload.candidate, callerId: socket.user.id });
  });
  socket.on('CALL_SEND_OFFER', (payload) => {
    const target = connections.get(payload.target);

    io.to(target.id).emit('CALL_GET_OFFER', { offer: payload.offer, callerId: socket.user.id });
  });
  socket.on('CALL_SEND_ANSWER', (payload) => {
    const target = connections.get(payload.target);

    io.to(target.id).emit('CALL_GET_ANSWER', { answer: payload.answer, callerId: socket.user.id });
  });
};
