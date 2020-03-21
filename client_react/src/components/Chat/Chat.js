import React, { Component } from 'react';
import Message from '../Message';
import { withRouter } from 'react-router-dom';
class Chat extends Component {
  state = {
    messages: [
      {
        id: 1,
        text: 'How can I connect to socket.io? on the client side',
        user: {
          firstName: 'Peter',
          lastName: 'Markovich',
          email: 'peterm@gmail.com',
        },
      },
      {
        id: 2,
        text:
          'You have to use socket-client npm module in order to connect to it',
        user: {
          firstName: 'Roman',
          lastName: 'Slonov',
          email: 'romans@gmail.com',
        },
      },
    ],
  };

  render() {
    const { messages } = this.state;
    const { id } = this.props.match.params;
    
    return (
      <React.Fragment>
        <div className="h-full border flex flex-col">
          <div className="border-b py-2 px-6">
            <div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-900 flex-shrink-0" />
                <div className="ml-3">
                  <div className="text-sm font-bold">
                    {id && messages[id].user.firstName && messages[id].user.lastName}
                  </div>
                  <div className="text-gray-600">{id && messages[id].user.email}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-grow p-4">
            {messages.map(message => (
              <Message message={message} />
            ))}
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
