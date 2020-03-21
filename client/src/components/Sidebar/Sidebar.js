import React, { Component } from 'react';
import Room from '../Room';
import { NavLink, withRouter } from 'react-router-dom';

class Sidebar extends Component {
  render() {
    const { rooms } = this.props;

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
            rooms.map(room => {
              return (
                <li className="border-b" key={room.id + 'li'}>
                  <NavLink
                    activeClassName="bg-blue-700 block text-white"
                    to={`/chat/${room.id}`}
                    onClick={() => this.props.navToggle(room.id)}
                  >
                    <Room
                      user={room.user}
                      text={room.text}
                      active={this.props.activeNav === room.id}
                    />
                  </NavLink>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default withRouter(Sidebar);
