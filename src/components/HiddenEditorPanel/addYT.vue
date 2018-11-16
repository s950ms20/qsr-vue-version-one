<template>
  <div id="addYT" class="row">
    <div class="col">
      <div class="col">
      <h4>Video Uploader:</h4>
      </div>
        <div class="row">
         </div>
        <div class="col">
            <div class="col extra30pxBottomMargin">
                <span class="btn btn-dark" @click="crateInputField4YTLink()">Add Video</span>
            </div>
                <div class="row extra30pxBottomMargin" v-for="(yt, index) in youTubeArray" :key="index">
                <div class="col">
                    <input type="text" v-model="youTubeArray[index]" class="col" placeholder="Video ID">
                    <span class="btn btn-dark" @click="deleteYtVideo(index)">Delete</span>
                </div>
                <div class="col">
                    <youtube :video-id="yt" class="col text-center extra30pxBottomMargin"></youtube>
                </div>
                </div>
                <span class="btn btn-dark extra30pxBottomMargin" @click="ytArrayBusEmiter()">Accept Video Files</span>
        </div>

    </div>
  </div>
</template>
<script>
import axios from "axios";
import db from "../../db";
import { storage, storageRef } from "../../db";
import { bus } from "../../main";

export default {
  name: "addYT",
  created() {},
  data() {
    return {
      youTubeArray: []
    };
  },
  methods: {
    ytArrayBusEmiter() {
      bus.$emit("youTubeArrayAccepted", this.youTubeArray);
    },
    crateInputField4YTLink() {
      this.youTubeArray.push("");
    },
    deleteYtVideo(index) {
      this.youTubeArray.splice(index, 1);
    }
  },
  computed: {}
};
</script>
<style lang="scss">
</style>