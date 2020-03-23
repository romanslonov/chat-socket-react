import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ChatRoutes from '../../routes/chatRoutes';
import ContentContainer from '../ContentContainer';
import Sidebar from '../Sidebar'
class Board extends Component {

  componentDidMount() {
    this.props.getUserProfile()
  }
  
  render() {
    return (
      <React.Fragment>
        <Sidebar />
        <ContentContainer>
          <ChatRoutes />
        </ContentContainer>
      </React.Fragment>
    );
  }
}

export default withRouter(Board)
