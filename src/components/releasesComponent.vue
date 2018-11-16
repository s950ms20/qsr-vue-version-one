<template>
    <div id="releasesComponent" class="col">
      <div class="col titleOfComponent text-center" @click="hideAndShowComponent()">
      <h2>RELEASES / SHOP</h2>
      </div>
            <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">

      <div class="row" v-show="hideComponent">
        <div class="col">
          <div class="row">
            <div class="col"></div>
            <div class="col-6 col-sm-4 col-md-3 col-lg-2 d-flex align-items-end">
              <select class="custom-select" id="inputGroupSelect02" v-model="selectedValue">
              <option value="0">All Releases</option>
              <option value="1">Avaiable</option>
              </select>
            </div>
          </div>
          <!-- LIST OF RELEASES -->
          <div class="col releaseClass orderBox contentBox" v-for="(release, idx) of releases" :key="idx" v-show="release.productQuantity >= selectedValue">
            <div class="row">
              <div @click="showReleaseInfo(idx)" class="col-12 col-sm-12 col-md-6 col-lg-4">
              <img v-bind:src="release.imgArray[0]" class="img-fluid albumCover">
              </div>
              <div class="col">
                <div class="col"><p><strong>{{release.artist}}</strong></p></div>
                <div class="col"><p><strong>{{release.title}}</strong></p></div>
                <!-- FORMAT -->
                <div class="col">
                    <p>{{release.format}}, {{release.additionalFormatDesc}} </p>
                </div>
                <div class="col"><p>{{release.ReleaseDate}}</p></div>
              <div class="col">
                <button class="btn btn-dark" @click="closeAllProductCards(), showProductCard(idx)">Buy</button>
              </div>
              <br>
              <div class="col">
                <button class="btn btn-dark" @click="showReleaseInfo(idx)">More...</button>
              </div>
              </div>

            </div>
            <!-- INFO -->
            <div v-show="release.releaseInfoNotHidden" class="col extra30pxBottomMargin">

              <!-- PICTURES -->

              <div class="row extra30pxBottomMargin">
                <div class="col-12 col-sm-12 col-md-6">
                  <div class="col-12 imgSlider imgSliderBig">
                    <img v-bind:src="release.actualImgRelease"
                    @click="showBigImg(idx, $event)"
                  class="img-fluid imgSliderBig">
                  </div>
                  <div class="row">
                    <div class="col imgSlider" v-for="(pic, index) in release.imgArray" :key="index">
                          <img v-bind:src="pic" class="img-fluid imgSliderSmall"
                          @click="changeImgReleases($event, idx, release.actualImgRelease)"
                          v-show="release.imgArray.length > 1">
                    </div>
                  </div>
                </div>

              <!-- DESCRIPTION -->
                <div class="col-12 col-sm-12 col-md-6 text-justify">
                  <p v-html="release.Description"></p>
                </div>

              </div>
              <!-- YOUTUBE SECTION START -->

                <div class="row extra30pxBottomMargin" v-for="(yt, index) in release.youTubeArray" :key="index">
                    <youtube :video-id="yt" class="col-12 text-center extra30pxBottomMargin"></youtube>
                </div>

              <!-- YOUTUBE SECTION END -->
            </div>
            <!-- SHOP -->
            <div class="col-12">
              <div v-show="release.isProductCardVisible" class="col-12">
                <div class="col mx-auto">

  <!-- <product></product> -->
  <!-- SHOP -->

          <form @submit.prevent="makeOrder(orderedProducts, idx)">
                <div v-show="release.productQuantity" class="row">
                  <div class="col"><p>Price: {{release.productPrice}} PLN</p></div>
                  <div class="col">
                    <p>
                    <span v-show="(release.productQuantity >= 1)"><p>Quantity: {{release.productQuantity}}</p></span>
                    <span v-show="!(release.productQuantity >= 1)"><strong>SOLD OUT</strong></span>
                    </p>
                  </div>
                  <!-- <div class="col-2">
                    {{orderedProducts}}
                  </div> -->
                  <div class="col">
                  <span v-show="(release.productQuantity) >= 1">
                  <button
                  type="submit" class="col mx-right btn btn-dark">Add to Card</button>
                  </span>
                </div>
              </div>
          </form>
  <!-- SHOP END -->

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
import firebaseMixin from "../mixins/firebaseMixin";
import { bus } from "../main";

export default {
  name: "releasesComponent",
  created() {},
  data() {
    return {
      hideComponent: false,
      // SHOPPING CART
      orderedProducts: 0,
      testString: "",
      artist: "",
      title: "",
      format: "",
      additionalFormatDesc: "",
      releaseID: "",
      productPrice: 0,
      orderedProducts: new Number(),
      newOrder: [],
      orderTicketId: "",
      currentUserOrdersList: [],
      youTubeArray: [],
      selectedValue: 1
    };
  },
  methods: {
    makeOrder(orderedProducts, idx, newOrder) {
      this.orderedProducts = 1;
      this.artist = this.releases[idx].artist;
      this.title = this.releases[idx].title;
      this.format = this.releases[idx].format;
      this.additionalFormatDesc = this.releases[idx].additionalFormatDesc;
      this.releaseID = this.releases[idx].id;
      this.productPrice = this.releases[idx].productPrice;
      this.orderedProducts = this.orderedProducts;
      this.testString = `${this.artist} ${this.title}  ${this.format}`;

      this.currentUserOrdersList.push(
        (newOrder = {
          orderedProducts: Number(this.orderedProducts),
          artist: this.artist,
          title: this.title,
          format: this.format,
          additionalFormatDesc: this.additionalFormatDesc,
          releaseID: this.releaseID,
          productPrice: this.productPrice,
          orderedProducts: this.orderedProducts
          // orderTicketId:
          //   "ORDR_NR_" +
          //   new Date().getFullYear().toString() +
          //   (new Date().getMonth() + 1).toString() +
          //   new Date().getDate().toString() +
          //   "_" +
          //   Math.random()
          //     .toString()
          //     .slice(2, 5)
        })
      );
      // this.currentUserOrdersList.forEach(data => {
      //   console.log(data.releaseID);
      // });
      bus.$emit("currentUserOrdersList", this.currentUserOrdersList);
    },

    resetNumbers(idx) {
      this.orderedProducts = 0;
    },

    changeImgReleases($event, idx, actualImgRelease) {
      this.releases[idx].actualImgRelease = $event.target.src;
    },
    showProductCard(idx) {
      this.releases[idx].isProductCardVisible = !this.releases[idx]
        .isProductCardVisible;
    },

    closeAllProductCards() {
      let x = this.releases.length;
      for (let i = 0; i < x; i++) {
        this.releases[i].isProductCardVisible = false;
      }
    },
    showOrders() {
      // this.currentUserOrdersList.forEach(e => {
      //   console.log(e.title);
      // });
      // console.log(this.currentUserOrdersList);
    }
  },
  computed: {},

  mixins: [firebaseMixin]
};
</script>

<style lang="scss">
</style>
