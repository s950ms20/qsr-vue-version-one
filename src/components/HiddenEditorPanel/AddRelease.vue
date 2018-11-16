<template>
    <div id="AddRelease" class="col">
        <div class="col titleOfComponent text-center" @click="hideComponent = !hideComponent">
            <h3>ADD RELEASES</h3>
        </div>
        <div class="row" v-show="hideComponent">
            <div class="col-12">
                <div class="col-12">
                    <button class="btn btn-dark" @click="clearAllFields()">Clear all fields</button>
                </div>
            </div>
            <div class="col-12">
                <div class="row">
                    <!-- PREVIEW -->
                    <div class="col">
                        <div class="col" v-show="artist">
                            <p>{{artist}}</p>
                        </div>
                        <div class="col" v-show="title">
                            <p>{{title}}</p>
                        </div>
                        <div class="col-4">
                            <img v-bind:src="imgArray[0]" class="img-fluid albumCover col-12">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12">
                            <div v-for="(pic, index) in imgArray" :key="index" class="row">
                                <div class="col-10">
                                    <img v-bind:src="pic" class="img-fluid albumCover">
                                </div>
                                <div class="col-2"><br><br>
                                    <button class="btn btn-dark" @click="deletePic(index)">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-sm-12 col-md-6" v-show="format">
                        <p>Format: {{format}}, {{additionalFormatDesc}}</p>
                    </div>
                    <div class="col-12 col-sm-12 col-md-6" v-show="ReleaseDate">
                        <p>Release Date: {{ReleaseDate}}</p>
                    </div>
                    <div class="col-12 text-justify">
                        <p v-html="Description"></p>
                    </div>
                    <!-- yt -->
                    <div class="row extra30pxBottomMargin" v-for="(yt, index) in youTubeArray" :key="index">
                        <youtube :video-id="yt" class="col text-center extra30pxBottomMargin"></youtube>
                    </div>
                    <!-- yt -->
                </div>
                <hr>
            </div>
            <div class="row">
                <div class="col">
                    <h1>Add Release</h1>
                    <form @submit.prevent="addNewRelease(
              artist, title, imgArray, format, additionalFormatDesc, ReleaseDate, Description, youTubeArray, actualImgRelease, releaseInfoNotHidden, productPrice, productQuantity)">
                        <div class="row">
                            <div class="form-group col-10 col-sm-10 col-md-12">
                                <label for="Artist"></label>
                                <input type="text" v-model="artist" class="form-control col" id="artist" placeholder="Artist">
                                <label for="Title"></label>
                                <input type="Title" v-model="title" class="form-control col" id="title" placeholder="Title">
                            </div>
                        </div>

                        <div class="row extra30pxBottomMargin">
                            <addIMG></addIMG>
                        </div>

                        <!-- FORMAT -->
                        <div class="row mx-auto">
                            <div class="form-group row">
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col">
                                            <span>Format:</span>
                                        </div>

                                        <div class="col">
                                            <select class="custom-select" required v-model="format">
                                                <option value="(Vinyl)">Vinyl</option>
                                                <option value="(CD)">CD</option>
                                                <option value="(Tape)">Tape</option>
                                            </select>
                                        </div>

                                        <div class="col-6">
                                            <input type="text" v-model="additionalFormatDesc" class="form-control col"
                                                id="additionalFormatDesc" placeholder="Additional Format Description"
                                                size="50">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- RELEASE DATE & DESCRIPTION -->
                        <div class="row">
                            <div class="form-group col">
                                <label for="Release Date"></label>
                                <input type="Date" v-model="ReleaseDate" class="form-control col-12" id="ReleaseDate"
                                    placeholder="Release Date">
                                <label for="Description"></label>
                                <VueTrix type="input" v-model="Description" class="form-control col" id="Description"
                                    placeholder="Description" rows="10" cols="30"></VueTrix>
                            </div>
                        </div>

                        <!-- YOU TUBE -->
                        <div class="row">
                            <addYT></addYT>
                        </div>

                        <!-- STORE STUFF -->
                        <div class="row">
                            <div class="form-group col-8">
                                <div class="row">
                                    <div class="col-2"><label for="Price">Price:</label></div>
                                    <div class="col-3"><input type="number" v-model="productPrice" class="form-control col-10"
                                            id="productPrice" placeholder="Price"></div>
                                    <div class="col"><label for="Quantity">Quantity:</label></div>
                                    <div class="col-4"><input type="number" v-model="productQuantity" class="form-control col-10"
                                            id="productQuantity" placeholder="Quantity"></div>
                                </div>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-dark">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from "../../db";
import firebaseMixin from "../../mixins/firebaseMixin.js";
import { bus } from "../../main.js";

export default {
  name: "AddRelease",
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
      hideComponent: false,
      imgArray: [],
      youTubeArray: []
    };
  },
  methods: {
    addNewRelease(
      artist,
      title,
      imgArray,
      format,
      additionalFormatDesc,
      ReleaseDate,
      Description,
      youTubeArray,
      actualImgRelease,
      releaseInfoNotHidden,
      productPrice,
      productQuantity,
      isProductCardVisible
    ) {
      db.collection("releases")
        .doc()
        .set({
          artist,
          title,
          imgArray,
          format,
          additionalFormatDesc,
          ReleaseDate,
          Description,
          youTubeArray,
          actualImgRelease: imgArray[0],
          releaseInfoNotHidden: false,
          productPrice,
          productQuantity,
          isProductCardVisible: false
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        })
        .then(this.refreshData());
    },
    clearAllFields() {
      (this.artist = ""),
        (this.title = ""),
        (this.imgArray = ""),
        (this.format = ""),
        (this.additionalFormatDesc = ""),
        (this.ReleaseDate = ""),
        (this.Description = ""),
        (this.youTubeArray = ""),
        (this.actualImgRelease = ""),
        (this.releaseInfoNotHidden = ""),
        (this.productPrice = ""),
        (this.productQuantity = ""),
        (this.isProductCardVisible = "");
    }
  },
  computed: {},
  mixins: [firebaseMixin]
};
</script>

<style lang="scss">
</style>
