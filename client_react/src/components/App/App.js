import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './App.css';
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
