import { h, Component } from 'preact';
import { Link } from 'preact-router';
import TextField from '../../../components/ui/TextField';
import Button from '../../../components/ui/Button';

export default class SignIn extends Component {
  state = {};

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <h1 className="text-4xl font-bold">Join our chat.</h1>
        <form className="w-full md:max-w-lg mx-auto p-4">
          <div className="mb-4">
            <TextField
              id="email"
              type="email"
              placeholder="Email"
              label="Email"
              value=""
              name="email"
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
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <Button
              buttonText="Sign Up"
              classes="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            />
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800"
              href="/signin"
            >
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
