import { API_ROOT, ENV_PRODUCTION } from '../constants';
import Auth from '../utils/Auth';

export default function request(_path, _options) {
  const options = Object.assign({
    credentials: ENV_PRODUCTION ? 'include' : 'same-origin',
    hasToken: true,
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${Auth.getToken()}`,
      'Content-Type': 'application/json',
    },
  }, _options);

  if (!options.hasToken) {
    delete options.headers.Authorization;
  }

  if (options.body instanceof FormData) {
    delete options.headers['Content-Type'];
  }

  let path =  API_ROOT + _path;

  return new Promise((accept, reject) => {
    window.fetch(path, options).then((response) => {
      const { status } = response;

      if (status >= 400) {
        reject(response);
      } else {
        accept(response.json());
      }
    }, reject);
  });
}