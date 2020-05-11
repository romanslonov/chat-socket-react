import conection from './connection';
import message from './message';
import user from './user';
import call from './call';

export async function registerSocketsListeners(socket, io) {
  conection(socket, io);
  message(socket, io);
  user(socket, io);
  call(socket, io);
};
