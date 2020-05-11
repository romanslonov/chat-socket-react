<template>
  <div>
    <div
      class="flex"
      :class="[message.user.id === currentUser.id ? 'justify-end' : 'justify-start']"
    >
      <div
        class="group flex items-center my-1"
        :class="[{'flex-row-reverse': message.user.id !== currentUser.id}]"
      >
        <time
          class="
            opacity-0
            group-hover:opacity-100
            block
            text-right
            text-xs
            text-gray-600
            mx-2
          "
          :datetime="message.createTime"
        >
          {{ transformMessageDate(message.createTime, 'h:mm a') }}
        </time>
        <div
          class="flex items-center rounded-full py-1 px-3"
          :class="[
            message.user.id === currentUser.id
              ? 'bg-black text-white rounded-br-none'
              : 'bg-gray-200 rounded-bl-none'
          ]"
        >{{ message.content }}</div>
      </div>
    </div>
    <div
      v-if="isLastMessage"
      class="flex items-center p-1"
      :class="[message.user.id === currentUser.id ? 'justify-end' : 'justify-start']"
    >
      <v-avatar
        class="mr-2"
        width="32"
        height="32"
        :id="message.user.id"
        :name="message.user.name"
        :url="message.user.avatar"
      />
      <span class="font-bold">{{ message.user.name}}</span>
    </div>
  </div>
</template>

<script>
import VAvatar from '@/components/Avatar.vue';
import { format, zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

export default {
  name: 'Message',
  props: {
    message: {
      type: Object,
      default: null,
    },
    isLastMessage: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentUser() {
      return this.$store.getters['user/profile'];
    },
  },
  methods: {
    transformMessageDate(_date, _format) {
      const date = zonedTimeToUtc(_date);
      const timeZone = 'Asia/Irkutsk';
      const zonedDate = utcToZonedTime(date, timeZone);
      return format(zonedDate, _format, { timeZone });
    },
  },
  components: { VAvatar },
};
</script>
