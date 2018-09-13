<template>
  <div id="app" class="flyout">
  <navbar class="blue" dark>
  <!-- Navbar brand -->
  <mdb-navbar-brand href="https://" style="margin-left: 4px;">
   <img class="img-fluid" alt="Responsive image" src="http://comptox-prod.epa.gov/dashboard/assets/epa_logo_281.png">
  </mdb-navbar-brand>
  <navbar-collapse>
    <navbar-nav>
      <dropdown tag="li" class="nav-item">
            <dropdown-toggle slot="toggle" tag="a" navLink color="primary" waves-fixed>Grid Examples</dropdown-toggle>
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
     <navbar-item href="http://comptox-prod.epa.gov/">Comptox Portal</navbar-item>
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
    </navbar-nav>
    <!-- Search form -->

  </navbar-collapse>
</navbar>
    <main :style="{marginTop: '60px'}">
      <router-view></router-view>
    </main>
<ftr color="blue">
 <container class="text-left">
        <row>
          <column md="2">
          <img class="img-fluid" src="http://comptox-prod.epa.gov/dashboard/assets/epa_seal_medium-06669bcbad2082971786b0089152f7bad80260d495beaa5f82fa1b9bd9d945cf.gif">
          </column>
          <column md="3">
            <h5 class="title">Discover.</h5>
            <ul>
              <li class="list-unstyled"><a href="/dashboard/about">About/Disclaimer</a></li>
              <li class="list-unstyled"><a href="http://www.epa.gov/accessibility" target="_blank">Accessibility</a></li>
              <li class="list-unstyled"><a href="http://www.epa.gov/home/privacy-and-security-notice" target="_blank">Privacy</a></li>
            </ul>
          </column>
           <column md="3">
            <h5 class="title">Connect.</h5>
            <ul>
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
          &copy; 2018 Copyright: <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a>
        </container>
      </div>
</ftr>
  </div>
</template>

<script>
import Ftr from '@/components/Footer.vue';
import EdgHd from '@/components/EdgeHeader.vue';
import { Navbar, NavbarItem, NavbarNav, NavbarCollapse, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, MdInput, mdbNavbarBrand, Footer,  Row, Column } from 'mdbvue';


export default {
  name: 'app',
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
    MdInput,
    Ftr,
    EdgHd,
    mdbNavbarBrand,
    Footer,
    Row,
    Column
  }
};

</script>

<style>
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
