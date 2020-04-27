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
      :class="[placeholderStyle, placeholderTextSize]"
      class="flex items-center justify-center font-bold uppercase rounded-full"
    >{{ name && name[0] }}</div>
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
    id: Number,
    name: String,
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
  computed: {
    placeholderTextSize() {
      if (this.width >= 48 || this.height >= 48) {
        return 'text-2xl';
      }
      return '';
    },
    placeholderStyle() {
      const lastNumber = this.id.toString().slice(-1);
      switch (lastNumber) {
        case '0':
          return 'bg-black text-white';
        case '1':
          return 'bg-yellow-300 text-yellow-600';
        case '2':
          return 'bg-green-300 text-green-600';
        case '3':
          return 'bg-blue-200 text-blue-600';
        case '4':
          return 'bg-purple-200 text-purple-600';
        case '5':
          return 'bg-red-200 text-red-500';
        case '6':
          return 'bg-orange-200 text-orange-500';
        case '7':
          return 'bg-teal-200 text-teal-500';
        case '8':
          return 'bg-indigo-200 text-indigo-500';
        case '9':
          return 'bg-pink-200 text-pink-500';
        default:
          return 'bg-gray-300 text-gray-600';
      }
    },
  },
};
</script>
