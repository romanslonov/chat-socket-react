import { API_ROOT, ENV_PRODUCTION } from '@/constants';

export default function fetch(_path, _options) {
  const token = window.localStorage.getItem('token');

  const options = {
    credentials: ENV_PRODUCTION ? 'include' : 'same-origin',
    hasToken: true,
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
    ..._options,
  };

  if (!options.hasToken) {
    delete options.headers.Authorization;
  }

  if (options.body instanceof FormData) {
    delete options.headers['Content-Type'];
  }

  const path = API_ROOT + _path;

  return new Promise((accept, reject) => {
    window.fetch(path, options).then((response) => {
      const { status } = response;

      if (status >= 400) {
        reject(response);
        // if (status === 401) {
        //   window.localStorage.removeItem('token');
        //   window.location.replace('/signin');
        // }
      } else {
        accept(response);
      }
    }, reject);
  });
}
