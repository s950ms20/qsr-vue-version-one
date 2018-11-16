<template>

  <div id="register">
      <div class="row">
          <div class="col">
              <h2>register</h2>
              <form v-on:submit.prevent="register(email, password)">
                      <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="text" v-model="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Password" >
                </div>
                <button type="submit" class="btn btn-dark">Submit</button>
                </form>
          </div>
      </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "register",
  created() {},
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    register() {
      console.log(`${this.email} & ${this.password}`);
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`Account Created for ${this.email}`);
            this.$router.go({ path: this.$router.path });
          },
          error => {
            console.log(error.message);
          }
        );
    }
  },
  computed: {}
};
</script>

<style lang="scss">
</style>
