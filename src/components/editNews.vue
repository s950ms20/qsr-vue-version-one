<template>
  <div id="editNews"  class="col">
    <div class="col titleOfComponent text-center" @click="hideComponent = !hideComponent"><h3>EDIT NEWS</h3></div>
    <div class="row" v-show="hideComponent">
    <!-- LIST OF NEWS -->
    <div class="row">
      <div class="col">
        <button class="btn btn-dark" @click="refreshNewsData()">Refresh</button>
      </div>
      <div class="col-12" v-for="(post, idx) of posts" :key="idx">
      <div class="row">
        <div class="col-2"><img v-bind:src="post.imgArray[0]" class="img-fluid albumCover"></div>
        <div class="col-6"><strong>{{post.postTitle}}</strong></div>
        <div class="col-2"><button @click.stop.prevent="edit(post.id)" class="btn btn-dark align-self-end">Edit</button></div>
        <div class="col-2"><button @click.stop.prevent="del(post.id)" class="btn btn-dark align-self-end">Delete</button></div>
      </div>
    </div>
    </div>
    <hr>
    <div class="row">
        <div class="col-12">
            <form @submit.prevent="updatePost(postTitle, imgArray, postImg2, postImg3, postText, youTubeArray)">
                <div class="row">
                    <div class="form-group col-12">

                        <!-- TITLE -->
                        <div class="row">
                        <div class="col-12">
                          <label for="postTitle"></label>
                          <div class="col-12"><p>{{postTitle}}</p></div>
                          <input type="postTitle" v-model="postTitle" class="form-control col-12" id="postTitle" placeholder="post Title">
                          <p class="col" id="postActualTime">{{postActualTime}}</p>
                        </div>
                        </div>

                        <!-- PICTURES -->

                        <div class="col-4 extra30pxBottomMargin">
                          <img v-bind:src="imgArray[0]" class="img-fluid albumCover">
                        </div>
                          <div class="col extra30pxBottomMargin">
                            <div class="col">
                              <input style="display: none" type="file" @change="onFileSelected" ref="fileInput">
                              <span class="btn btn-dark" @click="$refs.fileInput.click()">Pick Another file</span>
                              <span @click="onUpload()" class="btn btn-dark">Upload</span>
                            </div>
                          </div>
                        <div class="col">
                          <div v-for="(pic, index) in imgArray" :key="index" class="row">
                            <div class="col-10">
                              <img v-bind:src="pic" class="img-fluid albumCover">
                            </div>
                            <div class="col-2"><br><br>
                              <button class="btn btn-dark" @click="deletePic(index)">Delete</button>
                            </div>
                          </div>
                        </div>

                        <label for="postText"></label>
                        <div class="col-12 text-justify"><p v-html="postText"></p></div>
                        <VueTrix type="postText" v-model="postText" class="form-control col extra30pxBottomMargin" id="postText" placeholder="Text..."></VueTrix>

                        <!-- YOUTUBE SECTION START -->

                        <div class="col extra30pxBottomMargin">
                          <span class="btn btn-dark" @click="crateInputField4YTLink()">Add Another Video</span>
                        </div>
                        <div class="row extra30pxBottomMargin" v-for="(yt, index) in youTubeArray" :key="index">
                          <youtube :video-id="yt" class="col text-center extra30pxBottomMargin"></youtube>
                          <div class="col">
                            <input type="text" v-model="youTubeArray[index]">
                            <button class="btn btn-dark" @click="deleteYtVideo(index)">Delete</button>
                          </div>
                        </div>
                        <button type="submit" class="btn btn-dark">Submit</button>

                    </div>
                </div>
            </form>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import db from "../db";
import firebaseMixin from "../mixins/firebaseMixin.js";
import { storage, storageRef } from "../db";

export default {
  name: "editNews",
  created() {},
  data() {
    return {
      hideComponent: false,
      selectedFile: null,
      imgArray: [],
      youTubeArray: []
    };
  },
  methods: {
    getSelectedNewsData(selectedId) {
      db.collection("posts")
        .doc(selectedId)
        .get()
        .then(doc => {
          (this.id = doc.id),
            (this.postTitle = doc.data().postTitle),
            (this.imgArray = doc.data().imgArray),
            (this.actualImg = doc.data().imgArray[0]),
            (this.postText = doc.data().postText),
            (this.youTubeArray = doc.data().youTubeArray),
            (this.postInfoNotHidden = false);
          console.log(doc.data());
        });
    },
    updatePost(postTitle, imgArray, postText, youTubeArray) {
      db.collection("posts")
        .doc(this.selectedId)
        .update({
          id: this.id,
          postTitle: this.postTitle,
          imgArray: this.imgArray,
          actualImg: this.imgArray[0],
          postText: this.postText,
          youTubeArray: this.youTubeArray
        })
        .then(
          setTimeout(() => {
            this.refreshNewsData();
          }, 10)
        )
        .then(console.log("REFRESH"))
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          console.error("Error : ", error);
        });
    },
    edit(id) {
      console.log(id);
      this.selectedId = id;
      this.getSelectedNewsData(id);
    },
    del(id) {
      db.collection("posts")
        .doc(id)
        .delete();
      console.log(id);
      setTimeout(() => {
        this.refreshNewsData();
      }, 10);
    },
    deletePic(index) {
      this.imgArray.splice(index, 1);
      this.imgArrayBusEmitter();
    },
    deleteYtVideo(index) {
      this.youTubeArray.splice(index, 1);
    },
    crateInputField4YTLink() {
      this.youTubeArray.push("");
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
      // this.imgArrayBusEmitter();
    }
  },
  computed: {},

  mixins: [firebaseMixin]
};
</script>

<style lang="scss">
</style>
