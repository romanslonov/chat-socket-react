import { h, Component } from 'preact';
import style from './style.css';

export default class UserCard extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div className={`${style.card} w-full overflow-hidden border-b flex p-4`}>
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src="https://dummyimage.com/40x40/ddd/000.jpg"
            alt="Avatar of Jonathan Reinink"
          />
          <div className="text-sm">
            <p className="text-gray-900 leading-none">Jonathan Reinink</p>
            <p className="text-gray-600">Aug 18</p>
          </div>
        </div>
      </div>
    );
  }
}
