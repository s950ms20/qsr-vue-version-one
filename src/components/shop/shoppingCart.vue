<template>
  <div id="shoppingCart" class="col">
    <div class="col titleOfComponent text-center" @click="hideComponent = !hideComponent">
      <h2>SHOPPING CART</h2>
    </div>
<transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
  <div>
    <div class="col contentBox orderBox extramarginontop" v-show="hideComponent">
              <div class="col"><button class="btn btn-dark" @click="clearAllFields()">New Order / Clear Fields</button></div>
              <hr>

      <div class="col">
          <div class="col"><div class="col"><h3 name="orderNumber">YOUR ORDER: {{orderNumber}}</h3></div></div>
          <ul v-for="(or, i) of this.currentUserOrdersList" :key="i">
              <li class="row">
                  <div class="col-12 col-sm-6 col-md-4 col-lg-2">{{or.artist}}</div>
                  <div class="col-12 col-sm-6 col-md-4 col-lg-2">"{{or.title}}"</div>
                  <div class="col-12 col-sm-6 col-md-4 col-lg-2">{{or.format}}: {{or.additionalFormatDesc}}</div>
                  <div class="col-6 col-sm-3 col-md-2 col-lg-1">{{or.orderedProducts}}</div>
                  <div class="col-6 col-sm-3 col-md-2 col-lg-1">{{or.productPrice}} PLN</div>
                  <div class="col-4 col-sm-3 col-md-2 col-lg"><button @click="addOneCopy(i)" class="btn btn-dark">+</button></div>
                  <div class="col-4 col-sm-3 col-md-2 col-lg"><button @click="deleteOneCopy(i)" class="btn btn-dark">-</button></div>
                  <div class="col-4 col-sm-3 col-md-2 col-lg"><button @click="deletePosition(i)" class="btn btn-dark">Del</button></div>
                  <div class="col-12 col-sm-3 col-md-2 col-lg">{{totalPriceProduct(i)}} PLN</div>

              </li>
          </ul>
      </div>
      <div class="row">
        <div class="col"></div>
            <div class="col-4 col-sm-4 col-md-4 text-right">SHIPPING:</div>
            <div class="col col-sm-6 col-md-4 text-right">
              <select class="custom-select" v-model="costsOfShipping">
                <option selected value="12">Shipping #1: 12 PLN</option>
                <option value="20">Shipping #2: 20 PLN</option>
                <option value="35">Shipping #3: 35 PLN</option>
              </select>
            </div>
      </div>
          <hr>
        <div class="row">
          <div class="col"></div>
          <div class="col"></div>
          <div class="col-4 col-sm-3 col-md-2 col-lg-2">
            <button @click="calculate()" class="btn btn-dark">Calculate</button>
          </div>
        </div>
      <div class="row extramarginontop">
        <div class="col">
          <form v-on:submit.prevent.once="addNewOrder($event)"
          method="post" action="orderConfirmation.php"

          >
              <div class="row form-group">
                <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                  <div class="row">
                    <div class="form-group col-6">
                      <label for="firstname">Firstname:</label>
                      <input v-model="personalData.firstname" name="firstname" type="personalData.firstname" class="form-control" id="personalData.firstname" aria-describedby="personalData.firstname" placeholder="Enter Your firstname">
                    </div>
                    <div class="form-group col-6">
                      <label for="lastname">Lastname:</label>
                      <input v-model="personalData.lastname" name="lastname" type="personalData.lastname" class="form-control" id="personalData.lastname" aria-describedby="personalData.lastname" placeholder="Enter Your lastname">
                    </div>
                  </div>

                  <div class="row">
                    <div class="form-group col-12">
                        <label for="adress">Adress:</label>
                        <input v-model="personalData.adress" name="adress" type="personalData.adress" class="form-control" id="personalData.adress" aria-describedby="personalData.adress" placeholder="Enter Your adress">
                    </div>
                  </div>

                  <div class="row">
                    <div class="form-group col-6">
                        <label for="postalCode">Postal Code:</label>
                        <input v-model="personalData.postalCode" name="postalCode" type="personalData.postalCode" class="form-control" id="personalData.postalCode" aria-describedby="personalData.postalCode" placeholder="Enter Your Postal Code">
                    </div>
                    <div class="form-group col-6">
                        <label for="City">City:</label>
                        <input v-model="personalData.City" name="City" type="personalData.City" class="form-control" id="personalData.City" aria-describedby="personalData.City" placeholder="Enter Your City name">
                    </div>
                  </div>

                  <div class="row">
                    <div class="form-group col-6">
                        <label for="State">State / Region:</label>
                        <input v-model="personalData.State" name="State" type="personalData.State" class="form-control" id="personalData.State" aria-describedby="personalData.State" placeholder="Enter Your State">
                    </div>
                    <div class="form-group col-6">
                        <label for="Country">Country:</label>
                        <input v-model="personalData.Country" name="Country" type="personalData.Country" class="form-control" id="personalData.Country" aria-describedby="personalData.Country" placeholder="Enter Your Country">
                    </div>
                  </div>

                  <div class="row">
                    <div class="form-group col-6">
                        <label for="phone">Phone number:</label>
                        <input v-model="personalData.phone" name="phone" type="personalData.phone" class="form-control" id="personalData.phone" aria-describedby="personalData.phone" placeholder="Enter Your phone">
                    </div>
                    <div class="form-group col-6">
                        <label for="email">Email:</label>
                        <input v-model="personalData.email" name="email" type="personalData.email" class="form-control" id="personalData.email" aria-describedby="personalData.email" placeholder="Enter Your email">
                    </div>
                  </div>

                </div>
              </div><hr>

            <button :disabled="globalTotalPrice < 1" type="submit" class="btn btn-dark" name="submit"
            >Confirm your order</button>
          </form>

        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6">

          <div class="row extramarginontop">
            <h3>
              <div class="col font-weight-bold">Order: {{orderNumber}}</div>
              <div class="col font-weight-bold">{{personalData.firstname}} {{personalData.lastname}}</div>
              <div class="col-12">{{personalData.adress}}</div>
              <div class="col-12">{{personalData.postalCode}} {{personalData.City}}</div>
              <div class="col-12">{{personalData.State}} {{personalData.Country}}</div>
              <div class="col-12">{{personalData.phone}}</div>
              <div class="col-12">{{personalData.email}}</div>
              <div class="col" name="totalPriceMusic">Ordered Items: {{totalPriceMusic}} PLN</div>
              <div class="col" name="costsOfShipping">Shipping: {{costsOfShipping}} PLN</div>
              <div class="col font-weight-bold" name="globalTotalPrice">Total Price: {{globalTotalPrice}} PLN</div>
            </h3>
          </div>

        </div>
      </div>
      </div>
      </div>
