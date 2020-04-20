import { connections } from '../socket/connection';
import { EventType } from '../event';

export function friendRequestHandler({ sender, target, channel }) {
  console.log(`A ${sender.email} sent friend request to ${target.email}.`);
  // const socket = connections.get(user.id);

  // if (socket) {
  //   socket.broadcast.to(channel.id).emit(EventType.MESSAGE_NEW, message);
  // }
};
