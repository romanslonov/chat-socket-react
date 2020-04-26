<template>
  <div class="flex flex-col border-r shadow" style="width:320px">
    <div class="flex flex-col flex-grow p-2">
      <router-link to="/" v-slot="{ href, route, navigate, isActive, isExactActive }">
        <button
          @click="navigate"
          :class="[{'bg-gray-200': isExactActive}]"
          class="
            flex
            items-center
            text-left
            font-semibold
            rounded
            w-full
            focus:outline-none
            hover:bg-gray-200
            mb-4
            px-2
            py-3
          "
        >
          <svg class="text-gray-600 mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C5.92487 23 1 18.0751 1
            12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12
            23ZM19.3995 17.1246C20.4086 15.6703 21 13.9042 21 12C21 7.02944 16.9706 3 12
            3C7.02944 3 3 7.02944 3 12C3 13.9042 3.59138 15.6703 4.6005 17.1246C5.72595
            15.6381 8.3706 15 12 15C15.6294 15 18.274 15.6381 19.3995 17.1246ZM17.9647
            18.7398C17.672 17.6874 15.5694 17 12 17C8.43062 17 6.328 17.6874 6.03532
            18.7398C7.6233 20.1462 9.71194 21 12 21C14.2881 21 16.3767 20.1462 17.9647
            18.7398ZM12 15C9.76086 15 8 13.4274 8 10C8 7.75576 9.5791 6 12 6C14.4142 6 16 7.92158
            16 10.2C16 13.4796 14.2181 15 12 15ZM10 10C10 12.2693 10.8182 13 12 13C13.1777
            13 14 12.2984 14 10.2C14 8.95042 13.2157 8 12 8C10.7337 8 10 8.81582 10 10Z"
            fill="currentColor"/>
          </svg>
          Friends
        </button>
      </router-link>
      <div class="text-xs uppercase font-bold mb-2">Direct messages</div>
      <v-channels />
    </div>
    <div class="border-t p-2">
      <div class="flex items-center">
        <div v-if="user" class="flex items-center text-left w-full rounded truncate p-2">
          <v-avatar :url="user.avatar" :status="user.status" />
          <div class="overflow-hidden ml-2">
            <div class="truncate font-bold -mb-1">{{ user.name }}</div>
            <div class="truncate text-sm text-gray-600">{{ user.email }}</div>
          </div>
        </div>
        <div class="flex items-center ml-4">
          <button class="hover:bg-gray-200 rounded p-1" @click="openProfileSettings">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M13 11C11.1362 11 9.57006 9.72523
              9.12602 8H2V6H9.12602C9.57006 4.27477 11.1362 3 13 3C15.2091 3 17 4.79086 17 7C17
              9.20914 15.2091 11 13 11ZM19 6H22V8H19V6ZM8 21C6.13616 21 4.57006 19.7252 4.12602
              18H2V16H4.12602C4.57006 14.2748 6.13616 13 8 13C10.2091 13 12 14.7909 12 17C12 19.2091
              10.2091 21 8 21ZM14 18H22V16H14V18ZM10 17C10 18.1046 9.10457 19 8 19C6.89543 19 6
              18.1046 6 17C6 15.8954 6.89543 15 8 15C9.10457 15 10 15.8954 10 17ZM15 7C15 8.10457
              14.1046 9 13 9C11.8954 9 11 8.10457 11 7C11 5.89543 11.8954 5 13 5C14.1046 5 15
              5.89543 15 7Z" fill="black"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VAvatar from '@/components/Avatar.vue';
import VChannels from '@/components/Channels.vue';
import bus from '@/bus';

export default {
  name: 'Sidebar',
  computed: {
    user() {
      return this.$store.getters['user/profile'];
    },
  },
  methods: {
    openProfileSettings() {
      bus.$emit('modal.open', {
        title: 'Profile settings',
        component: () => import('@/components/modals/Profile'),
      });
    },
  },
  components: { VChannels, VAvatar },
};
</script>
