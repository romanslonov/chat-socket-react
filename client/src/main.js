import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import fetch from '@/fetch';
import VueSocketIOPlugin from 'vue-socket.io-extended';
import io from 'socket.io-client';
import './registerServiceWorker';
import { HOST } from './constants';
import './main.css';

Vue.config.productionTip = false;

const socket = io(`http://${HOST}:3000`, {
  autoConnect: false,
});

Vue.use(VueSocketIOPlugin, socket, { store });

Vue.prototype.$fetch = fetch;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
