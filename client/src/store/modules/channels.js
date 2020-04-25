import fetch from '@/fetch';
import bus from '@/bus';

const CHANNELS_FETCH = 'CHANNELS_FETCH';
const CHANNELS_ADD = 'CHANNELS_ADD';
const CHANNELS_MESSAGE_ADD = 'CHANNELS_MESSAGE_ADD';
const SOCKET_MESSAGE_NEW = 'SOCKET_MESSAGE_NEW';
const SOCKET_CHANNEL_NEW = 'SOCKET_CHANNEL_NEW';

export default {
  namespaced: true,

  state: {
    fetched: false,
    list: null,
  },

  getters: {
    list: (state, getters, rootGetters) => (state.fetched ? state.list.map((c) => {
      const channel = { ...c };
      channel.lastMessage = channel.messages[channel.messages.length - 1];
      channel.messages = channel.messages.map((m) => {
        const message = { ...m };
        // some logic group here
        return message;
      });
      channel.users = channel.users.map((u) => {
        const user = { ...u };
        const { online } = rootGetters.online;
        user.status = online && online.some((onlineUser) => onlineUser.id === user.id)
          ? 'online'
          : 'offline';
        return user;
      });
      return channel;
    }) : []),
    fetched: (state) => state.fetched,
  },

  mutations: {
    [CHANNELS_FETCH]: (state, channels) => {
      state.list = channels;
      // .map((item) => {
      //   const channel = { ...item };
      //   // channel.lastMessage = channel.messages[channel.messages.length - 1] || null;
      //   return channel;
      // });
      state.fetched = true;
    },
    [CHANNELS_MESSAGE_ADD]: (state, message) => {
      state.list = state.list.map((item) => {
        const c = { ...item };
        if (c.id === message.channel.id) {
          c.messages = [...c.messages, message];
        }
        c.lastMessage = c.messages[c.messages.length - 1];
        return c;
      });
    },
    [SOCKET_MESSAGE_NEW]: (state, message) => {
      bus.$emit('GET_NEW_MESSAGE', message);
      state.list = state.list.map((item) => {
        const c = { ...item };
        if (c.id === message.channel.id) {
          c.messages = [...c.messages, message];
        }
        c.lastMessage = c.messages[c.messages.length - 1];
        return c;
      });
    },
    [CHANNELS_ADD]: (state, channel) => {
      state.list = [channel, ...state.list];
    },
    [SOCKET_CHANNEL_NEW]: (state, channel) => {
      state.list = [channel, ...state.list];
    },
  },

  actions: {
    fetch({ commit }) {
      return fetch('/channels/')
        .then((response) => response.json())
        .then(({ channels }) => commit(CHANNELS_FETCH, channels))
        .catch((error) => {
          throw error;
        });
    },
    create({ commit }, { userIds }) {
      return fetch('/channels', {
        method: 'POST',
        body: JSON.stringify({ userIds }),
      })
        .then((response) => response.json())
        .then(({ channel }) => {
          commit(CHANNELS_ADD, channel);
          return channel;
        })
        .catch((error) => {
          throw error;
        });
    },
    addMessage({ commit }, msg) {
      return fetch('/messages', {
        method: 'POST',
        body: JSON.stringify(msg),
      })
        .then((response) => response.json())
        .then(({ message }) => {
          commit(CHANNELS_MESSAGE_ADD, message);
          return message;
        })
        .catch((error) => {
          throw error;
        });
    },
  },
};
