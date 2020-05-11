<template>
  <form @submit.prevent="handleSubmit" class="relative px-4 pt-4 pb-0">
    <div class="relative mb-6">
      <input
        class="
          placeholder-gray-600
          rounded-full
          focus:outline-none
          border-2
          focus:border-black
          w-full
          px-4
          py-2
        "
        type="text"
        placeholder="Your message"
        v-model="message"
        @input="handleInput"
      />
      <button
        style="right:8px; top:6px;"
        type="submit"
        class="flex items-center justify-center absolute bg-black text-white rounded-full h-8 w-8"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M21 3L1 11.5714L9.23529
          14.7647L12.4286 23L21 3ZM12.5212 17.7067L10.781 13.219L6.29326 11.4788L17.1921
            6.80789L12.5212 17.7067Z" fill="white"/>
        </svg>
      </button>
    </div>
    <div class="absolute text-xs font-bold" style="bottom:2px;">
      <div v-if="channel && channel.typers && channel.typers.length > 0">
        {{ typing }}
      </div>
    </div>
  </form>
</template>

<script>
import throttle from 'lodash.throttle';

const MessageTypes = {
  TEXT: 'text',
};
export default {
  name: 'Sendbox',
  data: () => ({
    message: '',
  }),
  computed: {
    channel() {
      return this.$store.getters['channels/list']
        .find((r) => r.id === Number(this.$route.params.id));
    },
  },
  methods: {
    handleInput: throttle(function () {
      this.$fetch(`/channels/${this.channel.id}/typing`, { method: 'POST' });
    }, 5000, { trailing: false }),
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
  },
};
</script>
