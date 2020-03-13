import { h, Component } from "preact";
import style from "./style";
import { Button } from "../../components/ui/Button";
import UserCard from "../../components/userCard";
import Chat from "../../components/chat";

export default class Home extends Component {

  state = {
    cards: null
  }

  componentDidMount() {
    this.setState({
      cards: this.mockCards(5)
    })
  }

  mockCards = (n) => {
    let block = []
    for (let i = 0; i < n; i++) {
      block.push(<UserCard />)
    }
    return block
  }

  render() {
    const { cards } = this.state
    return (
      <div className={`${style.container} flex mb-4 w-3/4 h-full self-start`}>
        <div className="w-1/4">
          {cards && cards.map(item => {
            return item
          })}
        </div>
        <div className="w-3/4">
          <Chat/>
        </div>
      </div>
    );
  }
}
