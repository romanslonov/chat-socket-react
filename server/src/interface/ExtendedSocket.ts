import { User } from '../entity/User';

interface ExtendedSocket extends SocketIO.Socket {
  user: User;
}

export default DataStoredInToken;
