import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';


class MainContainer extends Component {
  render() {
    return (
      <main style={{background: '#ddd', minHeight: '100vh'}}>
        <header style={{display: 'flex', justifyContent: 'space-around'}}>
          <Link to="/" >
            Home
          </Link>
          <Link to="/chat" >
            Chat
          </Link>
          <Link to={`/chat/${1}`}>
            Href 1
          </Link>
          <Link to={`/chat/${2}`} >
            Href 2
          </Link>
          <Link to={`/chat/${3}`} >
            Href 3
          </Link>
          <Link to={`/chat/${4}`} >
            Href 4
          </Link>
        </header>
        {this.props.children}
      </main>
    );
  }
}

export default MainContainer;
