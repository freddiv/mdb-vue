<template>
    <div ref="container" :style="containerStyle">
      <div class="inner" ref="inner" :style="inner">
      <div :style="style" ref="parallax" class="parallax">

      </div>

    </div>

  </div>
</template>

<script>
const Parallax = {
  name: 'Parallax',
  props: {
    imgUrl: {
      type: String
    },
    h: {
      type: [Number, String],
      default: '200px'
    },
  },
  data() {
    return {
      yOffset: null
    };
  },
  created () {
    window.addEventListener('scroll', this.yPosition);
  },
  mounted() {
    this.logOut();
    this.yPosition();
  },
  destroyed () {
    window.removeEventListener('scroll', this.yPosition);
  },
  methods: {
    logOut() {
      console.log(this.$refs.parallax.offsetTop);

    },
    yPosition() {
      // const bounding = this.$refs.parallax.getBoundingClientRect();
      const windowY = window.scrollY;
      // console.log(`bounding.top: ${bounding.top}`);
      // console.log(`window.scrollY: ${windowY}`);
      this.yOffset = windowY+'px';
    }
  },
  computed: {
    containerStyle() {
      return {
        position: 'relative',
        overflow: 'hidden',
        // transform: `translateY(${this.yOffset})`,
        height: this.h,
      };
    },
    inner() {
      return {
        transform: `translateY(-${this.yOffset})`,
        height: this.h,

      };
    },
    style() {
      return {
        'background-image': `url("${this.imgUrl}")`,
        'background-position': "center",
        'background-repeat': "no-repeat",
        'background-size': "cover",
        'background-attachment': 'fixed',
        height: this.h,

      };
    }

  }
};
export default Parallax;
export { Parallax as mdbParallax };
</script>

<style lang="scss" scoped>

</style>
