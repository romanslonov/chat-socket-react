<template>
  <div class="min-h-screen flex flex-col">
    <v-header></v-header>

    <div class="flex flex-grow">
      <v-sidebar />

      <div class="flex flex-col flex-grow">
        <router-view v-if="!!this.$route.params.id" />
        <div v-else class="flex flex-grow flex-col p-4">
          <v-chat-tabs />
        </div>
      </div>

      <!-- <div class="w-56 bg-gray-200 border-l p-4">
        <div class="font-bold">Activity</div>
        <div v-if="online">
          <div
            v-for="user in online"
            class="flex items-center flex-grow hover:bg-gray-100 rounded p-2"
            :key="user.id"
          >
            <div class="flex-shrink-0 h-8 w-8 rounded-full bg-gray-500">
              </div>
              <div class="flex-grow overflow-hidden ml-2">
                <div class="truncate font-bold">{{ user.email }}</div>
                <div class="text-sm text-gray-600">Online</div>
              </div>
            <div>
          </div>
        </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>

import VHeader from '@/components/Header.vue';
import VSidebar from '@/components/Sidebar.vue';
import VChatTabs from './Tabs.vue';

export default {
  name: 'Chat',
  data: () => ({}),
  computed: {
    user() {
      return this.$store.getters['user/profile'];
    },
    online() {
      return this.$store.getters['online/list'];
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
    VSidebar, VHeader, VChatTabs,
  },
};
</script>
