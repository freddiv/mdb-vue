<template>
  <container>
           <modal v-if="showMod" @close="closeModal" cascade class="text-left">
          <form id="loginform" class="needs-validation"  @submit.prevent="loginUser">
          <modal-header class="primary-color white-text">
            <h4 class="title"><fa class="fa fa-user" />User Login</h4>
          </modal-header>
          <modal-body class="grey-text">
           <p class="h4 text-center mb-4">Sign in</p>

          <label for="defaultFormLoginEmailEx" class="grey-text">Your email</label>
          <input type="email" id="emailAddress"  v-model="loginInfo.emailAddress" class="form-control" required/>
            <div class="invalid-feedback">
              Please enter your email address.
          </div>
          <br/>
          <label for="loginPassword" class="grey-text">Your password</label>
          <input type="password" id="password"  v-model="loginInfo.password" class="form-control" required />
           <div class="invalid-feedback">
             Please enter a pasword.
          </div>
           <div class="red-text" id="validationMsg" v-show="showAlert"> {{ validationMsg }} </div>
          </modal-body>
          <modal-footer>
            <btn color="secondary" @click.native="closeModal">Close</btn>
            <btn color="primary" @click.native="addUser(loginInfo)" v-show="showAddUser">Add User</btn>
            <btn color="primary" type="submit" >Submit</btn>
          </modal-footer>
          </form>
        </modal>
  </container>
</template>

<script>
import {userAuthMixin} from './mixins/userAuthMixin'
import router from './../router';
import { Container,  MdInput, Row, Column, MdTextarea, Btn, Fa, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter } from 'mdbvue';
console.log(userAuthMixin);
const jwt = require('jsonwebtoken');
const TOKEN_KEY = 'user-token';
const userTokenStorage = {
  fetch: function () {
    var userToken = localStorage.getItem(TOKEN_KEY) || '';
    return userToken;
  },
  save: function (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

var STORAGE_KEY = 'local-user-info';
var localLoginStorage = {
  fetch: function () {
    var users = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (users.length === 0) {
       users = [
            {
                emailAddress: 'valone.carlf@epa.gov',
                password: 'password',
                roles: ['USER', 'ADMIN']
            },
             {
                emailAddress: 'dunne.jeremy@epa.gov',
                password: 'password',
                roles: ['USER', 'ADMIN']
            },
             {
                emailAddress: 'edwards.jeff@epa.gov',
                password: 'password',
                roles: ['USER', 'ADMIN']
            },
             {
                emailAddress: 'kohl.loren@epa.gov',
                password: 'password',
                roles: ['USER', 'ADMIN']
            },
             {
                emailAddress: 'grulke.chris@epa.gov',
                password: 'password',
                roles: ['USER', 'ADMIN']
            }
          ];
    }
    users.forEach(function (user, index) {
      user.id = index;
    });
    users.uid = users.length;
    return users;
  },
  save: function (users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }
};

export default {
  name: 'EpaLoginModal',
  mixins: [userAuthMixin],
  components: {
    Container,
    MdInput,
    Row,
    Column,
    MdTextarea,
    Btn,
    Fa,
    Card,
    CardBody,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
  },
  props:[
    'showMod',
    'logdIn'
  ],
    data() {
      return {
          STORAGE_KEY: 'local-user-info',
          users: JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
        {
            emailAddress: 'valone.carlf@epa.gov',
            password: 'password',
            roles: ['USER', 'ADMIN'],
            id: 1
        },
         {
            emailAddress: 'dunne.jeremy@epa.gov',
            password: 'password',
            roles: ['USER', 'ADMIN'],
            id: 2
        },
         {
            emailAddress: 'edwards.jeff@epa.gov',
            password: 'password',
            roles: ['USER', 'ADMIN'],
            id: 3
        },
         {
            emailAddress: 'kohl.loren@epa.gov',
            password: 'password',
            roles: ['USER', 'ADMIN'],
            id: 4
        },
         {
            emailAddress: 'grulke.chris@epa.gov',
            password: 'password',
            roles: ['USER', 'ADMIN'],
            id: 5
        }
      ],
          showAlert: false,
          validationMsg: '',
          loggedIn: false,
          users: localLoginStorage.fetch(),
          showModal: false,
          showAddUser: false,
          alertObj: {
                alert: true,
                alertText: true
            },
          user: {
            emailAddress: '',
            password: '',
            roles: ['USER']
          },
          loginInfo: {
            emailAddress: '',
            password: '',
            roles: ['USER']
          },
          localLoginStorage: localLoginStorage,
          userTokenStorage: userTokenStorage,
          theJwt: jwt,
          userJwt: '',
          userToken: localStorage.getItem(TOKEN_KEY) || '',
          router: router
      }
  },
   watch: {
    users: {
      handler: function (users) {
         console.log('saved watch');
        localLoginStorage.save(users);
      },
      deep: true
    },
    userToken: {
      handler: function (userToken) {
         console.log('saved userToken watch');
        userTokenStorage.save(userToken);
      },
      deep: true
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
     closeModal: function(event){
       console.log(this.showModal);
       this.showModal = false;
       this.$emit('closeModal', this.showModal);
     },

     loginUser: function () {
      var value = this.loginInfo;
      // form validation
      this.validateLogin(value);
      // check to see if the user is valid
      this.validateUser(value);
      // if there is a validationMessage return so it displays
      if(this.showAlert = true){
        return
      }
      //reset the view model login info object
      this.loginInfo = {
                emailAddress: '',
                password: '',
                roles: ['USER']
        };
    },
     validateLogin: function (value){
      if (!value.emailAddress) {
        this.validationMsg = "Please enter your email address";
        this.showAlert = true;
        return;
      }
      if (value.emailAddress) {
        this.showAlert = false;
        this.validationMsg = '';
      }
      if (!value.password) {
        this.validationMsg = 'Please enter a password';
        this.showAlert = true;
        return;
      }
      if (value.password.length < 5) {
        this.validationMsg = 'Invalid password, all passwords are more than 5 characters';
        this.showAlert = true;
        return
      }
      // hide the add user button
      this.showAddUser = false;
    },
    validateUser: function (loginValues){
      this.users.find((user, i) => {
          if (user.emailAddress === loginValues.emailAddress) {
            console.log('in validate user 2' , loginValues.emailAddress,  '-', user.emailAddress);
              let foundUser = this.users[i];
              if (foundUser.password === loginValues.password){
                this.signToken(foundUser);
                this.removeValidationMessage();
                return
              }
              this.validationMsg = 'Incorrect Email Address / Password combination.';
              this.showAlert = true;
             return
          }
          this.showAddUserButton();
      });
    },
    removeValidationMessage: function(){
      this.validationMsg = '';
      this.showAlert = false;
    },
    showAddUserButton: function (){
      //show the add user button.
      this.validationMsg = 'Email not found. You can add this user email adress or login with different credentials';
      this.showAlert = true;
      this.showAddUser = true;
    },
    addUser: function(userInfo){
      this.users.push(userInfo);
    //  localLoginStorage.save(this.users);
      this.validationMsg = 'New user added. Please login with your credentials';
      this.showAlert = true;
      this.showAddUser = true;
    },
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
