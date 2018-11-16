<template>
  <div id="product" class="text-center">
    <H1>SHOPPING CART</H1>
    <!-- <div class="col" v-for="(release, idx) of this.releases" :key="idx"> -->
        <form @submit.prevent="makeOrder(orderedProducts, idx), resetNumbers(idx)">
<!-- SHOP -->
              <div v-show="release.productQuantity" class="row">
                <div class="col"><p>Price: {{release.productPrice}} USD</p></div>
                <div class="col">
                  <p>
                  <span v-show="(release.productQuantity >= 1)"><p>Quantity: {{release.productQuantity}}</p></span>
                  <span v-show="!(release.productQuantity >= 1)"><strong>SOLD OUT</strong></span>
                  </p>
                </div>
                <div class="col-2">
                  {{orderedProducts}}
                </div>
                <div class="col">
                <span v-show="(release.productQuantity) >= 1">
                <button
                type="submit" class="col mx-right btn btn-outline-secondary">Add to Card</button>
                </span>
              </div>
            </div>
<!-- SHOP END -->

        </form>
    <br>
    <br>
    <!-- </div> -->
  </div>
</template>

<script>
import db from "../../db";
import firebaseMixin from "../../mixins/firebaseMixin";

export default {
  name: "product",
  created() {},
  data() {
    return {
      // SHOPPING CART
      orderedProducts: 0,
      newOrder: {
        artist: "",
        title: "",
        format: "",
        releaseID: "",
        orderedProducts: ""
      },
      currentUserOrdersList: []
    };
  },
  methods: {
    makeOrder(orderedProducts, idx, newOrder) {
      console.log("click!!!!!!!!!!");
      this.orderedProducts += 1;
      this.newOrder.artist = this.releases[idx].artist;
      this.newOrder.title = this.releases[idx].title;
      this.newOrder.format = this.releases[idx].format;
      this.newOrder.releaseID = this.releases[idx].id;
      this.newOrder.orderedProducts = this.orderedProducts;
      this.currentUserOrdersList.push(this.newOrder);
      console.log(this.orderedProducts);
    },

    resetNumbers(idx) {
      this.orderedProducts = 0;
      this.releases[idx].isProductCardVisible = false;
    }
  },
  computed: {},

  mixins: [firebaseMixin]
};
</script>

<style lang="scss">
</style>
