import conection from './connection';
import message from './message';
import user from './user';

export async function registerSocketsListeners(socket, io) {
  conection(socket, io);
  message(socket, io);
  user(socket, io);
};
