import fetch from '@/fetch';

const CHANNEL_SET = 'CHANNEL_SET';
const CHANNEL_UNSET = 'CHANNEL_UNSET';
const CHANNEL_MESSAGE_ADD = 'CHANNEL_MESSAGE_ADD';

export default {
  namespaced: true,

  state: {
    channel: null,
    fetched: false,
  },

  getters: {
    channel: (state) => state.channel,
    messages: (state) => (state.channel ? state.channel.messages : []),
    fetched: (state) => state.fetched,
  },

  mutations: {
    [CHANNEL_SET]: (state, channel) => {
      state.channel = channel;
      state.fetched = true;
    },
    [CHANNEL_UNSET]: (state) => {
      state.channel = null;
      state.fetched = false;
    },
    [CHANNEL_MESSAGE_ADD]: (state, message) => {
      state.channel.messages.push(message);
    },
  },

  actions: {
    set({ commit }, channel) {
      commit(CHANNEL_SET, channel);
    },
    unset({ commit }) {
      commit(CHANNEL_UNSET);
    },
    addMessage({ commit }, message) {
      return fetch('/messages', {
        method: 'POST',
        body: JSON.stringify(message),
      })
        .then(() => {
          commit(CHANNEL_MESSAGE_ADD, message);
        })
        .catch((error) => {
          throw error;
        });
    },
  },
};
