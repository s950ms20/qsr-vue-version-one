<template>

  <div id="login">
      <div class="row">
          <div class="col">
            <div class="col-12 extra30pxBottomMargin"></div>
              <!-- <form v-on:submit.prevent="login(email, password)">
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                </div>
                <button  type="submit" class="btn btn-primary">Submit</button>
                </form> -->

                <form v-on:submit.prevent="login(email, password)">
                  <div class="row extra30pxBottomMargin">
                    <div class="col"><div class="form-group"><input v-model="email" type="email" class="form-control" id="loginemail" aria-describedby="emailHelp" placeholder="Enter email"></div>
                    </div>
                    <div class="col"><div class="form-group"><input v-model="password" type="password" class="form-control" id="loginpass" placeholder="Password"></div>
                    </div>
                    <div class="col"><button  type="submit" class="btn btn-dark">Admin login</button>
                    </div>
                    </div>
                </form>
          </div>
      </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "../db";
import firebaseMixin from "../mixins/firebaseMixin.js";

export default {
  name: "login",
  created() {},
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {},
  computed: {},
  mixins: [firebaseMixin]
};
</script>

<style lang="scss">
</style>
