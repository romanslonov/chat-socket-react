import React, { Component } from 'react';
import Room from '../Room';
import { Link } from 'react-router-dom'

export default class Sidebar extends Component {
  state = {
    rooms: [
      {
        id: 1,
        user: {
          firstName: 'Peter',
          lastName: 'Markovich',
          email: 'peterm@gmail.com',
        },
        text: 'How can I connect to socket.io? on the client side',
        active: true,
      },
      {
        id: 2,
        user: {
          firstName: 'John',
          lastName: 'Olson',
          email: 'olson@gmail.com',
        },
        text: 'Hey whats up man?',
        active: false,
      },
    ],
  };

  render() {
    const { rooms } = this.state;
    return (
      <div className="fixed w-64 inset-0">
        <div className="p-2">
          <input
            className="w-full bg-gray-300 rounded placeholder-gray-600 px-2 py-1"
            type="text"
            placeholder="Search"
          />
        </div>
        <ul>
          {rooms &&
            rooms.map(room => (
              <li className="border-b">
                <Link to={`/chat/${room.id -1}`}><Room user={room.user} text={room.text} active={room.active} /></Link>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
