<template>
  <div class="flex flex-col flex-grow">
    <div v-if="!channelsFetched" class="flex items-center justify-center flex-grow p-2">
      Loading messages...
    </div>
    <main
      v-else
      ref="container"
      class="flex-grow overflow-auto p-4"
      style="max-height: calc(100vh - 72px - 64px);"
    >
      <!-- empty state -->
      <div v-if="messages.length === 0">
        <div class="w-16 h-16 bg-gray-500 rounded-full mb-2"></div>
        <div class="text-3xl font-bold">
          {{ channel.users.find((ru) => ru.id !== currentUser.id).name }}
        </div>
        <div class="text-gray-600">There is a begining of your chatting history...</div>
      </div>
      <!-- end empty state -->
      <!-- render grouped messages -->
      <div v-for="(group, gi) in messages" :key="gi">
        <div
          v-for="(message, mi) in group" :key="message.id"
          :class="{ 'flex justify-end': message.user.id === currentUser.id }"
        >
          <div :class="[ message.user.id === currentUser.id ? 'flex flex-col items-end' : '' ]">
            <div
              class="inline-block bg-gray-200 rounded-full px-4 py-1 my-1"
            >
              {{ message.content }}
            </div>
            <div v-if="mi === (group.length - 1)" class="flex items-center">
              <v-avatar class="mr-2" width="32" height="32" :url="message.user.avatar" />
              <div class="font-bold text-sm">
                {{ message.user.name}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end render grouped messages -->
      <div v-if="typers.length > 0">Someone is typing...</div>
    </main>
    <form @submit.prevent="handleSubmit" class="border-t shadow p-4">
      <div class="relative">
        <input
          class="placeholder-gray-600 bg-gray-200 rounded-full focus:outline-none w-full px-4 py-2"
          type="text"
          placeholder="Your message"
          v-model="message"
        />
        <button
          style="right:8px; top:8px;"
          type="submit"
          class="absolute bg-black text-white rounded-full px-3"
        >
          Send
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import VAvatar from '@/components/Avatar.vue';
import bus from '@/bus';

const MessageTypes = {
  TEXT: 'text',
};
const Events = {
  NEW_MESSAGE: 'NEW_MESSAGE',
  START_TYPING: 'START_TYPING',
  STOP_TYPING: 'STOP_TYPING',
};

export default {
  name: 'ChannelPage',
  data: () => ({
    message: '',
    typers: [],
    tid: null,
  }),
  sockets: {
    [Events.START_TYPING]({ user }) {
      this.typers.push(user);
    },
    [Events.STOP_TYPING]() {
      this.typers = [];
    },
  },
  computed: {
    fetched() {
      return this.$store.getters['channel/fetched'];
    },
    channel() {
      return this.$store.getters['channels/list']
        .find((r) => r.id === Number(this.$route.params.id));
    },
    messages() {
      const messages = this.channel
        ? this.channel.messages
        : [];
      const grouped = messages.reduce((group, message) => {
        if (group.length === 0) {
          group.unshift([message]);
        } else if (group[0][0].user.id === message.user.id) {
          group[0].push(message);
        } else {
          group.unshift([message]);
        }
        return group;
      }, []);
      return grouped.reverse();
    },
    currentUser() {
      return this.$store.getters['user/profile'];
    },
    channelsFetched() {
      return this.$store.getters['channels/fetched'];
    },
  },
  created() {
    this.scrollToBottom();

    bus.$on('GET_NEW_MESSAGE', (message) => {
      if (this.channel && this.channel.id === message.channel.id) {
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    });
  },
  async beforeDestroy() {
    await this.$store.dispatch('channel/unset');
    window.console.log('[app]: Previous channel was unset.');
  },
  methods: {
    // async setChannel(id = this.$route.params.id) {
    //   const channel = this.$store.getters['channels/list'].find((r) => r.id === Number(id));

    //   await this.$store.dispatch('channel/set', channel);

    //   console.log(`[app]: Channel #${channel.id} was set.`);

    //   this.scrollToBottom();
    //   console.log('[app]: scroll to bottom after channel loaded.');
    // },
    handleSubmit() {
      if (this.message === '') return;

      const message = {
        type: MessageTypes.TEXT,
        userId: this.currentUser.id,
        channelId: this.channel.id,
        content: this.message,
      };

      this.$store.dispatch('channels/addMessage', message)
        .then(() => {
          this.message = '';
          window.console.log('[app] Your message was sent and delivered.');
          this.scrollToBottom();
        });
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const { container } = this.$refs;
        if (!container) return;
        container.scrollTop = container.scrollHeight;
        window.console.log('[app]: Scroll to bottom.');
      });
    },
  },
  components: { VAvatar },
  watch: {
    // eslint-disable-next-line func-names
    'channel.id': {
      handler(next, prev) {
        if (next !== prev) {
          this.scrollToBottom();
        }
      },
    },
    /**
     * Indicate other people about typing...
     */
    message() {
      this.$socket.client.emit(
        Events.START_TYPING,
        { channelId: this.channel.id, user: this.currentUser },
      );

      // this.$socket.client.emit(
      //   Events.STOP_TYPING,
      //   { channelId: this.channel.id, user: this.currentUser },
      // );
    },
    // eslint-disable-next-line func-names
    // '$route.params.id': function (id) {
    //   this.setChannel(id);
    // },
    // eslint-disable-next-line func-names
    // 'messages.length': {
    //   deep: true,
    //   handler(next, prev) {
    //     if (next > prev) {
    //       this.scrollToBottom();
    //     }
    //   },
    // },
    // channelsFetched(fetched) {
    //   if (fetched) {
    //     this.setChannel();
    //   }
    // },
  },
};
</script>
