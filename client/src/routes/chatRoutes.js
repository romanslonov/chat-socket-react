import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Chat from '../components/Chat'
export default class ChatRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/chat/:id" component={Chat} />
        <Route exact path="/chat" component={Chat} />
      </Switch>
    );
  }
}
