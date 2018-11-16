<template>
  <div id="sidebar">
      <div class="col">
        <div class="col" v-for="(release, idx) of last3releases" :key="idx">
          <img v-bind:src="release.coverURL" class="img-fluid albumCover albumCoverChange">
        </div>

      </div>

  </div>
</template>

<script>
import db from "../db";
import firebaseMixin from "../mixins/firebaseMixin.js";

export default {
  name: "asidebar",
  created() {},
  data() {
    return {};
  },
  methods: {},
  computed: {},

  mixins: [firebaseMixin]
};
</script>

<style lang="scss">
</style>
