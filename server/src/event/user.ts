import { User } from '../entity/User';

export function signUpHandler(user: User) {
  console.log('[events]: SIGN_UP');
  console.log(user);
};
