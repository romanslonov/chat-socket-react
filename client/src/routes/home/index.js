import { h, Component } from 'preact';
import UserCard from '../../components/userCard';
import Chat from '../../components/chat';
import Sidebar from '../../components/sidebar';

export default class Home extends Component {
  state = {
    cards: null,
  };

  componentDidMount() {
    this.setState({
      cards: this.mockCards(5),
    });
  }

  mockCards = n => {
    const block = [];
    for (let i = 0; i < n; i += 1) {
      block.push(<UserCard />);
    }
    return block;
  };

  render() {
    return (
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="pl-64 flex-grow">
          <Chat />
        </div>
      </div>
    );
  }
}
