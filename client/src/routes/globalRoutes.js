import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Board from '../components/Board';

export default class GlobalRoutes extends Component {
  render () {
    return (
      <Switch>
        <Route exact path="/" component={Board} />
        <Route path="/chat/" component={Board} />
      </Switch>
    );
  }
};
