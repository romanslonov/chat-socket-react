<template>
  <v-tabs>
    <v-tab active title="Squad">
      <div class="py-8">
        <!-- form add friends -->
        <div class="mb-4">
          <form
            @submit.prevent="friendRequest"
            class="w-full bg-gray-200 rounded p-4"
          >
            <h3 class="font-bold text-lg text-left mb-2">Send a friend request</h3>
            <div class="flex items-center">
              <input
                required
                class="
                  flex-grow
                  placeholder-gray-600
                  text-black
                  border
                  focus:border-black
                  focus:outline-none
                  rounded
                  mr-2
                  p-2
                "
                v-model="email"
                type="email"
                placeholder="Friend email"
              />
              <button class="bg-black text-white px-16 py-2 rounded" type="submit">Send</button>
            </div>
          </form>
        </div>
        <!-- end form add friends -->
        <div class="text-center" v-if="friends.length === 0">
          <div class="text-3xl">🤔</div>
          <div class="font-bold text-xl">Really? You don't have friends?</div>
          <div class="text-gray-600  mb-4">Add your friends now to have fun.</div>
          <!-- <button class="bg-black rounded text-white px-2 py-1 mb-4">Add a friend</button> -->
        </div>
        <div v-else>
          <!-- online -->
          <div v-if="online.length > 0" class="mb-4">
            <h3 class="font-bold text-xs uppercase text-gray-600 mb-1">Online</h3>
            <button
              @click="handleFriendClick(friend)"
              class="
                flex
                items-center
                flex-grow
                hover:bg-gray-200
                rounded
                w-full
                text-left
                focus:outline-none
                p-2
              "
              v-for="friend in online" :key="friend.id"
            >
              <v-avatar
                :id="friend.id"
                :name="friend.name"
                :url="friend.avatar"
                :status="friend.status"
              />
              <div class="flex-grow overflow-hidden ml-2">
                <div class="truncate font-bold">
                  {{ friend.name }}
                </div>
                <div class="text-sm text-gray-600">{{ friend.status }}</div>
              </div>
              <div class="flex items-center">
                <button class="text-gray-600 hover:text-black ml-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C5.92487 23 1
                    18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23
                    18.0751 18.0751 23 12 23ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944
                    16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12
                    21ZM8.70711 16.7071L12 13.4142L15.2929 16.7071L16.7071 15.2929L13.4142
                      12L16.7071 8.70711L15.2929 7.29289L12 10.5858L8.70711 7.29289L7.29289
                      8.70711L10.5858 12L7.29289 15.2929L8.70711 16.7071Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </button>
          </div>
          <!-- offline -->
          <div v-if="offline.length > 0">
            <h3 class="font-bold text-xs uppercase text-gray-600 mb-1">Offline</h3>
            <button
              @click="handleFriendClick(friend)"
              class="
                flex
                items-center
                flex-grow
                hover:bg-gray-200
                rounded
                w-full
                text-left
                focus:outline-none
                p-2
              "
              v-for="friend in offline" :key="friend.id"
            >
              <v-avatar
                :id="friend.id"
                :name="friend.name"
                :url="friend.avatar"
                :status="friend.status"
              />
              <div class="flex-grow overflow-hidden ml-2">
                <div class="truncate font-bold">
                  {{ friend.name }}
                </div>
                <div class="text-sm text-gray-600">{{ friend.status }}</div>
              </div>
              <div class="flex items-center">
                <button class="text-gray-600 hover:text-black ml-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C5.92487 23 1
                    18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23
                    18.0751 18.0751 23 12 23ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944
                    16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12
                    21ZM8.70711 16.7071L12 13.4142L15.2929 16.7071L16.7071 15.2929L13.4142
                      12L16.7071 8.70711L15.2929 7.29289L12 10.5858L8.70711 7.29289L7.29289
                      8.70711L10.5858 12L7.29289 15.2929L8.70711 16.7071Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </button>
          </div>
        </div>
      </div>
    </v-tab>
    <v-tab title="Pending">
      <div>
        <div
          class="text-center py-16"
          v-if="pending.length === 0"
        >
          <div class="text-3xl">👀</div>
          <div class="font-bold text-xl">No friend requests</div>
          <div class="text-gray-600">Add your friends now to have fun.</div>
        </div>
        <div v-else>
          <div class="flex items-center">
            <div
              class="flex items-center flex-grow hover:bg-gray-200 rounded p-2"
              v-for="request in pending" :key="request.id"
            >
              <v-avatar :id="friend.id" :name="friend.name" :url="friend.avatar" />
              <div class="flex-grow overflow-hidden ml-2">
                <div class="truncate font-bold">
                  {{ request[request.type === 'outcome' ? 'target' : 'sender'].name }}
                </div>
                <div class="text-sm text-gray-600">{{ request.type }} friend request</div>
              </div>
              <div>
                <button @click="acceptRequest(request)" v-if="request.type === 'income'">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C5.92487 23 1
                    18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23
                    18.0751 18.0751 23 12 23ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944
                    16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12
                    21ZM15.2929 8.29289L10 13.5858L7.70711 11.2929L6.29289 12.7071L10
                    16.4142L16.7071 9.70711L15.2929 8.29289Z" fill="black"/>
                  </svg>
                </button>
                <button @click="cancelRequest(request)" class="ml-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C5.92487 23 1
                    18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23
                    18.0751 18.0751 23 12 23ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944
                    16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12
                    21ZM8.70711 16.7071L12 13.4142L15.2929 16.7071L16.7071 15.2929L13.4142
                      12L16.7071 8.70711L15.2929 7.29289L12 10.5858L8.70711 7.29289L7.29289
                      8.70711L10.5858 12L7.29289 15.2929L8.70711 16.7071Z" fill="black"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-tab>
    <v-tab title="Blocked">
      <div class="py-16">
        <div
          class="text-center"
          v-if="blocked.length === 0"
        >
          <div class="text-3xl">😍</div>
          <div class="font-bold text-xl">You seems pretty friendly</div>
          <div class="text-gray-600">...for now.</div>
        </div>
      </div>
    </v-tab>
  </v-tabs>
