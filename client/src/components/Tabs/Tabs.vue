<template>
  <div>
    <ul class="flex items-center">
      <li
        v-for="(tab, index) in tabList"
        v-bind="tab.dataAttrs"
        :key="index"
        class="cursor-pointer font-semibold px-2 py-1 mr-4"
        :class="{
          'bg-black rounded text-white': isActive(index),
          'disabled': tab.disabled
        }"
        @click="select(index)"
      >
        {{ tab.title }}
      </li>
    </ul>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    tabList: [],
    activeTabIndex: 0,
  }),
  mounted() {
    this.select(0);
    this.activeTabIndex = this.getInitialActiveTab();
  },
  methods: {
    isActive(index) {
      return this.activeTabIndex === index;
    },
    select(index) {
      const tab = this.tabList[index];
      if (!tab.isDisabled) {
        this.activeTabIndex = index;
      }
      this.$emit('changed', tab);
    },
    getInitialActiveTab() {
      const index = this.tabList.findIndex((tab) => tab.active);
      return index === -1 ? 0 : index;
    },
  },
};
</script>
