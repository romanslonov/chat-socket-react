import fetch from '@/fetch';

const PROFILE_FETCH = 'PROFILE_FETCH';
const PROFILE_CLEAR = 'PROFILE_CLEAR';
const PROFILE_UPDATE_LAST_TIME_ACTIVE = 'PROFILE_UPDATE_LAST_TIME_ACTIVE';

export default {
  namespaced: true,

  state: {
    fetched: false,
    profile: null,
    authenticated: !!window.localStorage.getItem('token'),
    lastTimeActive: null,
  },

  getters: {
    profile: (state) => state.profile,
    lastTimeActive: (state) => state.lastTimeActive,
  },

  mutations: {
    [PROFILE_FETCH]: (state, profile) => {
      state.profile = profile;
      state.fetched = true;
    },
    [PROFILE_CLEAR]: (state) => {
      state.profile = null;
      state.fetched = false;
    },
    [PROFILE_UPDATE_LAST_TIME_ACTIVE]: (state, time) => {
      state.lastTimeActive = time;
    },
  },

  actions: {
    fetch({ commit }) {
      return fetch('/profile/')
        .then((response) => response.json())
        .then(({ user }) => commit(PROFILE_FETCH, user))
        .catch((error) => {
          throw error;
        });
    },
    clear({ commit }) {
      commit(PROFILE_CLEAR);
    },
    updateActivity({ commit }, time) {
      commit(PROFILE_UPDATE_LAST_TIME_ACTIVE, time);
    },
  },
};
