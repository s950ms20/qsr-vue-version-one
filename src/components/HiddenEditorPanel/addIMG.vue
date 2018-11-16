<template>
  <div id="addIMG" class="row">
    <div class="col">
      <div class="col">
        <h4>Image Uploader: </h4>
      </div>
      <div class="col" v-for="(pic, index) in imgArray" :key="index">
        <div class="col extra30pxBottomMargin">
          <div class="col">
            <img v-bind:src="pic" class="img-fluid" @click="deletePic(index)" title="click to delete">
          </div>
        </div>
      </div>
      <div class="col">
        <input style="display: none" type="file" @change="onFileSelected" ref="fileInput">
        <span class="btn btn-dark" @click="$refs.fileInput.click()">Pick file</span>
        <span @click="onUpload()" class="btn btn-dark">Upload</span>
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
  name: "addIMG",
  created() {},
  data() {
    return {
      selectedFile: null,
      url: "",
      img: "",
      imgArray: []
    };
  },
  methods: {
    imgArrayBusEmitter() {
      bus.$emit("imgArrayUpdated", this.imgArray);
    },
    hideAndShowComponent() {
      this.hideComponent = !this.hideComponent;
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    onUpload() {
      const imagesRef = storageRef.child(`images/${this.selectedFile.name}`);
      imagesRef.put(this.selectedFile);
      storageRef
        .child(`images/${this.selectedFile.name}`)
        .getDownloadURL()
        .then(function(url) {
          console.log(url);
          let newImg = url;
          console.log(newImg);
          return url;
        })
        .then(element => {
          this.imgArray.push(element);
          console.log(this.imgArray);
        })
        .catch(function(error) {
          console.log(error);
        });
      this.imgArrayBusEmitter();
    },
    deletePic(index) {
      this.imgArray.splice(index, 1);
      this.imgArrayBusEmitter();
    }
  },
  computed: {}
};
</script>
<style lang="scss">
</style>