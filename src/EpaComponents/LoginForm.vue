<template>
  <container>
    <row>
      <column size="12" class="text-center mb-5">
         <modal v-if="showModal" @close="showModal = false" cascade class="text-left">
          <modal-header class="primary-color white-text">
            <h4 class="title"><fa class="fa fa-pencil" /> Contact form</h4>
          </modal-header>
          <modal-body class="grey-text">
            <md-input size="sm" label="Your name" icon="user" group type="text" validate error="wrong" success="right"/>
            <md-input size="sm" label="Your email" icon="envelope" group type="email" validate error="wrong" success="right"/>
            <md-input size="sm" label="Subject" icon="tag" group type="text" validate error="wrong" success="right"/>
            <md-textarea size="sm" :rows="2" label="Your message" icon="pencil"/>
          </modal-body>
          <modal-footer>
            <btn color="secondary" @click.native="showModal = false">Close</btn>
            <btn color="primary">Save changes</btn>
          </modal-footer>
        </modal>
      </column>
    </row>
  </container>
</template>

<script>
import { Container, Row, Column, MdInput, MdTextarea, Btn, Fa, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter } from 'mdbvue';

export default {
  name: 'LoginForm',
  components: {
    Container,
    Row,
    Column,
    MdInput,
    MdTextarea,
    Btn,
    Fa,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
  },
  data() {
    return {
      showModal: false
    };
  }
};
</script>

<style scoped>
</style>
