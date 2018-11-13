<template>
  <container>
      <modal v-if="showModal" @close="closeModal" cascade class="text-left">
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
import { Container,  MdInput, Row, Column, MdTextarea, Btn, Fa, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter } from 'mdbvue';
const jwt = require('jsonwebtoken');


export default {
  name: 'NcctLoginModal',
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
    'showModal',
    'loggedIn'
  ],
    data() {
      return {
          showAlert: false,
          validationMsg: '',
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
          }
      }
  },
   methods: {
     closeModal: function(event){
       this.$emit('closeLoginModal');
     },
     loginUser: function () {
      var value = this.loginInfo;
      if(this.showAlert = true){
        return ;
      }
      this.$emit('loginEvent', value);
      //reset the view model login info object
      this.loginInfo = {
                emailAddress: '',
                password: '',
                roles: ['USER']
        }
      this.user = {
            emailAddress: '',
            password: '',
            roles: ['USER']
          }
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
