<template>
  <div id="EditRelease"  class="col">
    <div class="col titleOfComponent text-center" @click="hideComponent = !hideComponent">
    <h3>EDIT RELEASES</h3>
    </div>
    <div class="row" v-show="hideComponent">
      <div class="col">
      <button class="btn btn-dark" @click="refreshData()">Refresh</button>
      </div>
      <div class="row">
        <div class="col-12  " v-for="(release, idx) of releases" :key="idx">
        <div class="row">
          <div class="col-2">
            <img v-bind:src="release.imgArray[0]" class="img-fluid albumCover">
          </div>
          <div class="col">
            <div class="col"><strong>{{release.artist}}</strong></div>
            <div class="col"><strong>{{release.title}}</strong></div>
            <div class="col">{{release.format}}, {{release.additionalFormatDesc}}</div>
            <div class="col">{{release.ReleaseDate}}</div>
          </div>
          <div class="col-2">
            <button @click.stop.prevent="edit(release.id)" class="btn btn-dark align-self-end">Edit</button>
          </div>
          <div class="col-2">
            <button @click.stop.prevent="del(release.id)" class="btn btn-dark align-self-end">Delete</button>
          </div>
        </div>
        </div>
      </div>

  <!-- // EDIT MODE START -->
    <div class="row  ">
      <div class="col">
        <h1>Preview</h1>
          <div class="col">
            <p>{{artist}}</p>
          </div>
          <div class="col">
            <p>{{title}}</p>
          </div>
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
            <div class="col">
              <p>Format: {{format}}, {{additionalFormatDesc}}</p>
            </div>
          <div class="col">
            <p>Release Date: {{ReleaseDate}}</p>
          </div>
          <div class="col">
            <p v-html="Description"></p>
          </div>
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
<!-- YOUTUBE SECTION END -->
      </div>
    </div>

      <div class="row  ">
        <div class="col">
          <h1>Edit Section</h1>
          <form @submit.prevent="updateRelease(
            artist, title, imgArray, format, additionalFormatDesc,
            ReleaseDate, Description, youTubeArray,
            releaseInfoNotHidden, productPrice, productQuantity)">
            <div class="row">
              <div class="form-group col">
                <label for="Artist"></label>
                <input type="text" v-model="artist" class="form-control col" id="artist" placeholder="Artist">
                <label for="Title"></label>
                <input type="Title" v-model="title" class="form-control col" id="title" placeholder="Title">
              </div>
            </div>

              <!-- <div class="row extra30pxBottomMargin">
                  <addIMG></addIMG>
              </div> -->

  <!-- // FORMAT SECTION START -->
            <div class="form-group row">
                <div class="col-12">
                  <div class="row">
                    <div class="col">
                      <span>Format:</span>
                    </div>

                    <div class="col">
                      <select class="custom-select" required v-model="format">
                        <option value="Vinyl">Vinyl</option>
                        <option value="CD">CD</option>
                        <option value="Tape">Tape</option>
                      </select>
                    </div>

                    <div class="col-8">
                      <input type="text" v-model="additionalFormatDesc" class="form-control col" id="additionalFormatDesc" placeholder="Additional Format Description" size="50">
                    </div>
                  </div>
                </div>
            </div>


  <!-- // FORMAT SECTION END -->

          <div class="row">
            <div class="form-group col">
              <label for="Release Date"></label>
              <input type="Date" v-model="ReleaseDate" class="form-control col" id="ReleaseDate" placeholder="Release Date">
              <label for="Description"></label>
              <VueTrix type="input" v-model="Description" class="form-control col" id="Description" rows="10" cols="30"></VueTrix>
              <!-- <textarea type="input" v-model="Description" class="form-control col" id="Description" placeholder="Description" rows="10" cols="30"></textarea> -->
            </div>
          </div>
  <!-- // YOUTUBE START -->
          <div class="row">
            <div class="form-group col">
              <addYT></addYT>
            </div>
          </div>
  <!-- // YOUTYBE END -->

<!-- STORE STUFF -->
          <div class="row">
            <div class="form-group col-8">
              <div class="row">
                  <div class="col-2"><label for="Price">Price:</label></div>
                  <div class="col-3"><input type="number" v-model="productPrice" class="form-control col-10" id="productPrice" placeholder="Price"></div>
                  <div class="col"><label for="Quantity">Quantity:</label></div>
                  <div class="col-4"><input type="number" v-model="productQuantity" class="form-control col-10" id="productQuantity" placeholder="Quantity"></div>
              </div>
            </div>
          </div>
<!-- store stuff end -->

          <button type="submit" class="btn btn-dark">Submit</button>
          </form>
        </div>
      </div>
  <!-- // EDIT MODE END -->

    </div>
  </div>

</template>

<script>
import db from "../../db";
import firebaseMixin from "../../mixins/firebaseMixin.js";
import { bus } from "../../main.js";
import addYT from "../../components/HiddenEditorPanel/addYT";
import addIMG from "../../components/HiddenEditorPanel/addIMG";
import { storage, storageRef } from "../../db";

export default {
  name: "EditRelease",
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
      selectedFile: null
    };
  },
  methods: {
    getSelectedDocData(selectedId) {
      db.collection("releases")
        .doc(selectedId)
        .get()
        .then(doc => {
          this.id = doc.id;
          this.artist = doc.data().artist;
          this.title = doc.data().title;
          this.imgArray = doc.data().imgArray;
          this.ReleaseDate = doc.data().ReleaseDate;
          this.Description = doc.data().Description;
          this.youTubeArray = doc.data().youTubeArray;
          this.format = doc.data().format;
          this.additionalFormatDesc = doc.data().additionalFormatDesc;
          this.actualImgRelease = doc.data().imgArray[0];
          this.releaseInfoNotHidden = false;
          this.productPrice = doc.data().productPrice;
          this.productQuantity = doc.data().productQuantity;
          console.log(doc.data());
        });
    },
    updateRelease(
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
        .doc(this.selectedId)
        .set({
          artist: this.artist,
          title: this.title,
          imgArray: this.imgArray,
          format: this.format,
          additionalFormatDesc: this.additionalFormatDesc,
          ReleaseDate: this.ReleaseDate,
          Description: this.Description,
          youTubeArray: this.youTubeArray,
          actualImgRelease: this.imgArray[0],
          releaseInfoNotHidden: false,
          productPrice: this.productPrice,
          productQuantity: this.productQuantity,
          isProductCardVisible: false
        })
        .then(
          setTimeout(() => {
            this.refreshData();
          }, 300)
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
      this.getSelectedDocData(id);
    },
    del(id) {
      db.collection("releases")
        .doc(id)
        .delete();
      console.log(id);
      setTimeout(() => {
        this.refreshData();
      }, 300);
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
      this.imgArrayBusEmitter();
    }
  },
  computed: {},

  mixins: [firebaseMixin]
};
</script>

<style lang="scss">
</style>
