<template>
  <div class="flex flex-col flex-grow">
    <div class="flex flex-col flex-grow" v-if="fetched" >
      <ul v-if="channels.length > 0" class="w-full">
        <li class="mb-1" v-for="channel in channels" :key="channel.id">
          <v-channel :channel="channel" />
        </li>
      </ul>
      <div v-else class="flex flex-grow flex-col items-center justify-center font-bold">
        No direct messages
      </div>
    </div>
    <div v-else class="flex flex-grow flex-col items-center justify-center font-bold">
      Loading...
    </div>
  </div>
</template>

<script>
import VChannel from '@/components/Channel.vue';

export default {
  name: 'Channels',
  computed: {
    channels() {
      return this.$store.getters['channels/list'];
    },
    fetched() {
      return this.$store.getters['channels/fetched'];
    },
  },
  created() {
    this.$store.dispatch('channels/fetch');
  },
  components: { VChannel },
};
</script>
