<template>
  <header class="flex items-center h-16 shadow border-b">
    <router-link to="/" class="flex items-center font-bold text-lg pl-4" style="width:320px;">
      <v-logotype width="32" height="32" />
    </router-link>
    <div class="flex flex-grow justify-center items-center">
      <div v-if="header" class="text-center">
        <div class="font-bold -mb-1">{{ header.title }}</div>
        <div class="text-sm text-gray-600">{{ header.description }}</div>
      </div>
    </div>
    <div class="w-56 flex items-center justify-end pr-4">
      <button class="text-gray-600 hover:text-black">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.81818 3H21.1818C22.186 3 23 3.89543
          23 5V19C23 20.1046 22.186 21 21.1818 21H2.81818C1.81403 21 1 20.1046 1 19V5C1 3.89543
          1.81403 3 2.81818 3ZM3 5V19H14V5H3ZM16 5V19H21V5H16Z" fill="currentColor"/>
        </svg>
      </button>
    </div>
  </header>
</template>

<script>
import VLogotype from '@/components/Logotype.vue';

export default {
  computed: {
    channel() {
      return this.$store.getters['channels/list']
        .find((r) => r.id === Number(this.$route.params.id));
    },
    currentUser() {
      return this.$store.getters['user/profile'];
    },
    header() {
      if (!this.channel || !this.channel.users) return null;

      const user = this.channel.users.find((ru) => ru.id !== this.currentUser.id);

      if (this.channel.users.length === 2) {
        return {
          title: user.name,
          description: user.status,
        };
      }

      return {
        title: 'Group chat',
        description: `${this.channel.users.length} members`,
      };
    },
  },
  components: { VLogotype },
};
</script>
