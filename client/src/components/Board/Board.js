import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ChatRoutes from '../../routes/chatRoutes';
import ContentContainer from '../ContentContainer';

class Board extends Component {
  render() {
    return (
      <React.Fragment>
        <ContentContainer>
          <ChatRoutes />
        </ContentContainer>
      </React.Fragment>
    );
  }
}

export default withRouter(Board)
