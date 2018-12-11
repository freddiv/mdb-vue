<template>
  <div id="app" class="flyout">
    <ChemtoxHeader></ChemtoxHeader>
    <login-form></login-form>
    <main :style="{marginTop: '60px'}">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </main>
  <epa-footer></epa-footer>
  </div>
</template>

<script>
import ChemtoxHeader from './EpaComponents/ChemtoxHeader';
import LoginForm from './EpaComponents/LoginForm';
import EpaFooter from './EpaComponents/EpaFooter'



export default {
  name: 'app',
  components: {
    LoginForm,
    EpaFooter,
    ChemtoxHeader,
  },
  watch: {
  '$route' (to, from) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
}
};

</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.flyout {
	display:flex;
	flex-direction: column;
	min-height:100vh;
	justify-content: space-between;
}
navbar.blue {
  background-color: #0e6993 !important;
}
.mh1 footer {
  height: 100px; /* 30% of viewport height*/
}
</style>
