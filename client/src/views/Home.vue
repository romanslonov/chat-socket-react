<template>
  <div class="home">
    <v-chat />
  </div>
</template>

<script>
import VChat from '@/components/Chat';

export default {
  name: 'Home',
  sockets: {
    connect() {
      window.console.log('[socket.io]: Connected.');
      this.$socket.client.emit('GET_ONLINE_FRIENDS');
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
      window.console.log('tab was focused');
    };
    window.onblur = () => {
      window.console.log('tab was blured');
      this.$store.dispatch('user/updateActivity', new Date());
    };
  },
  components: { VChat },
};
</script>
