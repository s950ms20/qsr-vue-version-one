<template>
  <div id="loginbar">
      <div class="row footerBgk text-white">
          <div class="col loginbar">

             <!-- LOGGED IN -->
             <div class="row" v-if="isLoggedIn">
               <div class="col">You are Logged as: {{currentUser}}, <br>Keep Diggin !</div>
               <!-- <div class="col-2"> -->
                 <li class="col-3">
                   <router-link to="/" exact><button @click="logout()" class="btn btn-dark col mx-auto">LOGOUT</button></router-link>
                 </li>
               </div>
             </div>

            <!-- LOGGED OUT -->
            <div class="row" v-if="!isLoggedIn">
                <div class="col"><login></login></div>
            </div>

          </div>
      </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "../db";
import firebaseMixin from "../mixins/firebaseMixin.js";
import { bus } from "../main";

export default {
  name: "loginbar",
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
  methods: {
    // LOGIN LOGOUT MENU APP
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({
            path: this.$router.path
          });
        });
      console.log("Logged out!");
    },
    showHEP(status) {
      this.isLoggedIn = status;
      bus.$emit("loggedIn", status);
    }
  },
  computed: {},

  mixins: [firebaseMixin]
};
</script>

<style lang="scss">
</style>
