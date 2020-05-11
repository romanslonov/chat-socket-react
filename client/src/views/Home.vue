<template>
  <div>
    <v-toast />
    <v-modal />
    <v-chat />
  </div>
</template>

<script>
import VChat from '@/components/Chat';
import VModal from '@/components/Modal';
import VToast from '@/components/Toast.vue';

export default {
  name: 'Home',
  sockets: {
    connect() {
      window.console.log('[socket.io]: Connected.');
      // this.$socket.client.emit('GET_ONLINE_FRIENDS');
    },
    disconnect() {
      window.console.error('[socket.io]: Disconnected.');
    },
  },
  created() {
    this.$store.dispatch('user/fetch');
  },
  mounted() {
    this.$socket.client.io.opts.query = { token: window.localStorage.getItem('token') };
    this.$socket.client.open();
    window.onfocus = () => {
      window.console.log('[app]: Focused.');
      this.$store.dispatch('user/updateActivity', null);
    };
    window.onblur = () => {
      window.console.log('[app]: Blured.');
      this.$store.dispatch('user/updateActivity', new Date().getTime());
    };
  },
  components: { VChat, VModal, VToast },
};
</script>
