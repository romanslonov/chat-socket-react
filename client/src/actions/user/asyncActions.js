import actions from './actions';
import request from '../../utils/request';
import Auth from '../../utils/Auth';

export const signIn = data =>
  async function thunk(...args) {
    const [dispatch] = args;
    dispatch(actions.signIn.request());
    try {
      const { user, token } = await request(`/signin`, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      Auth.authenticateUser(token);

      dispatch(actions.signIn.receive(user));
    } catch (error) {
      dispatch(actions.signIn.error(error));
      throw error
    }
  };

export const signUp = data =>
  async function thunk(...args) {
    const [dispatch] = args;
    dispatch(actions.signUp.request());
    try {
      const { user, token } = await request(`/signup`, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      Auth.authenticateUser(token);

      dispatch(actions.signIn.receive(user));
    } catch (error) {
      dispatch(actions.signIn.error(error));
      throw error
    }
  };
  
export const getUserProfile = () =>
  async function thunk(...args) {
    const [dispatch] = args;
    dispatch(actions.getUserProfile.request());
    try {
      const { user } = await request(`/profile`, {
        method: 'GET',
      });

      dispatch(actions.signIn.receive(user));
    } catch (error) {
      dispatch(actions.getUserProfile.error(error));
      throw error
    }
  };
