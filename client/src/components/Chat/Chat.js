import React, { Component } from 'react';
import Message from '../Message';
import { withRouter } from 'react-router-dom';
class Chat extends Component {
  state = {};

  emptyRoom = () => {
    return (
      <div className="h-full w-full flex flex-row justify-center items-center">
        <div className="font-bold">Please choose a room</div>
      </div>
    )
  }

  render() {
    const { id } = this.props.match.params;
    const { rooms } = this.props;

    if (!id) {
      return this.emptyRoom()
    }
    
    return (
      <React.Fragment>
        <div className="h-full border flex flex-col">
          <div className="border-b py-2 px-6">
            <div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-900 flex-shrink-0" />
                <div className="ml-3">
                  <div className="text-sm font-bold">
                    {rooms[id].user.firstName + ' ' + rooms[id].user.lastName}
                  </div>
                  <div className="text-gray-600">
                    {rooms[id].user.email}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-grow p-4">
            {rooms.map(room => Number(id) === room.id && <Message key={room.id + 'chat'} message={room} />)}
          </div>
          <div>
            <input
              placeholder="Write a message..."
              className="w-full border-t placeholder-gray-600 py-3 px-4"
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Chat);
