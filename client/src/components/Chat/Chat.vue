<template>
  <div class="min-h-screen flex flex-col">
    <v-header></v-header>

    <div class="flex flex-grow">
      <v-sidebar />

      <div class="chat-content flex flex-col flex-grow">
        <router-view v-if="!!this.$route.params.id" />
        <div v-else class="flex flex-grow flex-col p-4">
          <v-chat-tabs />
        </div>
      </div>

      <div class="w-56 border-l">
        <v-channel-pane />
      </div>
    </div>
  </div>
</template>

<script>
import VChannelPane from '@/components/ChannelPane.vue';
import VHeader from '@/components/Header.vue';
import VSidebar from '@/components/Sidebar';
import VChatTabs from './Tabs.vue';

export default {
  name: 'Chat',
  data: () => ({}),
  computed: {
    user() {
      return this.$store.getters['user/profile'];
    },
    channel() {
      return this.$store.getters['channels/list'].find((c) => c.id === Number(this.$route.params.id));
    },
    channelUser() {
      return this.channel.users.find((u) => u.id !== this.user.id);
    },
  },
  mounted() {
    this.$store.dispatch('friendships/fetch');
    document.body.addEventListener('keydown', this.handleESCPress.bind(this));
  },
  methods: {
    handleESCPress(e) {
      if (e.keyCode === 27 && !!this.$route.params.id) {
        this.$router.push({ name: 'Home' });
      }
    },
  },
  components: {
    VSidebar, VHeader, VChatTabs, VChannelPane,
  },
};
</script>

<style lang="postcss">
@screen lg {
  .chat-content {
    padding-left: 320px;
  }
}
</style>
