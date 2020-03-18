import { h, Component } from 'preact';
import UserCard from '../../components/userCard';
import Chat from '../../components/chat';

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
    const { cards } = this.state;
    return (
      <div className="flex mb-4 w-3/4 h-full self-start">
        <div className="w-1/4">
          {cards &&
            cards.map(item => {
              return item;
            })}
        </div>
        <div className="w-3/4">
          <Chat />
        </div>
      </div>
    );
  }
}
