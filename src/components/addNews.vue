<template>
  <div id="addNews"  class="col">
  <div class="col titleOfComponent text-center" @click="hideComponent = !hideComponent"><h3>ADD NEWS</h3></div>
    <div class="row " v-show="hideComponent">
    <div class="row">
      <div class="col-12">
        <button class="btn btn-dark" @click="clearAllFields()">Clear all fields</button>
      </div>
        <div class="col">
            <form @submit.prevent="addNewPost(postTitle, imgArray, postText, youTubeArray)">
                <div class="row">
                <div class="form-group col">

                    <div class="row extra30pxBottomMargin">
                      <div class="col">
                        <label for="postTitle"></label>
                        <div class="col-12"><p>{{postTitle}}</p></div>
                        <input type="postTitle" v-model="postTitle" class="form-control col-12" id="postTitle" placeholder="post Title">
                      </div>
                    </div>

                    <!-- PICTURES -->
                      <div class="row extra30pxBottomMargin">
                        <addIMG></addIMG>
                      </div>

                    <!-- DESCRIPTION -->
                    <div class="col-12 text-justify extra30pxBottomMargin"><p v-html="postText"></p></div>
                    <VueTrix type="postText" v-model="postText" class="form-control col extra30pxBottomMargin" id="postText" placeholder="Text..."></VueTrix>

                    <!-- YOUTUBE -->
                    <div class="row">
                      <addYT></addYT>
                    </div>
                    <hr>
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
import { bus } from "../main.js";

export default {
  name: "addNews",
  created() {
    bus.$on("imgArrayUpdated", data => {
      this.imgArray = data;
    });
    bus.$on("youTubeArrayAccepted", data => {
      this.youTubeArray = data;
    });
  },
  data() {
    return {
      hideComponent: false
    };
  },
  methods: {
    addNewPost(postTitle, imgArray, postText, youTubeArray) {
      db.collection("posts")
        .doc()
        .set({
          postTitle,
          imgArray,
          postText,
          youTubeArray,
          postActualTime: Date().slice(0, 25)
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch(error => {
          console.error("Error writing document: ", error);
        })
        .then(this.refreshData());
    },
    showActualTime() {
      console.log(this.postActualTime);
    },
    clearAllFields() {
      (this.postTitle = ""),
        (this.imgArray = ""),
        (this.postText = ""),
        (this.youTubeArray = "");
    }
  },
  computed: {},

  mixins: [firebaseMixin]
};
</script>

<style lang="scss">
</style>
