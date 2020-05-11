<template>
  <div class="text-center">
    <div class="flex flex-col justify-center items-center mb-4">
      <v-avatar width="96" height="96" :id="caller.id" :name="caller.name" :url="caller.avatar" />
      <h3 class="font-bold text-lg mt-2">{{ caller.name }} calling you</h3>
    </div>
    <div class="flex flex-wrap -m-2">
      <div class="w-full md:w-1/2 p-2">
        <button @click="decline" class="w-full h-10 bg-gray-300 hover:bg-gray-400 rounded">
          Decline
        </button>
      </div>
      <div class="w-full md:w-1/2 p-2">
        <button @click="accept" class="w-full h-10 bg-black text-white rounded">Accept</button>
      </div>
    </div>
  </div>
</template>

<script>
import VAvatar from '@/components/Avatar.vue';
import bus from '@/bus';

export default {
  name: 'VoiceCallModal',
  props: {
    callerId: Number,
  },
  computed: {
    caller() {
      return this.$store.getters['friendships/friends'].find((f) => f.id === this.callerId);
    },
  },
  methods: {
    accept() {
      bus.$emit('modal.close');
    },
    decline() {
      bus.$emit('modal.dismiss');
    },
  },
  components: { VAvatar },
};
</script>
