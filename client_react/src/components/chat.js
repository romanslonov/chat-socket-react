import React, { Component } from 'react';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import ChatRoutes from '../routes/chatRoutes';
import ContentContainer from '../components/ContentContainer';

class Chat extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Chat</h1>
        <ContentContainer>
          <ChatRoutes />
        </ContentContainer>
      </React.Fragment>
    );
  }
}

export default withRouter(Chat)
