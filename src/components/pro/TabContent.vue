<template>
  <component :is="tag" :class="className">
    <slot></slot>
  </component>
</template>

<script>
import classNames from 'classnames';

const TabContent = {
  props: {
    tag: {
      type: String,
      default: "div"
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    className() {
      return classNames(
        'tab-content',
        this.vertical && 'vertical'
      );
    }
  }
};

export default TabContent;
export { TabContent as mdbTabContent };
</script>

<style scoped>
</style>
