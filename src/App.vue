<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col-12">
          <loginbar></loginbar>
      </div>
    </div>
      <div class="row">
        <div class="col-4"></div>
        <div class="col-4 mx-auto logo"><logo></logo></div>
        <div class="col"></div>
        <div class="col-3 col-sm-3 col-md-3 col-lg-2"><socialMedia></socialMedia></div>
      </div>
      <div class="row">
        <div class="col">
          <router-view></router-view>
        </div>
      </div>
      <train></train>
      <div class="row footerBgk text-white">
        <footerAPP></footerAPP>
      </div>
  </div>
</template>

<script>
export default {
  name: "app",
  created() {},
  data() {
    return {
      isLoggedIn: false
    };
  },
  computed: {}
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Bangers|Chewy|Monoton|Josefin+Slab|Special+Elite|Comfortaa ");
@import url("https://fonts.googleapis.com/css?family=IBM+Plex+Mono:400,400i|IBM+Plex+Sans+Condensed:400,400i|IBM+Plex+Sans:100,100i,400,400i,700,700i|IBM+Plex+Serif:400,400i");
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css");

$paleGoldColor: #c0b283;
$silkColor: #dcd0c0;
$paperColor: #f4f4f4;
$charcoalColor: #373737;

body {
  background-color: rgb(41, 41, 41);
  font-family: "IBM Plex Sans Condensed", sans-serif;
}

#app {
  color: $charcoalColor;
  // background-color: #bdac82;
  background-color: $paleGoldColor;
  // opacity: 0.9;
  font-size: 16px;
  // filter: saturate(1);
  background-image: url("../src/assets/qsr/photo-1514810771018-276192729582v3.png");
}

.container {
  filter: saturate(1);
}

.albumCover {
  margin: 5px;
  border-radius: 10%;
  cursor: -webkit-grab;
}

.albumCoverChange:hover {
  margin: 5px;
  border-radius: 100%;
  padding: 70px;
  background-color: black;
}
.box {
  border: 2px double black;
  margin: 10px;
  padding: 10px;
  background-color: beige;
}

.postImg {
  margin: 5px;
  padding: 5px;
  border-radius: 5%;
  cursor: -webkit-grab;
}

.train {
  margin: 20px;
}

.extra30pxBottomMargin {
  margin-bottom: 30px;
}

.socialMediaIcon,
.loginbar,
.logo,
.footerAPP {
  margin: 20px;
}

li {
  list-style: none;
}

.dropDownRadiusBorder {
  border-radius: 30px;
}

.titleOfComponent {
  font-weight: bold;
  // border: 1px solid black;
  padding: 10px;
  // box-shadow: 5px 5px 10px;
  margin: 10px;
  border-radius: 10px;
  // background-color: $paleGoldColor;
  // font-family: "Josefin Slab", cursive;
}

.extramarginontop {
  margin-top: 30px;
}

.orderBox {
  margin: 10px;
  border: 2px solid black;
  box-shadow: 2px 2px 2px;
  border-radius: 10px;
}

.contentBox {
  border: 1px solid black;
  margin: 5px;
  padding: 15px;
  border-radius: 10px;
}

.extramarginbottom {
  margin-bottom: 30px;
}

.footerBgk {
  background-color: $charcoalColor;
  //  #3e3838;
}

img {
  margin: 0px;
  padding: 0px;
}

.imgSlider,
.newsDesc {
  // border: 1px solid black;
  // border-right: 1px solid black;
  // border-bottom: 1px solid black;
  // box-shadow: 2px 2px 12px 1px;
  margin: 5px;
  padding: 5px;
}

// .imgSlider:hover {
//   filter: invert(75%) grayscale(100%);
//   border: 1px solid white;
// }

.btn-dark {
  background-color: $charcoalColor;
}

.releaseClass {
  margin-top: 30px;
  margin-bottom: 30px;
}

.imgSliderBig {
  max-height: 450px;
  align-content: center;
}

.imgSliderSmall {
  max-height: 150px;
}
</style>
