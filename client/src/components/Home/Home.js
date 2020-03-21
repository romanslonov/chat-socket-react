import React, {Component} from 'react'
import UserCard from '../UserCard';
import Chat from '../Chat';
import Sidebar from '../Sidebar';

export default class Home extends Component {

  render() {
    return (
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="pl-64 flex-grow">
          <Chat />
        </div>
      </div>
    );
  }
}
