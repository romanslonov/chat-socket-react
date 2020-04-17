import ExtendedSocket from '../interface/ExtendedSocket';
import conection from './message';
import message from './message';

export async function registerSocketsListeners(socket: ExtendedSocket, io: SocketIO.Server) {
  conection(socket, io);
  message(socket, io);
};
