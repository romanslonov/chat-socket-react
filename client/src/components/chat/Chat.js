import { h, Component } from 'preact';
import TextField from '../ui/TextField';
import Button from '../ui/Button';
import UserCard from '../userCard';

export default class Chat extends Component {
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
      <div className="h-full border overflow-hidden shadow-lg flex ml-8">
        <div className="p-4 flex items-center w-full h-full flex-col">
          <div className="w-3/4 h-full flex flex-col mb-6 overflow-y-auto">
            {cards &&
              cards.map(item => {
                return item;
              })}
          </div>
          <div className="flex flex-col items-center w-full">
            <div className="w-full flex items-center justify-center">
              <img
                className="w-10 h-10 rounded-full mb-2 mr-4"
                src="https://dummyimage.com/40x40/ddd/000.jpg"
                alt="Avatar of Jonathan Reinink"
              />
              <TextField
                id="textarea"
                type="text"
                placeholder="Write message..."
                label=""
                wrapClasses="w-3/4"
                classes="border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 h-24"
                name="textarea"
                multiple={true}
              />
              <img
                className="w-10 h-10 rounded-full mb-2 ml-4"
                src="https://dummyimage.com/40x40/ddd/000.jpg"
                alt="Avatar of Jonathan Reinink"
              />
            </div>
            <div className="w-3/4 flex items-center justify-end">
              <Button
                buttonText="Tools"
                classes="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              />
              <Button
                buttonText="Send"
                classes="w-48 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
