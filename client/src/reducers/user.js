import { handleActions } from 'redux-actions';
import actions from '../actions/user';

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
    signIn: false
};

const reducerMap = {
  [actions.signIn.request]: (state) => {
    return {
      ...state,
      loading: true,
      error: false
    };
  },
  [actions.signIn.receive]: (state, { payload }) => {
    return {
      ...state,
      currentUser: payload,
      loading: false,
      signIn: true
    };
  },
  [actions.signIn.error]: (state, { payload }) => {
    return {
      ...state,
      loading: false,
      error: payload,
      signIn: false
    };
  },
};

export default handleActions(reducerMap, initialState);
