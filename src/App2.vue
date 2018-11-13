<template>
  <div id="app" class="flyout">
    <NcctHeader></NcctHeader>
    <main :style="{marginTop: '60px'}">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </main>
  <epa-footer></epa-footer>
  </div>
</template>

<script>
import router from './router';
import NcctHeader from './EpaComponents/NcctHeader';
import EpaFooter from './EpaComponents/EpaFooter'
const jwt = require('jsonwebtoken');
export default {
  name: 'app',
  components: {
    EpaFooter,
    NcctHeader,
    router
  },
  data() {
      return {
          theJwt: jwt,
          userJwt: '',
          router: router
      }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
  },
   computed: {
     isLoggedIn: function(){
      let loggedIn = false;
      this.user = {
        emailAddress: 'guest@',
        password: '',
        roles: ['GUEST']
      };

       if (this.userToken.length){
          let decoded = jwt.decode(this.userToken, {complete: true}),
              compareDate = (new Date(Date.now()).getUTCDate() ),
              compareHour = (new Date(Date.now()).getUTCHours() - 1),
              expireDate = new Date(decoded.payload.exp).getUTCDate(),
              expireHour = new Date(decoded.payload.exp).getUTCHours(),
              jwtUserData = decoded.payload.data;
          this.user = {
              emailAddress: 'jwtUserData.emailAddress',
              password: '',
              roles: jwtUserData.roles
            };
          loggedIn = true;
          // check time exp
          if (compareDate > expireDate || compareHour > expireHour){
            this.userToken = '';
            loggedIn = false;
          }
        }
        else {
        this.userToken = '';
        }
      return loggedIn;
     }
   },
    methods: {
    signToken: function(user) {
      let jwtData = {
        emailAddress: user.emailAddress,
        userId: user.id,
        roles: user.roles
      }
       this.userToken = this.theJwt.sign({
        exp: Date.now() + (1000 * 60 * 60),
        data: jwtData
      }, 'usingalongchemicalnameforsecret');
     // this.userTokenStorage.save(token);
    // navigate to authenticated content.
      this.router.push('/richgrid');
      this.closeModal();
    },
    logOutUser: function(){
      this.userToken = '';
      this.closeModal();

    }
  },
};

</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .9s;
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
