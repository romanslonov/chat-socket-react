import fetch from '@/fetch';
import bus from '@/bus';
import debounce from 'lodash.debounce';

const CHANNELS_FETCH = 'CHANNELS_FETCH';
const CHANNELS_ADD = 'CHANNELS_ADD';
const CHANNELS_MESSAGE_ADD = 'CHANNELS_MESSAGE_ADD';
const CHANNELS_MESSAGES_INSERT = 'CHANNELS_MESSAGES_INSERT';
const SOCKET_MESSAGE_NEW = 'SOCKET_MESSAGE_NEW';
const SOCKET_CHANNEL_NEW = 'SOCKET_CHANNEL_NEW';
const CHANNEL_START_TYPING = 'CHANNEL_START_TYPING';
const CHANNEL_STOP_TYPING = 'CHANNEL_STOP_TYPING';

export default {
  namespaced: true,

  state: {
    fetched: false,
    list: null,
  },

  getters: {
    list: (state, getters, rootGetters) => (state.fetched ? state.list.map((c) => {
      const channel = { ...c };
      // channel.lastMessage = channel.messages[channel.messages.length - 1];
      // channel.messages = channel.messages.map((m) => {
      //   const message = { ...m };
      //   // const { user } = rootGetters;
      //   // message.unread = user
      //   //   && user.lastTimeActive
      //   //   && new Date(message.createTime).getTime() >= user.lastTimeActive;
      //   return message;
      // });
      channel.users = channel.users.map((u) => {
        const user = { ...u };
        const { online } = rootGetters.friendships;
        user.status = online.some((id) => id === user.id)
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
      state.list = channels
        .map((item) => {
          const channel = { ...item };
          channel.messages = channel.messages || [];
          // channel.lastMessage = channel.messages[channel.messages.length - 1] || null;
          return channel;
        });
      state.fetched = true;
    },
    [CHANNELS_MESSAGE_ADD]: (state, message) => {
      state.list = state.list.map((item) => {
        const c = { ...item };
        if (c.id === message.channel.id) {
          c.messages = [...c.messages, message];
        }
        // c.lastMessage = c.messages[c.messages.length - 1];
        return c;
      });
    },
    [CHANNELS_MESSAGES_INSERT]: (state, { channelId, messages }) => {
      state.list = state.list.map((item) => {
        if (item.id === channelId) {
          const channel = { ...item };
          channel.messages = messages;
          return channel;
        }
        return item;
      });
    },
    [SOCKET_MESSAGE_NEW]: (state, message) => {
      bus.$emit('GET_NEW_MESSAGE', message);
      state.list = state.list.map((item) => {
        const c = { ...item };
        if (c.id === message.channel.id) {
          c.messages = [...c.messages, message];
        }
        // c.lastMessage = c.messages[c.messages.length - 1];
        return c;
      });
    },
    [CHANNELS_ADD]: (state, channel) => {
      state.list = [channel, ...state.list];
    },
    [SOCKET_CHANNEL_NEW]: (state, channel) => {
      state.list = [channel, ...state.list];
    },
    [CHANNEL_START_TYPING]: (state, { userId, channelId }) => {
      state.list = state.list.map((item) => {
        const channel = { ...item };
        if (channel.id === Number(channelId)) {
          const user = channel.users.find((u) => u.id === userId);
          channel.typers = [...channel.typers || [], user];
        }
        return channel;
      });
      window.console.log(`User #${userId} started typing in channel #${channelId}.`);
    },
    [CHANNEL_STOP_TYPING]: (state, { userId, channelId }) => {
      state.list = state.list.map((item) => {
        const channel = { ...item };
        if (channel.id === Number(channelId)) {
          channel.typers = channel.typers.filter((t) => t.id !== userId);
        }
        return channel;
      });
      window.console.log(`User #${userId} stoped typing in channel #${channelId}.`);
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
    typing({ commit }, { userId, channelId }) {
      // eslint-disable-next-line
      const debounced = debounce(function () {
        commit(CHANNEL_STOP_TYPING, { userId, channelId });
      }, 5000);
      commit(CHANNEL_START_TYPING, { userId, channelId });
      debounced();
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
    getMessages({ commit }, channelId) {
      return fetch(`/channels/${channelId}/messages?limit=50`)
        .then((response) => response.json())
        .then(({ messages }) => {
          commit(CHANNELS_MESSAGES_INSERT, { channelId, messages });
          return messages;
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
