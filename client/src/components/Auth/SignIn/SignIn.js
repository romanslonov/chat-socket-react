import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextField from '../../../components/ui/TextField';
import Button from '../../../components/ui/Button';
import {withRouter} from 'react-router-dom'

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    error: false
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    const {email, password} = this.state
    e.preventDefault()
    this.props.signIn({email: email, password: password })
    .then(() => {
      this.props.history.push('/chat')
    }).catch((e) => {
      this.setState({
        error: true
      })
    })
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const {email, password, error} = this.state
    return (
      <div className="min-h-screen w-full flex items-center justify-center flex-col">
        <h1 className="text-4xl font-bold">Sign in.</h1>
        <form className="w-full md:max-w-lg mx-auto p-4" onSubmit={(e) => this.handleSubmit(e)}>
          {error && <h2>Error</h2>}
          <div className="mb-4">
            <TextField
              id="email"
              type="text"
              placeholder="eg. user@gmail.com"
              label="Email"
              name="email"
              onChange={e => this.handleChange(e)}
              value={email || ''}
              required
            />
          </div>
          <div className="mb-6">
            <TextField
              id="password"
              type="password"
              placeholder="******************"
              label="Password"
              labelClasses="block text-gray-700 text-sm font-bold mb-2"
              classes="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              onChange={e => this.handleChange(e)}
              value={password || ''}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <Button
              buttonText="Sign In"
              classes="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            />
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800"
              to="#"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(SignIn)
