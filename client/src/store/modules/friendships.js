import fetch from '@/fetch';

const FRIENDSHIPS_FETCH = 'FRIENDSHIPS_FETCH';
const FRIENDSHIPS_REQUEST = 'FRIENDSHIPS_REQUEST';
const FRIENDSHIPS_ACCEPT = 'FRIENDSHIPS_ACCEPT';
const FRIENDSHIPS_CANCEL = 'FRIENDSHIPS_CANCEL';
const SOCKET_FRIEND_REQUEST_SENT = 'SOCKET_FRIEND_REQUEST_SENT';
const SOCKET_FRIEND_REQUEST_ACCEPTED = 'SOCKET_FRIEND_REQUEST_ACCEPTED';
const SOCKET_FRIEND_REQUEST_CANCELED = 'SOCKET_FRIEND_REQUEST_CANCELED';
const SOCKET_GET_ONLINE_FRIENDS = 'SOCKET_GET_ONLINE_FRIENDS';
const SOCKET_USER_OFFLINE = 'SOCKET_USER_OFFLINE';
const SOCKET_USER_ONLINE = 'SOCKET_USER_ONLINE';

export default {
  namespaced: true,

  state: {
    fetched: false,
    friendships: [],
    online: [],
  },

  getters: {
    online: (state) => state.online,
    friends: (state, getters, rootState) => state.friendships
      .filter((f) => f.status === 'accepted')
      .map((item) => {
        const currentUser = rootState.user.profile;
        const prop = item.sender.id === currentUser.id ? 'target' : 'sender';
        const friend = { ...item[prop] };
        const { online } = state;

        friend.status = online.some((id) => id === friend.id) ? 'online' : 'offline';
        return friend;
      }),
    pending: (state, getters, rootState) => state.friendships
      .filter((f) => f.status === 'pending')
      .map((item) => {
        const currentUser = rootState.user.profile;
        const friend = { ...item };
        friend.type = currentUser.id === friend.lastActionByUserId ? 'outcome' : 'income';
        return friend;
      }),
    blocked: (state) => state.friendships.filter((f) => f.status === 'blocked'),
  },

  mutations: {
    [FRIENDSHIPS_FETCH]: (state, friendships) => {
      state.friendships = friendships;
      state.fetched = true;
    },
    [FRIENDSHIPS_REQUEST]: (state, request) => {
      state.friendships = [request, ...state.friendships];
    },
    [FRIENDSHIPS_ACCEPT]: (state, request) => {
      state.friendships = state.friendships.map((item) => {
        const friendship = { ...item };
        if (friendship.id === request.id) {
          friendship.status = 'accepted';
        }
        return friendship;
      });
    },
    [FRIENDSHIPS_CANCEL]: (state, request) => {
      state.friendships = state.friendships.filter((f) => f.id !== request.id);
    },
    [SOCKET_FRIEND_REQUEST_ACCEPTED]: (state, request) => {
      window.console.log(`[socket.io]: Friend request was accepted ${request.id}.`);
      state.friendships = state.friendships.map((item) => {
        const friendship = { ...item };
        if (friendship.id === request.id) {
          friendship.status = 'accepted';
        }
        return friendship;
      });
    },
    [SOCKET_FRIEND_REQUEST_CANCELED]: (state, request) => {
      window.console.log(`[socket.io]: Friend request was canceled ${request.id}.`);
      state.friendships = state.friendships.filter((f) => f.id !== request.id);
    },
    [SOCKET_FRIEND_REQUEST_SENT]: (state, request) => {
      window.console.log(`[socket.io]: New friend request from ${request.sender.email}.`);
      state.friendships = [request, ...state.friendships];
    },
    [SOCKET_GET_ONLINE_FRIENDS]: (state, list) => {
      state.online = list;
    },
    [SOCKET_USER_OFFLINE](state, { userId }) {
      window.console.log(`[socket.io]: ${userId} goes to offline!`);
      state.online = state.online.filter((id) => id !== userId);
    },
    [SOCKET_USER_ONLINE](state, { userId }) {
      window.console.log(`[socket.io]: ${userId} comes to online!`);
      state.online.push(userId);
    },
  },

  actions: {
    fetch({ commit }) {
      return fetch('/friendships/')
        .then((response) => response.json())
        .then(({ friendships }) => commit(FRIENDSHIPS_FETCH, friendships))
        .catch((error) => {
          throw error;
        });
    },
    request({ commit }, email) {
      return fetch('/friendships', {
        method: 'POST',
        body: JSON.stringify({ email }),
      })
        .then((response) => response.json())
        .then(({ request }) => {
          commit(FRIENDSHIPS_REQUEST, request);
        })
        .catch((error) => {
          throw error;
        });
    },
    accept({ commit }, friendship) {
      return fetch(`/friendships/${friendship.id}`, {
        method: 'POST',
      })
        .then((response) => response.json())
        .then(({ request }) => {
          commit(FRIENDSHIPS_ACCEPT, request);
        })
        .catch((error) => {
          throw error;
        });
    },
    cancel({ commit }, friendship) {
      return fetch(`/friendships/${friendship.id}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then(({ request }) => {
          commit(FRIENDSHIPS_CANCEL, request);
        })
        .catch((error) => {
          throw error;
        });
    },
  },
};
