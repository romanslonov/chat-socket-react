import { h, Component } from 'preact';
import { Router } from 'preact-router';

// Code-splitting is automated for routes
import Home from '../routes/home';
import SignIn from '../routes/auth/SignIn';
import SignUp from '../routes/auth/SignUp';

export default class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} e	"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} e.url	The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div id="app">
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <SignIn path="/signin" />
          <SignUp path="/signup" />
        </Router>
      </div>
    );
  }
}
