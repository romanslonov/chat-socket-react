<template>
  <div class="relative">
    <img
      v-if="url"
      :src="url"
      alt="avatar"
      class="rounded-full bg-gray-500"
      :style="{ width: `${width}px`, height: `${height}px`}"
    />
    <div
      v-else
      :style="{ width: `${width}px`, height: `${height}px`}"
      class="rounded-full bg-gray-500"
    ></div>
    <div
      v-if="status"
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
        {'bg-green-500': status === 'online'},
        {'bg-gray-500': status === 'offline'},
      ]"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    url: String,
    status: String,
    width: {
      type: [String, Number],
      default: 40,
    },
    height: {
      type: [String, Number],
      default: 40,
    },
  },
};
</script>
