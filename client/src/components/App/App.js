import React, { Component } from 'react';
import '../../styles.css';
import GlobalRoutes from '../..//routes/globalRoutes';
import MainContainer from '../MainContainer';

class App extends Component {
  render() {
    return (
      <MainContainer>
        <GlobalRoutes />
      </MainContainer>
    );
  }
}

export default App;
