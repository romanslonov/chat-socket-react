import Vue from 'vue';
import Vuex from 'vuex';

import user from '@/store/modules/user';
import channel from '@/store/modules/channel';
import channels from '@/store/modules/channels';
import friendships from '@/store/modules/friendships';
import online from '@/store/modules/online';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    channel,
    channels,
    friendships,
    online,
  },
});
