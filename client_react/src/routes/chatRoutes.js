import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Sub from '../components/sub/sub';
import Task from '../components/sub/task';

export default class ChatRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/chat/:id" component={Sub} />
        <Route exact path="/chat/" component={Task} />
      </Switch>
    );
  }
}
