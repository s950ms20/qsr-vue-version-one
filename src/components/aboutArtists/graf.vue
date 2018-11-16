<template>
  <div id="graf" class="col">
    <div class="col titleOfComponent text-center" @click="hideComponent = !hideComponent">
      <h3>GRAF CRATEDIGGER</h3>
    </div>
    <div class="col" v-show="hideComponent">
      <div class="row extra30pxBottomMargin">
        <div class="col-12">
          <h4>BIOGRAPHY:</h4>
        </div>
        <div class="col-12 col-sm-12 col-md-6 col-lg-4">
          <img src="/src/assets/qsr/beats.jpg" class="img-fluid">
        </div>
      <div class="col text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum aliquam ligula vitae tortor venenatis, non porta ipsum consequat. Nam in maximus augue, in dapibus turpis. Etiam vel sollicitudin felis, ac vehicula augue. Nulla et dui ut sem ultrices imperdiet ac a velit. Maecenas tempor ligula et dui dictum, id tincidunt metus rutrum. Cras risus dui, convallis id velit vel, congue hendrerit felis. Donec vestibulum turpis ante. Nulla tempus accumsan sem, at consequat nisi. Fusce nisi lectus, aliquet ut mattis at, ultricies non lorem. Maecenas facilisis, diam vitae tristique euismod, enim mi rhoncus neque, laoreet pharetra nunc justo ac erat.Integer nibh lacus, imperdiet non nisi at, blandit scelerisque arcu. Curabitur ac nisi pellentesque, tempus purus id, iaculis magna. Cras facilisis lobortis malesuada. Vestibulum posuere nulla et elit luctus accumsan. Curabitur risus justo, ullamcorper vitae ornare sit amet, mollis a ligula. Fusce laoreet tristique ullamcorper. Nam sagittis sagittis arcu, id lacinia dolor sagittis dignissim. Nunc sit amet neque odio. Nunc nulla odio, lobortis id elit ornare, cursus vestibulum diam. Ut faucibus iaculis tellus at semper. Donec eget porta ligula. Maecenas non consequat libero. Mauris euismod leo ut ipsum iaculis, quis blandit leo rutrum. Duis lacus diam, convallis vitae nunc in, placerat porta nunc. Suspendisse luctus, nisl at pellentesque tempus, justo felis sagittis risus, eu dignissim arcu justo at odio. Curabitur bibendum orci arcu, a aliquet tellus consectetur varius.Nam posuere elit vel lobortis accumsan. Vivamus tempus augue sit amet gravida luctus. Morbi vel lobortis nisi. Praesent imperdiet turpis justo, at consequat urna hendrerit ut. Vivamus cursus velit mi, vel pharetra dolor sollicitudin et. Nulla malesuada bibendum mauris vitae commodo. Vivamus vel congue erat. Etiam eu lobortis turpis. Suspendisse mattis faucibus nisi, a mattis mauris tincidunt non. Nulla dapibus ipsum ut elit lacinia, sit amet aliquet metus tempor. Nam et blandit magna. Quisque quis elit consectetur, malesuada eros non, vulputate est. Nullam porta libero velit, in aliquam felis dictum nec. Praesent sed laoreet felis, vel posuere magna. Sed ac ultricies leo.      </div>

      <hr>
      </div>
    <div class="row extra30pxBottomMargin">
      <div class="col-12">
      <h4>DISCOGRAPHY:</h4>
      </div>
      <div class="col" v-for="(release, idx) of artistFolder" :key="idx">
        <div class="col">
          <img v-bind:src="release.imgArray[0]" class="img-fluid albumCover" v-bind:title="release.title">
        </div>
      </div>
    </div>
    </div>


  </div>
</template>

<script>
import db from "../../db";
import firebaseMixin from "../../mixins/firebaseMixin.js";

export default {
  name: "graf",
  created() {
    this.selectByArtist("Graf Cratedigger");
  },
  data() {
    return {
      artistFolder: [],
      hideComponent: false
    };
  },
  methods: {},
  computed: {},
  mixins: [firebaseMixin]
};
</script>

<style lang="scss">
</style>
