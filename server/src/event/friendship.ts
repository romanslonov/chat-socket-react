import { connections } from '../socket/connection';
import { EventType } from '../event';

export function friendRequestSentHandler({ request, io }) {
  console.log(`[event]: A friend request was sent to ${request.target.email}.`);
  const socket = connections.get(request.target.id);

  if (socket) {
    io.to(socket.id).emit(EventType.FRIEND_REQUEST_SENT, request);
  }
};

export function friendRequestAcceptedHandler({ request, io }) {
  console.log(`[event]: A friend request by ${request.sender.email} was accepted by ${request.target.email}.`);
  const socket = connections.get(request.sender.id);

  if (socket) {
    io.to(socket.id).emit(EventType.FRIEND_REQUEST_ACCEPTED, request);
  }
};

export function friendRequestCanceledHandler({ request, io }) {
  console.log(`[event]: A friend request by ${request.sender.email} was canceled by ${request.target.email}.`);
  const socket = connections.get(request.target.id);

  if (socket) {
    io.to(socket.id).emit(EventType.FRIEND_REQUEST_CANCELED, request);
  }
};

export function friendRequestBlockedHandler({ request, io }) {
  // console.log(`[event]: A friendship ${request.id} was blocked.`);
  // const socket = connections.get(request.target.id);

  // if (socket) {
  //   io.to(socket.id).emit(EventType.FRIEND_REQUEST_SENT, request);
  // }
};
