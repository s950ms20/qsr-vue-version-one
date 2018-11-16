import artists from "./components/artists.vue";
import news from "./components/news.vue";
import about from "./components/about.vue";
import releasesComponent from "./components/releasesComponent.vue";
import graf from './components/aboutArtists/graf.vue'
import metro from './components/aboutArtists/metro.vue'
import AddRelease from './components/HiddenEditorPanel/AddRelease.vue'
import EditRelease from './components/HiddenEditorPanel/EditRelease.vue'
import ShowReleases from './components/HiddenEditorPanel/ShowReleases.vue'
import AddNews from './components/addNews.vue'
import EditNews from './components/editNews.vue'
import login from './components/login'
import register from './components/register'
import firebase from 'firebase'
import Vue from "vue";
import Router from 'vue-router';
import logout from './components/logout.vue'
import shoppingCart from './components/shop/shoppingCart.vue'
import product from './components/shop/product.vue'
import showOrders from './components/shop/showOrders.vue'
import editorPanel from "./components/HiddenEditorPanel/editorPanel.vue";
import userView from './components/userView.vue'
import adminView from './components/adminView.vue'
import finishedOrders from "./components/shop/finishedOrders.vue";

Vue.use(Router);

let router = new Router({
  routes: [

    // {
    //   path: "/artists",
    //   component: artists
    // },
    // {
    //   path: "/news",
    //   component: news
    // },
    // {
    //   path: "/about",
    //   component: about
    // },
    // {
    //   path: "/releasesComponent",
    //   component: releasesComponent
    // },
    // {
    //   path: "/graf",
    //   component: graf
    // },
    // {
    //   path: "/metro",
    //   component: metro
    // },
    {
      path: "/AddRelease",
      component: AddRelease,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/EditRelease",
      component: EditRelease,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/ShowReleases",
      component: ShowReleases
    },
    {
      path: "/AddNews",
      component: AddNews,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/EditNews",
      component: EditNews,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      component: login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/register",
      component: register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/logout",
      component: logout,
      meta: {
        requiresGuest: true
      }
    }, {
      path: "/shoppingCart",
      component: shoppingCart
    },
    {
      path: "/product",
      component: product
    },
    {
      path: "/showOrders",
      component: showOrders,
      meta: {
        requiresAuth: true
      }
    }, {
      path: "/editorPanel",
      component: editorPanel,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/adminView",
      component: adminView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/",
      component: userView,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/finishedOrders",
      component: finishedOrders,
      meta: {
        requiresAuth: true
      }
    }

  ]
})

// Nav Guard
router.beforeEach((to, from, next) => {
    // to and from are both route objects
    if (to.matched.some(record => record.meta.requiresAuth)) {

      if (!firebase.auth().currentUser) {

        next({
          path: '/',
          query: {
            redirect: to.fullPath
          }
        })
      } else {

        next();
      }
    } else if (
      to.matched.some(record => record.meta.requiresGuest)) {

      if (firebase.auth().currentUser) {

        next({
          path: '/adminView',
          query: {
            redirect: to.fullPath
          }
        })
      } else {

        next();
      }
    } else {

      next();
    }
  }

)

export default router;
