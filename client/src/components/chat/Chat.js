import { h, Component } from 'preact';
import Message from '../message';

export default class Chat extends Component {
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
    return (
      <div className="h-full border flex flex-col">
        <div className="border-b py-2 px-6">
          <div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-900 flex-shrink-0" />
              <div className="ml-3">
                <div className="text-sm font-bold">Peter Markovich</div>
                <div className="text-gray-600">last seen just now</div>
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
    );
  }
}
