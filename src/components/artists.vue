<template>
  <div id="artists" class="col">
    <div class="col titleOfComponent text-center" @click="hideAndShowComponent()">
      <h2>ARTISTS</h2>
    </div>
      <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
    <div class="col" v-show="hideComponent">
    <graf></graf>
    <metro></metro>
    </div>
      </transition>
  </div>
</template>

<script>
export default {
  name: "artists",
  created() {},
  data() {
    return {
      hideComponent: false
    };
  },
  methods: {
    hideAndShowComponent() {
      this.hideComponent = !this.hideComponent;
    }
  },
  computed: {}
};
</script>

<style lang="scss">
</style>
