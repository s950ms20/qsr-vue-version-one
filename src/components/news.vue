<template>
  <div id="news" class="col">
    <div class="col titleOfComponent text-center" @click="hideComponent = !hideComponent">
    <h2>NEWS / BLOG</h2>
    </div>
      <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
      <div class="col" v-show="hideComponent">

        <div class="row">
          <div class="col">
            <!-- LIST OF NEWS -->
            <div class="row extra30pxBottomMargin" v-for="(post, idx) of posts" :key="idx">
              <div class="col footerBgk contentBox text-white" @click="showPostInfo(idx)">
                <div class="col-12 text-center"><h3>{{post.postTitle}}</h3></div>
                <div class="col-12 font-italic">Added: {{post.postActualTime}}</div>
              </div>
              <div v-if="post.postInfoNotHidden">
                <div>
                  <div class="row">

                    <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                    <!-- PICTURES -->
                      <div class="col postImg">
                        <img v-show="post.imgArray[0]" @click="showBigImg(idx, $event)"
                        v-bind:src="post.actualImg" class="img-fluid postImg imgSliderBig" ref="actImgDiv">
                      </div>
                      <div class="row">
                        <div class="col postImg" v-for="(postImg, index) in post.imgArray" :key="index">
                          <img @click="changeImg($event, idx, actualImg)" v-bind:src="postImg" class="img-fluid postImg imgSliderSmall" 
                          v-show="post.imgArray.length > 1">
                        </div>
                      </div>
                    </div>

                    <div class="col-12 col-sm-12 col-md-6 col-lg-6 extra30pxBottomMargin">
                    <!-- DESCRIPTION -->
                      <div class="col-12 newsDesc">
                        <div class="col text-justify"><p v-html="post.postText"></p></div>
                      </div>
                    </div>

                  </div>
                  <div class="row">
                  <!-- YOUTUBE SECTION START -->
                  <div class="col extra30pxBottomMargin" v-for="(yt, index) in post.youTubeArray" :key="index">
                      <youtube :video-id="yt" class="col text-center extra30pxBottomMargin"></youtube>
                  </div>
                  <!-- YOUTUBE SECTION END -->

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      </transition>
  </div>
</template>

<script>
import db from "../db";
import firebaseMixin from "../mixins/firebaseMixin.js";

export default {
  name: "news",
  created() {},
  data() {
    return {
      hideComponent: false
    };
  },
  methods: {
    changeImg($event, idx, actualImg) {
      this.posts[idx].actualImg = $event.target.src;
    },
    setDivHeight() {
      this.posts.imgArray.sort;
    }
  },
  computed: {},
  firebase: {
    posts: db.collection("posts")
  },
  mixins: [firebaseMixin]
};
</script>

<style lang="scss">
</style>
