import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../../../utils/Auth';

export default class ProtectedRoute extends Component {
  render() {
    return (
      <Route
        {...this.rest}
        render={({ location }) =>
          Auth.isUserAuthenticated() ? (
            this.props.children
          ) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }
}
