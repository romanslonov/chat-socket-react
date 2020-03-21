import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Sidebar from '../Sidebar'

class MainContainer extends Component {
  render() {
    return (
      <main className="min-h-screen flex">
        <Sidebar />
        {this.props.children}
      </main>
    );
  }
}

export default MainContainer;
