<template>
  <transition name="modal" @after-enter="onEnter" @after-leave="onLeave">
    <div
      v-if="opened"
      ref="backdrop"
      @click="dismiss"
      @keydown.esc.stop="dismiss"
      :class="[`modal--${options.size}`]"
      class="modal-backdrop fixed inset-0 z-20 flex items-center justify-center"
    >
      <div
        ref="container"
        tabindex="-1"
        @click.stop
        class="modal-container bg-white rounded p-4"
      >
        <div class="flex items-center mb-2">
          <div class="flex-grow font-bold text-lg">{{ options.title }}</div>
          <button @click="dismiss">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C5.92487 23 1 18.0751 1 12C1
              5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM12
              21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3
              16.9706 7.02944 21 12 21ZM8.70711 16.7071L12 13.4142L15.2929 16.7071L16.7071
              15.2929L13.4142 12L16.7071 8.70711L15.2929 7.29289L12 10.5858L8.70711
              7.29289L7.29289 8.70711L10.5858 12L7.29289 15.2929L8.70711 16.7071Z" fill="black"/>
            </svg>
          </button>
        </div>
        <component :is="options.component" v-bind="options.props" />
      </div>
    </div>
  </transition>
</template>

<script>
import bus from '@/bus';

export default {
  name: 'Modal',
  data: () => ({
    options: {
      size: 'md',
    },
    opened: false,
  }),
  created() {
    bus.$on('modal.open', (options) => {
      this.open(options);
    });

    bus.$on('modal.close', (data) => {
      this.close(data);
    });

    bus.$on('modal.dismiss', () => {
      this.dismiss();
    });
  },
  methods: {
    open(options) {
      this.options = { ...options, ...this.options };
      this.opened = true;

      this.$nextTick(() => {
        this.$refs.container.focus();
      });
    },
    close(data) {
      this.opened = false;

      if (this.options.onClose && typeof this.options.onClose === 'function') {
        this.options.onClose(data);
      }
    },
    dismiss() {
      this.opened = false;

      if (this.options.onDismiss && typeof this.options.onDismiss === 'function') {
        this.options.onDismiss();
      }
    },
    onEnter() {
      bus.$emit('modal.opened', {
        options: this.options,
      });
    },
    onLeave() {
      bus.$emit('modal.destroyed');
      // document.body.classList.remove(modalOpenClass);
    },
  },
};
</script>

<style lang="postcss">
.modal-backdrop {
  background-color: hsla(0, 0%, 0%, 0.8);
  transition: opacity 0.3s ease;
}
.modal-container {
  transition: transform 0.3s ease;
}
.modal--md .modal-container {
  width: 560px;
}
.modal-enter, .modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container, .modal-leave-active .modal-container {
  transform: scale(1.1);
}

</style>