</template>

<script>
import { VTabs, VTab } from '@/components/Tabs';
import VAvatar from '@/components/Avatar.vue';

export default {
  data: () => ({
    email: '',
  }),
  computed: {
    channels() {
      return this.$store.getters['channels/list'];
    },
    friends() {
      return this.$store.getters['friendships/friends'];
    },
    offline() {
      return this.friends.filter((f) => f.status === 'offline');
    },
    online() {
      return this.friends.filter((f) => f.status === 'online');
    },
    pending() {
      return this.$store.getters['friendships/pending'];
    },
    blocked() {
      return this.$store.getters['friendships/blocked'];
    },
    fetchedFriendships() {
      return this.$store.getters['friendships/fetched'];
    },
    user() {
      return this.$store.getters['user/profile'];
    },
  },
  methods: {
    friendRequest() {
      return this.$store.dispatch('friendships/request', this.email);
    },
    acceptRequest(request) {
      return this.$store.dispatch('friendships/accept', request);
    },
    cancelRequest(request) {
      return this.$store.dispatch('friendships/cancel', request);
    },
    handleChatClick(friend) {
      window.console.log(`[app]: start new channel with ${friend.email}`);
      return this.$store.dispatch('channels/create', { userIds: [friend.id] })
        .then((res) => {
          window.console.log(res);
        });
    },
    handleFriendClick(friend) {
      const channel = this.channels.find((ch) => {
        if (ch.users.length > 2) {
          return false;
        }
        return ch.users.some((user) => user.id === friend.id);
      });
      if (channel) {
        return this.$router.push({ name: 'Channel', params: { id: channel.id } }).catch(() => {});
      }
      return this.$store.dispatch('channels/create', { userIds: [friend.id] })
        .then((newChannel) => {
          this.$router.push({ name: 'Channel', params: { id: newChannel.id } });
        });
    },
  },
  components: {
    VTabs, VTab, VAvatar,
  },
};
</script>
