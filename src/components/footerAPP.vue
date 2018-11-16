<template>
  <div id="footerAPP">
      <div class="row footerAPP ">
          <div class="col-12 ">
              <p>All rights reserved. &#174 Queen Size Records {{actualYear}}.
                  Website made by s950ms20.
              </p>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "footerAPP",
  created() {
    this.actualYear = new Date().getFullYear();
  },
  data() {
    return {
      actualYear: ""
    };
  },
  methods: {},
  computed: {}
};
</script>

<style lang="scss">
</style>
