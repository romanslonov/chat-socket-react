<template>
  <div class="fixed bottom-0 left-0 right-0 flex justify-center max-w-xl mx-auto p-4">
    <div v-for="toast in toasts" :key="toast.id">
      <div class="inline-block bg-black text-white rounded p-2">
        {{ toast.message }}
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/bus';

export default {
  data: () => ({
    toasts: [],
  }),
  created() {
    bus.$on('toast.new', (toast) => {
      this.toasts.push(toast);
    });
  },
};
</script>

<style>

</style>
