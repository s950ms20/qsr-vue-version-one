import db from "../db";
import firebase from "firebase";

export default {
  created() {
    // CONNECTED WITH: RELEASES COMPONENT, ADD RELEASE, EDIT RELEASE, SIDE BAR (->LAST3)
    this.releases.splice(0, this.releases.length);
    db.collection("releases")
      .orderBy("ReleaseDate", "desc")
      .get()
      .then(
        // .onSnapshot(
        querySnapshot => {
          querySnapshot.forEach(doc => {
            // console.log(`${doc.data().artist}: ${doc.data().title} id: ${doc.id}`);
            const data = {
              id: doc.id,
              artist: doc.data().artist,
              title: doc.data().title,
              imgArray: doc.data().imgArray,
              ReleaseDate: doc.data().ReleaseDate,
              Description: doc.data().Description,
              youTubeArray: doc.data().youTubeArray,
              format: doc.data().format,
              additionalFormatDesc: doc.data().additionalFormatDesc,
              actualImgRelease: doc.data().imgArray[0],
              releaseInfoNotHidden: doc.data().releaseInfoNotHidden,
              productPrice: doc.data().productPrice,
              productQuantity: doc.data().productQuantity,
              isProductCardVisible: doc.data().isProductCardVisible
            };
            this.releases.push(data);
            // console.log(this.releases);
          });
        }
      );

    // CONNECTED WITH: NEWS, ADD NEWS, EDIT NEWS
    this.posts.splice(0, this.posts.length);
    db.collection("posts")
      .get()
      .then(
        // .onSnapshot(
        querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              postTitle: doc.data().postTitle,
              imgArray: doc.data().imgArray,
              actualImg: doc.data().imgArray[0],
              postText: doc.data().postText,
              youTubeArray: doc.data().youTubeArray,
              postActualTime: doc.data().postActualTime,
              postInfoNotHidden: false
            };
            this.posts.push(data);
          });
        }
      );

    // CONNECTED WITH: SHOP  // UNFINISHED ORDERS
    this.newOrders.splice(0, this.newOrders.length);
    db.collection("orders")
      .orderBy("orderNumber", "desc")
      .where("orderSent", "==", false)
      .get()
      .then(
        // .onSnapshot(
        querySnapshot => {
          querySnapshot.forEach(doc => {
            const orderData = {
              id: doc.id,
              orderNumber: doc.data().orderNumber,
              orderPaid: doc.data().orderPaid,
              orderCompleted: doc.data().orderCompleted,
              orderSent: doc.data().orderSent,
              currentUserOrdersList: doc.data().currentUserOrdersList,
              personalData: doc.data().personalData,
              costsOfShipping: doc.data().costsOfShipping,
              globalTotalPrice: doc.data().globalTotalPrice,
              totalPriceMusic: doc.data().totalPriceMusic,
              orderNumber: doc.data().orderNumber,
              hideDetails: doc.data().hideDetails
            };
            this.newOrders.push(orderData);
          });
        }
      );

    // CONNECTED WITH: SHOP // FINISHED ORDERS
    db.collection("orders")
      .orderBy("orderNumber", "desc")
      .where("orderSent", "==", true)
      .get()
      .then(
        // .onSnapshot(
        querySnapshot => {
          querySnapshot.forEach(doc => {
            const orderData = {
              id: doc.id,
              orderNumber: doc.data().orderNumber,
              orderPaid: doc.data().orderPaid,
              orderCompleted: doc.data().orderCompleted,
              orderSent: doc.data().orderSent,
              currentUserOrdersList: doc.data().currentUserOrdersList,
              personalData: doc.data().personalData,
              costsOfShipping: doc.data().costsOfShipping,
              globalTotalPrice: doc.data().globalTotalPrice,
              totalPriceMusic: doc.data().totalPriceMusic,
              orderNumber: doc.data().orderNumber,
              hideDetails: doc.data().hideDetails
            };
            this.finishedOrders.push(orderData);
          });
        }
      );

    // CONNECTED WITH: LOGIN, LOGOUT, MENU APP(NAVBAR)
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
      // this.$emit('loggedIn', 'this.isLoogedIn')
    }
  },
  data() {
    return {
      hideComponent: false,
      // RELEASES
      artist: "",
      title: "",
      imgArray: "",
      format: "",
      additionalFormatDesc: "",
      ReleaseDate: "",
      Description: ``,
      youTubeArray: "",
      releases: [],
      releaseInfoNotHidden: false,
      last3releases: [],
      id: "",
      artistFolder: [],
      actualImgRelease: "",
      // extraone: [],

      // NEWS
      posts: [],
      postTitle: "",
      imgArray: "",
      postImg2: "",
      postImg3: "",
      postText: "",
      youTubeArray: "",
      postExpander: false,
      actualImg: "",
      postActualTime: "",
      postInfoNotHidden: false,

      // LOGIN & LOGOUT
      isLoggedIn: false,
      currentUser: false,

      // STORE STUFF
      productPrice: 0,
      productQuantity: 0,
      isProductCardVisible: false,
      newOrders: [],
      finishedOrders: []
    };
  },
  methods: {
    // RELEASES COMPONENT -> INDIVIDUAL RELEASE TOGGLE BUTTON
    showReleaseInfo(idx) {
      this.releases[idx].releaseInfoNotHidden = !this.releases[idx]
        .releaseInfoNotHidden;
    },
    // NEWS -> INDIVIDUAL NEWS TOGGLE BUTTON
    showPostInfo(idx) {
      this.posts[idx].postInfoNotHidden = !this.posts[idx].postInfoNotHidden;
    },

    // RELEASE
    refreshData() {
      this.releases.splice(0, this.releases.length);
      this.releases.length = 0;
      db.collection("releases")
        .orderBy("ReleaseDate", "desc")
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              artist: doc.data().artist,
              title: doc.data().title,
              imgArray: doc.data().imgArray,
              ReleaseDate: doc.data().ReleaseDate,
              Description: doc.data().Description,
              youTubeArray: doc.data().youTubeArray,
              format: doc.data().format,
              additionalFormatDesc: doc.data().additionalFormatDesc,
              actualImgRelease: doc.data().imgArray[0],
              productPrice: doc.data().productPrice,
              productQuantity: doc.data().productQuantity,
              isProductCardVisible: doc.data().isProductCardVisible
            };
            this.releases.push(data);
            console.log(this.releases);
          });
        });
    },
    // RELEASE -> ARTISTS PAGE'S
    selectByArtist(artistName) {
      this.artistFolder.splice(0, this.artistFolder.length);
      db.collection("releases")
        .orderBy("ReleaseDate", "desc")
        .where("artist", "==", artistName)
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              artist: doc.data().artist,
              title: doc.data().title,
              imgArray: doc.data().imgArray,
              ReleaseDate: doc.data().ReleaseDate,
              Description: doc.data().Description,
              youTubeArray: doc.data().youTubeArray,
              format: doc.data().format,
              additionalFormatDesc: doc.data().additionalFormatDesc,
              actualImgRelease: doc.data().imgArray[0],
              productPrice: doc.data().productPrice,
              productQuantity: doc.data().productQuantity,
              isProductCardVisible: doc.data().isProductCardVisible
            };
            this.artistFolder.push(data);
          });
        });
    },
    // NEWS
    refreshNewsData() {
      this.posts.splice(0, this.posts.length);
      db.collection("posts").onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            postTitle: doc.data().postTitle,
            imgArray: doc.data().imgArray,
            actualImg: doc.data().imgArray[0],
            postText: doc.data().postText,
            youTubeArray: doc.data().youTubeArray,
            postActualTime: doc.data().postActualTime
          };
          this.posts.push(data);
        });
      });
    },
    // LOGIN LOGINBAR
    login() {
      // console.log(`${this.email} & ${this.password}`);
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`You are logged in as ${this.email}`);
            this.$router.go({
              path: "/adminView"
            });
          },
          error => {
            alert(error.message);
          }
        );
    },
    hideAndShowComponent() {
      this.hideComponent = !this.hideComponent;
    },
    // SHOPPING CART STUFF
    // CONNECTED WITH: SHOP
    refreshOrders() {
      this.newOrders.splice(0, this.newOrders.length);
      db.collection("orders")
        .orderBy("orderNumber", "desc")
        .where("orderSent", "==", false)
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            const orderData = {
              id: doc.id,
              orderNumber: doc.data().orderNumber,
              orderPaid: doc.data().orderPaid,
              orderCompleted: doc.data().orderCompleted,
              orderSent: doc.data().orderSent,
              currentUserOrdersList: doc.data().currentUserOrdersList,
              personalData: doc.data().personalData,
              costsOfShipping: doc.data().costsOfShipping,
              globalTotalPrice: doc.data().globalTotalPrice,
              totalPriceMusic: doc.data().totalPriceMusic,
              orderNumber: doc.data().orderNumber,
              hideDetails: doc.data().hideDetails
            };
            this.newOrders.push(orderData);
          });
        });
      setTimeout(() => {
          console.log(this.newOrders);
        }),
        200;
    },
    refreshFinishedOrders() {
      this.finishedOrders.splice(0, this.finishedOrders.length);
      db.collection("orders")
        .orderBy("orderNumber", "desc")
        .where("orderSent", "==", true)
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            const orderData = {
              id: doc.id,
              orderNumber: doc.data().orderNumber,
              orderPaid: doc.data().orderPaid,
              orderCompleted: doc.data().orderCompleted,
              orderSent: doc.data().orderSent,
              currentUserOrdersList: doc.data().currentUserOrdersList,
              personalData: doc.data().personalData,
              costsOfShipping: doc.data().costsOfShipping,
              globalTotalPrice: doc.data().globalTotalPrice,
              totalPriceMusic: doc.data().totalPriceMusic,
              orderNumber: doc.data().orderNumber,
              hideDetails: doc.data().hideDetails
            };
            this.finishedOrders.push(orderData);
          });
        });
    },
    updateOrderStatus(idx, paid, completed, sent) {
      console.log(idx);
      db.collection("orders")
        .doc(idx)
        .update({
          orderPaid: paid,
          orderCompleted: completed,
          orderSent: sent
        });
      setTimeout(() => {
        this.refreshOrders();
      }, 100);
    },
    updateOrderStatusForFinishedOreders(idx, paid, completed, sent) {
      console.log(idx);
      db.collection("orders")
        .doc(idx)
        .update({
          orderPaid: paid,
          orderCompleted: completed,
          orderSent: sent
        });
      setTimeout(() => {
        this.refreshFinishedOrders();
      }, 100);
    },
    deleteOrder(id) {
      db.collection("orders")
        .doc(id)
        .delete()
        .then(
          setTimeout(() => {
            this.refreshOrders();
          }, 200)
        );
    },
    showBigImg(idx, $event) {
      window.open($event.target.src);
    }
  },
  computed: {},
  firebase: {
    releases: db.collection("releases"),
    posts: db.collection("posts"),
    orders: db.collection("orders")
  }
};
