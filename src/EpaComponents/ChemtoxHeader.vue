<template>
  <div>
  <navbar class="blue" style="padding: 0.1rem 1rem !important">
  <!-- Navbar brand -->
  <mdb-navbar-brand href="https://" style="margin-left: 4px;">
   <img class="img-fluid" alt="Responsive image" src="http://comptox-prod.epa.gov/dashboard/assets/epa_logo_281.png">
  </mdb-navbar-brand>

  <navbar-collapse>
    <navbar-nav>
      <dropdown tag="li" class="nav-item">
            <dropdown-toggle slot="toggle" tag="a" navLink color="primary" style="height:100%" waves-fixed>Grid Examples</dropdown-toggle>
            <dropdown-menu>
              <dropdown-item href="#/" waves-fixed>AG Grid</dropdown-item>
              <dropdown-item href="#/richgrid" waves-fixed> AG Rich Grid</dropdown-item>
              <dropdown-item href="#/chemgrid" waves-fixed> AG Chemical Grid</dropdown-item>
            </dropdown-menu>
          </dropdown>

          <dropdown tag="li" class="nav-item">
            <dropdown-toggle slot="toggle" tag="a" navLink color="primary" waves-fixed>Comptox Links</dropdown-toggle>
            <dropdown-menu>
              <dropdown-item href="http://comptox-prod.epa.gov/">Comptox Portal</dropdown-item>
              <dropdown-item href="http://comptox-prod.epa.gov/dashboard/">Comtox Dashboard</dropdown-item>
              <dropdown-item href="http://comptox-prod.epa.gov/dashboard/chemical_lists">Lists of Chemicals</dropdown-item>
              <dropdown-item href="http://comptox-prod.epa.gov/dashboard/assay_endpoints/">Lists of Assays</dropdown-item>
            </dropdown-menu>
          </dropdown>
     <navbar-item class="blue" href="http://comptox-prod.epa.gov/">Comptox Portal</navbar-item>
      <!-- Dropdown -->
        <!-- Dropdown -->
          <dropdown tag="li" class="nav-item">
            <dropdown-toggle slot="toggle" tag="a" navLink color="primary" waves-fixed>MDB Vue Examples</dropdown-toggle>
            <dropdown-menu>
              <dropdown-item href="#/css" waves-fixed>MDB CSS</dropdown-item>
              <dropdown-item href="#/components" waves-fixed>MDB Components</dropdown-item>
              <dropdown-item href="#/advanced" waves-fixed>MDB Advanced</dropdown-item>
            </dropdown-menu>
          </dropdown>
    </navbar-nav>

    <navbar-nav right>
       <form class="form-inline">
      <input class="form-control mr-auto p-2" type="text" placeholder="Search" aria-label="Search">
    </form>
     <navbar-item icon="user" class="blue" @click.native="showModal = true" ><i class="fa fa-user"></i> {{ !isLoggedIn ? 'Login' : 'Logout' }}</navbar-item>
    </navbar-nav>
    <!-- Search form -->
  </navbar-collapse>
</navbar>
  <container>
           <modal v-if="showModal" @close="showModal = false" cascade class="text-left">
          <form id="loginform" class="needs-validation"  @submit.prevent="loginUser">
          <modal-header class="primary-color white-text">
            <h4 class="title"><fa class="fa fa-user" />{{ !isLoggedIn ? 'User Login' : 'Logout' }}</h4>
          </modal-header>
          <modal-body class="grey-text" v-show="!isLoggedIn">
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
            <btn color="secondary" @click.native="showModal = false"  v-show="!isLoggedIn">Close</btn>
            <btn color="secondary" @click.native="logOutUser"  v-show="isLoggedIn">Logout</btn>
            <btn color="primary" @click.native="addUser(loginInfo)" v-show.native="showAddUser">Add User</btn>
            <btn color="primary" type="submit"  v-show="!isLoggedIn">Submit</btn>
          </modal-footer>
          </form>
        </modal>
  </container>

</div>
</template>
<script>

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


import EpaLoginModal from './EpaLoginModal';
import { Navbar, NavbarItem, NavbarNav, NavbarCollapse, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, MdInput, mdbNavbarBrand, Row, Column, MdTextarea, Btn, Fa, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter } from 'mdbvue';
import router from './../router';

export default {
  name: 'ChemtoxHeader',
  components: {
    Navbar,
    NavbarItem,
    NavbarNav,
    NavbarCollapse,
    Container,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    EpaLoginModal,
    mdbNavbarBrand,
    Row,
    Column,
    MdInput,
    MdTextarea,
    Btn,
    Fa,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    jwt,
    router
  },
   data() {
      return {
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
          userToken: userTokenStorage.fetch(),
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
      this.showModal = false;
    },
    logOutUser: function(){
      this.userToken = '';
      this.showModal = false;

    }
  }
};
</script>

<style scoped>
.flyout {
	display:flex;
	flex-direction: column;
	min-height:100vh;
	justify-content: space-between;
}
</style>
