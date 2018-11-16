// COMPONENTS - IMPORTING
import Vue from "vue";
import App from "./App.vue";
import artists from "./components/artists.vue";
import news from "./components/news.vue";
import about from "./components/about.vue";
import releasesComponent from "./components/releasesComponent.vue";
import train from "./components/train.vue";
import menuAPP from "./components/menuAPP.vue";
import sidebar from "./components/sidebar.vue";
import logo from "./components/logo.vue";
import BootstrapVue from "bootstrap-vue";
import graf from "./components/aboutArtists/graf.vue";
import metro from "./components/aboutArtists/metro.vue";
import AddRelease from "./components/HiddenEditorPanel/AddRelease.vue";
import EditRelease from "./components/HiddenEditorPanel/EditRelease.vue";
import ShowReleases from "./components/HiddenEditorPanel/ShowReleases.vue";
import AddNews from "./components/addNews.vue";
import EditNews from './components/editNews.vue'
import soecialMedia from "./components/socialMedia.vue";
import login from './components/login.vue'
import firebase from 'firebase';
import './db/index'
import router from './routes'
import VueResource from "vue-resource";
import logout from './components/logout.vue'
import loginbar from './components/loginbar.vue'
import footerAPP from './components/footerAPP.vue'
import shoppingCart from './components/shop/shoppingCart.vue'
import product from './components/shop/product.vue'
import showOrders from './components/shop/showOrders.vue'
import editorPanel from "./components/HiddenEditorPanel/editorPanel.vue";
import finishedOrders from "./components/shop/finishedOrders.vue";
import addIMG from './components/HiddenEditorPanel/addIMG.vue'
import addYT from './components/HiddenEditorPanel/addYT.vue'
import auth from './components/auth.vue'
import userView from './components/userView.vue'
import adminView from './components/adminView.vue'


//DROPBOX IMG HOSTING
// import Dropbox from 'dropbox';
// import DropboxTeam from 'dropbox';
// import './dropbox/index'
// Vue.use(Dropbox)
// Vue.use(DropboxTeam)
// Vue.ude(DropboxTypes)

// SCSS & BOOTSTRAP
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// JQuery
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";

// VUE ROUTER
import VueRouter from "vue-router";
import Routes from "./routes";

// let router = new VueRouter({
//   routes: Routes,
//   mode: "history"
// });

// VUE YOUTUBE COMPONENT
import VueYouTubeEmbed from "vue-youtube-embed";
Vue.use(VueYouTubeEmbed);

// VUE TEXT EDITOR
import "vue-trix";

// VUE USE
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(VueResource)

// COMPONENTS - REGISTRATION
Vue.component("artists", artists);
Vue.component("news", news);
Vue.component("about", about);
Vue.component("releasesComponent", releasesComponent);
Vue.component("train", train);
Vue.component("menuAPP", menuAPP);
Vue.component("sidebar", sidebar);
Vue.component("logo", logo);
Vue.component("graf", graf);
Vue.component("metro", metro);
Vue.component("AddRelease", AddRelease);
Vue.component("EditRelease", EditRelease);
Vue.component("ShowReleases", ShowReleases);
Vue.component("AddNews", AddNews);
Vue.component('EditNews', EditNews)
Vue.component("socialMedia", soecialMedia);
Vue.component('login', login);
Vue.component('logout', logout)
Vue.component('loginbar', loginbar)
Vue.component('footerAPP', footerAPP)
Vue.component('shoppingCart', shoppingCart)
Vue.component('product', product)
Vue.component('showOrders', showOrders)
Vue.component('editorPanel', editorPanel)
Vue.component('finishedOrders', finishedOrders)
Vue.component('addIMG', addIMG)
Vue.component('addYT', addYT)
Vue.component('auth', auth)
Vue.component('adminView', adminView)
Vue.component('userView', userView)

// EVENT BUS
export const bus = new Vue();

// FILTERS
Vue.filter("snippet", value => value.slice(0, 100) + "...");

// CONFIG
Vue.config.ignoredElements = ["trix-editor"];

// let app;
// firebase.auth().onAuthStateChanged(
//   user => {
//     if (!app) {
//       app = new Vue({
//         el: "#app",
//         render: h => h(App),
//         router: router,
//       });
//     }
//   }
// );

// VUE INSTANCE
let app;
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    app = new Vue({
      el: '#app',
      router: router
        // ({ routes: Routes,mode: "history"})
        ,
      template: '<App/>',
      components: {
        App
      }
    });
  }
});
