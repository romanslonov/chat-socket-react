<template>
  <div class="flex flex-col flex-grow">
    <div
      v-if="!channelsFetched && !userFetched"
      class="flex items-center justify-center flex-grow p-2"
    >
      Loading messages...
    </div>
    <main
      v-else
      ref="container"
      class="flex-grow overflow-auto p-2"
      style="max-height: calc(100vh - 81px - 64px);"
    >
      <!-- empty state -->
      <div v-if="messages.length === 0">
        <v-avatar
          :id="channel.users.find((ru) => ru.id !== currentUser.id).id"
          :name="channel.users.find((ru) => ru.id !== currentUser.id).name"
          class="mb-2"
          width="64"
          height="64"
          :url="channel.users.find((ru) => ru.id !== currentUser.id).avatar"
        />
        <div class="text-3xl font-bold">
          {{ channel.users.find((ru) => ru.id !== currentUser.id).name }}
        </div>
        <div class="text-gray-600">There is a begining of your chatting history...</div>
      </div>
      <!-- end empty state -->
      <!-- render grouped messages -->
      <div v-for="(group, gi) in messages" :key="gi" class="my-1">
        <v-message
          v-for="(message, mi) in group"
          :message="message"
          :is-last-message="group.length === (mi+1)"
          :key="message.id"
        />
      </div>
      <!-- end render grouped messages -->
    </main>
    <v-send-box />
  </div>
</template>

<script>
import VMessage from '@/components/Channel/Message.vue';
import VSendBox from '@/components/Channel/Sendbox.vue';
import VAvatar from '@/components/Avatar.vue';
import bus from '@/bus';
import { parseISO, differenceInMinutes } from 'date-fns';

const Events = {
  CHANNEL_TYPING: 'CHANNEL_TYPING',
};

export default {
  name: 'ChannelPage',
  data: () => ({
    tid: null,
  }),
  sockets: {
    [Events.CHANNEL_TYPING](payload) {
      this.$store.dispatch('channels/typing', payload);
    },
  },
  computed: {
    channel() {
      return this.$store.getters['channels/list']
        .find((r) => r.id === Number(this.$route.params.id));
    },
    messages() {
      const messages = this.channel
        ? this.channel.messages
        : null;
      const grouped = messages ? messages.reduce((group, message) => {
        if (group.length === 0) {
          group.unshift([message]);
        } else if (
          group[0][0].user.id === message.user.id
          && differenceInMinutes(parseISO(message.createTime), parseISO(group[0][0].createTime)) < 5
        ) {
          group[0].push(message);
        } else {
          group.unshift([message]);
        }
        return group;
      }, []) : [];
      return grouped.reverse();
    },
    currentUser() {
      return this.$store.getters['user/profile'];
    },
    channelsFetched() {
      return this.$store.getters['channels/fetched'];
    },
    userFetched() {
      return this.$store.getters['user/fetched'];
    },
    typing() {
      if (this.channel.typers.length > 2) {
        return 'Two or more people are typing...';
      }
      return `${this.channel.typers
        .map((typer) => typer.name)
        .reduce((prev, curr, i) => (i === 0 ? curr : `${prev}, ${curr}`), '')} typing...`;
    },
  },
  created() {
    bus.$on('GET_NEW_MESSAGE', (message) => {
      if (this.channel && this.channel.id === message.channel.id) {
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    });

    if (this.channel) {
      this.$store.dispatch('channels/getMessages', this.channel.id)
        .then(() => {
          this.scrollToBottom();
        });
    }
  },
  methods: {
    scrollToBottom() {
      this.$nextTick(() => {
        const { container } = this.$refs;
        if (!container) return;
        container.scrollTop = container.scrollHeight;
        window.console.log('[app]: Scroll to bottom.');
      });
    },
  },
  components: { VAvatar, VSendBox, VMessage },
  watch: {
    'channel.id': {
      handler(next) {
        this.$store.dispatch('channels/getMessages', next)
          .then(() => {
            this.scrollToBottom();
          });
        // this.scrollToBottom();
      },
    },
  },
};
</script>
