<template>
<div class="row">
    <div class="col">
        <news></news>
        <about></about>
        <artists></artists>
        <releasesComponent></releasesComponent>
        <shoppingCart></shoppingCart>
    </div>
</div>
</template>

<script>
import firebase from "firebase";
import db from "../db";
import firebaseMixin from "../mixins/firebaseMixin.js";

export default {
  name: "userView",
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
