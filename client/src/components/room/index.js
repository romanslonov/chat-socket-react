import { Component } from 'preact';

export default class Room extends Component {
  state = {};

  render() {
    const { user, text, active } = this.props;
    return (
      <div
        className={`${
          active ? 'bg-blue-700 text-white' : ''
        } cursor-pointer p-2`}
      >
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-gray-900 flex-shrink-0" />
          <div className="overflow-hidden ml-3">
            <div className="font-bold">{`${user.firstName} ${user.lastName}`}</div>
            <div
              className={`${active ? 'text-white' : 'text-gray-600'} truncate `}
            >
              {text}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
