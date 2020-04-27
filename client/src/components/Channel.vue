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
        <v-avatar
          class="flex-shrink-0"
          :name="channelUser.name"
          :id="channelUser.id"
          :url="channelUser.avatar"
          :status="channelUser.status"
        />
        <div class="w-full overflow-hidden ml-2">
          <div class="flex">
            <div class="truncate flex-grow font-bold -mb-1">{{ channelName }}</div>
            <div class="text-sm text-gray-600 ml-2">Tue</div>
          </div>
          <div class="truncate text-sm text-gray-600">
            {{
              channel.typers && channel.typers.length > 0
              ? 'typing...'
              : channel.lastMessage && channel.lastMessage.content
            }}
          </div>
        </div>
      </button>
    </template>
  </router-link>
</template>

<script>
import VAvatar from '@/components/Avatar.vue';

export default {
  name: 'Channel',
  props: {
    channel: Object,
  },
  computed: {
    currentUser() {
      return this.$store.getters['user/profile'];
    },
    channelUser() {
      return this.channel.users.find((u) => u.id !== this.currentUser.id);
    },
    channelName() {
      return this.channelUser.name;
    },
  },
  components: { VAvatar },
};
</script>
