const SOCKET_GET_ONLINE_FRIENDS = 'SOCKET_GET_ONLINE_FRIENDS';
const SOCKET_USER_OFFLINE = 'SOCKET_USER_OFFLINE';
const SOCKET_USER_ONLINE = 'SOCKET_USER_ONLINE';

export default {
  namespaced: true,

  state: {
    online: null,
  },

  getters: {
    list: (state) => state.online && state.online.map((u) => ({ status: 'online', ...u })),
  },

  mutations: {
    [SOCKET_GET_ONLINE_FRIENDS]: (state, list) => {
      state.online = list;
    },
    [SOCKET_USER_OFFLINE](state, { user }) {
      window.console.log(`[socket.io]: ${user.email} goes to offline!`);
      state.online = state.online.filter((userOnline) => userOnline.id !== user.id);
    },
    [SOCKET_USER_ONLINE](state, { user }) {
      window.console.log(`[socket.io]: ${user.email} comes to online!`);
      return state.online && state.online.push(user);
    },
  },

  actions: {},
};
