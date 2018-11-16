<template>
  <div id="menuAPP">
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#"></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mx-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#"><router-link to="/" exact>
        <button class="btn btn-dark col mx-auto">NEWS</button>
          </router-link><span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link"><router-link to="/about" exact><button class="btn btn-dark col mx-auto">ABOUT</button></router-link></a>
      </li>
      <li class="nav-item dropdown">
      <a class="nav-link" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><button class="btn btn-dark col mx-auto">ARTISTS</button></a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#"><router-link to="/graf" exact><button class="btn btn-dark col mx-auto">GRAF</button></router-link></a>
          <a class="dropdown-item" href="#"><router-link to="/metro" exact><button class="btn btn-dark col mx-auto">METRO</button></router-link></a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link"><router-link to="/releasesComponent" exact>
        <button class="btn btn-dark col mx-auto">RELEASES</button>
          </router-link></a>
      </li>
      <li class="nav-item">
        <a class="nav-link"><router-link to="/shoppingCart" exact>
        <button class="btn btn-dark col mx-auto">SHOPPING CART</button>
          </router-link></a>
      </li>

      <!-- TEMPORARY HIDDEN EDITOR PANEL BUTTON START OF CODE -->

      <!-- <li v-if="isLoggedIn" class="nav-item dropdown">
        <a class="nav-link" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><button class="btn btn-dark col mx-auto">EDIT</button></a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown"> -->

            <!-- <a v-if="!isLoggedIn" class="dropdown-item" href="#"><router-link to="/register" exact><button class="btn btn-dark col mx-auto">Register</button></router-link></a> -->
            <!-- <a v-if="!isLoggedIn" class="dropdown-item" href="#"><router-link to="/login" exact><button class="btn btn-dark col mx-auto">Login</button></router-link></a> -->
            <!-- <a v-if="isLoggedIn" class="dropdown-item" href="#"><router-link to="/logout" exact><button class="btn btn-dark col mx-auto">Logut</button></router-link></a> -->

            <!-- <a v-if="isLoggedIn" class="dropdown-item" href="#"><router-link to="/AddRelease" exact><button class="btn btn-dark col mx-auto">Add Release</button></router-link></a>
            <a v-if="isLoggedIn" class="dropdown-item" href="#"><router-link to="/EditRelease" exact><button class="btn btn-dark col mx-auto">Edit Release</button></router-link></a>
            <a v-if="isLoggedIn" class="dropdown-item" href="#"><router-link to="/AddNews" exact><button class="btn btn-dark col mx-auto">Add News</button></router-link></a>
            <a v-if="isLoggedIn" class="dropdown-item" href="#"><router-link to="/EditNews" exact><button class="btn btn-dark col mx-auto">Edit News</button></router-link></a>
          </div>
      </li> -->
      <!-- TEMPORARY HIDDEN EDITOR PANEL BUTTON END OF CODE -->
    </ul>
  </div>
</nav>
<!-- <nav v-if="isLoggedIn" class="navbar navbar-expand-lg navbar-light bg-light">
    <a v-if="isLoggedIn" class="dropdown-item" href="#"><router-link to="/AddRelease" exact><button class="btn btn-dark col mx-auto">Add Release</button></router-link></a>
    <a v-if="isLoggedIn" class="dropdown-item" href="#"><router-link to="/EditRelease" exact><button class="btn btn-dark col mx-auto">Edit Release</button></router-link></a>
    <a v-if="isLoggedIn" class="dropdown-item" href="#"><router-link to="/AddNews" exact><button class="btn btn-dark col mx-auto">Add News</button></router-link></a>
    <a v-if="isLoggedIn" class="dropdown-item" href="#"><router-link to="/EditNews" exact><button class="btn btn-dark col mx-auto">Edit News</button></router-link></a>


</nav> -->



  </div>
</template>

<script>
import firebase from "firebase";
import db from "../db";
import firebaseMixin from "../mixins/firebaseMixin.js";

export default {
  name: "menuAPP",
  created() {
    // if (firebase.auth().currentUser) {
    //   this.isLoggedIn = true;
    //   this.currentUser = firebase.auth().currentUser.email;
    // }
  },
  data() {
    return {
      // isLoggedIn: false,
      // currentUser: false
    };
  },
  methods: {
    // logout: function() {
    //   firebase
    //     .auth()
    //     .signOut()
    //     .then(() => {
    //       this.$router.go({ path: this.$router.path });
    //     });
    // }
  },
  computed: {},
  mixins: [firebaseMixin]
};
</script>

<style lang="scss">
</style>
