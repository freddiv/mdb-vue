<template>
<ftr color="blue">
 <container class="text-left">
        <row class="footerRow">
          <column md="2">
          <img class="img-fluid" src="http://comptox-prod.epa.gov/dashboard/assets/epa_seal_medium-06669bcbad2082971786b0089152f7bad80260d495beaa5f82fa1b9bd9d945cf.gif">
          </column>
          <column md="3">
            <ul>
              <li class="list-unstyled"> <h5 class="title">Discover.</h5></li>
              <li class="list-unstyled"><a href="/dashboard/about">About/Disclaimer</a></li>
              <li class="list-unstyled"><a href="http://www.epa.gov/accessibility" target="_blank">Accessibility</a></li>
              <li class="list-unstyled"><a href="http://www.epa.gov/home/privacy-and-security-notice" target="_blank">Privacy</a></li>
            </ul>
          </column>
           <column md="3">
            <ul>
              <li class="list-unstyled"> <h5 class="title">Connect.</h5></li>
              <li class="list-unstyled"><a href="http://actor.epa.gov" target="_blank">ACToR</a></li>
              <li class="list-unstyled"><a href="http://www.epa.gov/chemical-research/distributed-structure-searchable-toxicity-dsstox-database" target="_blank">DSSTox</a></li>
              <li class="list-unstyled"><a href="/dashboard/downloads">Downloads</a></li>
            </ul>
          </column>
           <column md="4">

            <ul>
              <li class="list-unstyled"> <h5 class="title">Ask.</h5></li>
              <li class="list-unstyled"><a href="/dashboard/contact_us">Contact</a></li>
              <li class="list-unstyled"><a href="https://www.epa.gov/chemical-research/comptox-chemistry-dashboard-help" target="_blank">Help</a></li>
            </ul>
          </column>
        </row>
      </container>
      <div class="footer-copyright text-center py-3">
        <container fluid>
          &copy; 2018 Copyright: <a href="https://www.epa.gov"> EPA.com </a>
        </container>
      </div>
</ftr>
</template>

<script>
import { Footer, Container, Row, Column } from 'mdbvue';
import Ftr from '@/components/Footer.vue';

export default {
  name: 'EpaFooter',
  components: {
    Footer,
    Container,
    Row,
    Column,
    Ftr
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footerRow {
  padding-top:15px;
  padding-bottom: 10px;
}
</style>
