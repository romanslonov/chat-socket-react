import conection from './connection';
import message from './message';

export async function registerSocketsListeners(socket, io) {
  conection(socket, io);
  message(socket, io);
};
