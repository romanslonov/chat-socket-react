import React, { Component } from 'react';

export default class Room extends Component {
  state = {};

  render() {
    const { user, text, active } = this.props;
    const secondaryTextClasses = active ? 'text-white' : 'text-gray-600';
    return (
      <div
        className={`${
          active ? 'bg-blue-700 text-white' : ''
        } cursor-pointer p-2`}
      >
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-gray-900 flex-shrink-0" />
          <div className="flex-grow overflow-hidden ml-3">
            <div className="flex">
              <div className="flex-grow font-bold">{`${user.firstName} ${user.lastName}`}</div>
              <div className={`${secondaryTextClasses} text-xs`}>18:03</div>
            </div>
            <div className={`${secondaryTextClasses} truncate `}>{text}</div>
          </div>
        </div>
      </div>
    );
  }
}
