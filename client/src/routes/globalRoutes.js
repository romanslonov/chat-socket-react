import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Board from '../components/Board';
import SignIn from '../components/Auth/SignIn'
import SignUp from '../components/Auth/SignUp'
import {ProtectedRoute} from '../components/Hocs/ProtectedRoute'

export default class GlobalRoutes extends Component {
  render () {
    return (
      <Switch>
        <ProtectedRoute exact path="/">
          <Board/>
        </ProtectedRoute>
        <ProtectedRoute path="/chat/">
          <Board/>
        </ProtectedRoute>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    );
  }
};
