<template>
  <component :is="tag" :class="outerClasses">
    <component :is="innerTag" :class="innerClasses">

      <slot></slot>
    </component>
  </component>
</template>

<script>
import classNames from 'classnames';

const FlippingCard = {
  props: {
    tag: {
      type: String,
      default: "div"
    },
    innerTag: {
      type: String,
      default: "div"
    },
    flipped: {
      type: Boolean,
      default: false
    },
    outerClass: {
      type: [String, Array],
      default: ''
    },
    innerClass: {
      type: [String, Array],
      default: ''
    }
  },
  computed: {
    outerClasses() {
      return classNames(
        'card-wrapper',
        this.outerClass
      );
    },
    innerClasses() {
      return classNames(
        'card-rotating effect__click',
        this.flipped && 'flipped',
        this.innerClass
      );
    }
  }
};

export default FlippingCard;
export { FlippingCard as mdbFlippingCard };
</script>

<style scoped>
</style>