</transition>

    </div>
</template>

<script>
import db from "../../db";
import firebaseMixin from "../../mixins/firebaseMixin.js";
import { bus } from "../../main.js";
import newsVue from "../news.vue";

export default {
  name: "shoppingCart",
  created() {
    bus.$on("currentUserOrdersList", data => {
      this.currentUserOrdersList = data;
      console.log(this.currentUserOrdersList);
    });
  },
  data() {
    return {
      copiesLeft: "",
      newValue: "",
      ordPrd: "",
      hideComponent: false,
      currentUserOrdersList: "",
      totalPriceMusic: 0,
      costsOfShipping: 12,
      globalTotalPrice: 0,
      personalData: {
        firstname: "",
        lastname: "",
        adress: "",
        postalCode: "",
        City: "",
        Country: "",
        State: "",
        phone: "",
        email: ""
      },
      orderNumber: "",
      orderPaid: false,
      orderCompleted: false,
      orderSent: false
    };
  },
  methods: {
    calculate() {
      let total = 0;
      this.currentUserOrdersList.forEach(l => {
        total += Number(l.productPrice * l.orderedProducts);
      });
      this.totalPriceMusic = total;
      this.globalTotalPrice =
        Number(this.totalPriceMusic) + Number(this.costsOfShipping);
    },
    addOneCopy(idx) {
      this.currentUserOrdersList[idx].orderedProducts += 1;
      this.calculate();
    },
    deleteOneCopy(idx) {
      if (this.currentUserOrdersList[idx].orderedProducts > 1) {
        this.currentUserOrdersList[idx].orderedProducts -= 1;
        this.calculate();
      } else {
        alert("Operation not allowed!");
        this.calculate;
      }
    },
    deletePosition(idx) {
      this.currentUserOrdersList.splice(idx, 1);
      console.log(this.currentUserOrdersList);
    },
    totalPriceProduct(idx) {
      return (
        this.currentUserOrdersList[idx].orderedProducts *
        this.currentUserOrdersList[idx].productPrice
      );
    },

    addNewOrder($event) {
      $event.target[9].disabled = true;
      this.orderNumber =
        "ORDR_NR_" +
        new Date().getFullYear().toString() +
        (new Date().getMonth() + 1).toString() +
        new Date().getDate().toString() +
        "_" +
        Math.random()
          .toString()
          .slice(2, 6);

      db.collection("orders")
        .doc(this.orderNumber)
        .set({
          currentUserOrdersList: this.currentUserOrdersList,
          personalData: this.personalData,
          costsOfShipping: this.costsOfShipping,
          globalTotalPrice: this.globalTotalPrice,
          totalPriceMusic: this.totalPriceMusic,
          orderNumber: this.orderNumber,
          orderPaid: false,
          orderCompleted: false,
          orderSent: false,
          hideDetails: false
        })
        .then(this.quantityManagment())
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch(error => {
          console.error("Error writing document: ", error);
        });
    },
    quantityManagment() {
      this.currentUserOrdersList
        .forEach(element => {
          db.collection("releases")
            .doc(element.releaseID)
            .get()
            .then(doc => {
              this.copiesLeft = doc.data().productQuantity;
              this.ordPrd = element.orderedProducts;
              this.newValue = Number(this.copiesLeft) - Number(this.ordPrd);
              console.log(this.copiesLeft);
              console.log(this.ordPrd);
              console.log(this.newValue);
              console.log(this.orderData);
              db.collection("releases")
                .doc(element.releaseID)
                .update({
                  productQuantity: this.newValue
                });
            });
        })
        .then(
          setTimeout(() => {
            this.refreshData();
          }, 200)
        );
    },
    refreshOrders() {
      this.newOrders.splice(0, this.newOrders.length);
      db.collection("orders")
        .orderBy("orderNumber", "desc")
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
    clearAllFields() {
      (this.currentUserOrdersList = []),
        (this.personalData = []),
        (this.costsOfShipping = 12),
        (this.globalTotalPrice = 0),
        (this.totalPriceMusic = 0),
        (this.orderNumber = "");
    }
  },
  computed: {},

  mixins: [firebaseMixin]
};
</script>

<style lang="scss">
</style>
