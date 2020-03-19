import { h, Component } from 'preact';

export default class Message extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    const { message } = this.props;
    return (
      <div className="p-2">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-900 flex-shrink-0" />
          <div className="flex-grow ml-3">
            <div className="flex items-center">
              <div className="flex-grow text-sm text-blue-700 font-bold">
                {`${message.user.firstName} ${message.user.lastName}`}
              </div>
              <div className="text-xs text-gray-600">18:03</div>
            </div>
            <div>{message.text}</div>
          </div>
        </div>
      </div>
    );
  }
}
