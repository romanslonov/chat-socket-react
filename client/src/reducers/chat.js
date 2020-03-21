import { handleActions } from 'redux-actions';
import actions from '../actions/chat';

const initialState = {
  rooms: [
    {
      id: 0,
      user: {
        firstName: 'Peter',
        lastName: 'Markovich',
        email: 'peterm@gmail.com',
      },
      text: 'How can I connect to socket.io? on the client side',
      active: true,
    },
    {
      id: 1,
      user: {
        firstName: 'John',
        lastName: 'Olson',
        email: 'olson@gmail.com',
      },
      text: 'Hey whats up man?',
      active: false,
    },
  ],
  activeNav: null
};

const reducerMap = {
  [actions.navToggle]: (state, { payload }) => {
    return {
      ...state,
      activeNav: payload,
    };
  },
};

export default handleActions(reducerMap, initialState);
