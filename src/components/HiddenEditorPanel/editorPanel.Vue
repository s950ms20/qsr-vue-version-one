<template>
  <div id="editorPanel" class="col">
    <div class="col titleOfComponent text-center" @click="hideComponent = !hideComponent">
      <h2>ADMIN PANEL</h2>
    </div>
    <div class="col" v-show="hideComponent">
        <AddRelease></AddRelease>
        <EditRelease></EditRelease>
        <AddNews></AddNews>
        <EditNews></EditNews>
        <showOrders></showOrders>
        <finishedOrders></finishedOrders>
    </div>
  </div>
</template>

<script>
import { bus } from "../../main";

export default {
  name: "EditorPanel",
  created() {
    bus.$on("loggedIn", data => {
      this.isLoggedIn = data;
    });
  },
  data() {
    return {
      hideComponent: false,
      isLoggedIn: false
    };
  },
  methods: {},
  computed: {}
};
</script>

<style lang="scss">
</style>
