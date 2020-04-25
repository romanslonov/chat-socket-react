<template>
  <router-link :to="{ name: 'Channel', params: { id: channel.id }}">
    <template v-slot="{ navigate, isActive }">
      <button
        @click="navigate"
        class="
          flex
          items-center
          hover:bg-gray-200
          focus:outline-none
          rounded
          cursor-pointer
          text-left
          w-full
          max-w-full
          p-2
        "
        :class="[{ 'bg-gray-200': isActive }]"
      >
        <div class="relative">
          <div class="flex-shrink-0 h-10 w-10 bg-gray-500 rounded-full"></div>
          <div
            class="
              absolute
              right-0
              bottom-0
              w-3
              h-3
              border-2
              border-white
              rounded-full
            "
            :class="[
              {'bg-green-500': channelUser.status === 'online'},
              {'bg-gray-500': channelUser.status === 'offline'},
              {'bg-yellow-500': channelUser.status === 'away'},
              {'bg-red-500': channelUser.status === 'silent'},
            ]"
          ></div>
        </div>
        <div class="w-full overflow-hidden ml-2">
          <div class="flex">
            <div class="truncate flex-grow font-bold -mb-1">{{ channelName }}</div>
            <div class="text-sm text-gray-600 ml-2">Tue</div>
          </div>
          <div class="truncate text-sm text-gray-600">
            {{ channel.lastMessage && channel.lastMessage.content }}
          </div>
        </div>
      </button>
    </template>
  </router-link>
</template>

<script>
export default {
  name: 'Channel',
  props: {
    channel: Object,
  },
  // created() {
  //   this.$store.dispatch('channel/set', channel);
  // },
  computed: {
    currentUser() {
      return this.$store.getters['user/profile'];
    },
    channelUser() {
      return this.channel.users.find((ru) => ru.id !== this.currentUser.id);
    },
    channelName() {
      return this.channelUser.name;
    },
    // channels() {
    //   return this.$store.getters['channels/list'];
    // },
    // channels() {
    //   return this.$store.getters['channels/list'];
    // },
  },
};
</script>
