import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Chat from '../components/chat';
import Home from '../components/home';

export default class GlobalRoutes extends Component {
  render () {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/chat/" component={Chat} />
      </Switch>
    );
  }
};
