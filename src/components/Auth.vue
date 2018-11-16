<template>
<div class="row" id="Auth">
    <div class="col box">
        <h1 @click="newMethod('this.$refs.whateva')">Auth</h1>

        <div v-bind:class="{ hidden: notHidden }">whateva</div>
    </div>
</div>
</template>

<script>
export default {
  name: "Auth",
  created() {},
  mounted() {},
  data() {
    return {};
  },
  methods: {
    newMethod(refName) {
      // let path = this.$refs.refName.className;
      // if (refName.className === "hidden") {
      //   refName.className = "notHidden";
      // } else {
      //   refName.className = "hidden";
      // }
      // e.target.style.display = "none";
    }
  },
  computed: {}
};
</script>

<style lang="scss">
.hidden {
  display: none;
}

.notHidden {
  display: true;
}
</style>
