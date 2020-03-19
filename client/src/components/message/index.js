import { h, Component } from 'preact';

export default class Message extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    const { message } = this.props;
    return (
      <div className="p-2">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-900 flex-shrink-0" />
          <div className="ml-3">
            <div className="text-sm text-blue-700 font-bold">{`${message.user.firstName} ${message.user.lastName}`}</div>
            <div>{message.text}</div>
          </div>
        </div>
      </div>
    );
  }
}
