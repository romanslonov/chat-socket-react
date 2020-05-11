import Vue from 'vue';
import Vuex from 'vuex';

import user from '@/store/modules/user';
import channels from '@/store/modules/channels';
import friendships from '@/store/modules/friendships';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    channels,
    friendships,
  },
});
