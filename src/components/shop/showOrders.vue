<template>
  <div id="showOrders" class="col">
      <div class="col titleOfComponent text-center" @click="hideComponent = !hideComponent"><h3>NEW ORDERS</h3></div>
      <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
    <div class="col extramarginbottom" v-show="hideComponent">

    <div class="row">
      <div class="col">
        <button class="btn btn-dark" @click="refreshOrders()">Refresh</button>
      </div>
    </div>

      <div class="col text-uppercase orderBox">
        <div v-for="(o,i) in newOrders" :key="i">

          <div class="col text-center footerBgk contentBox text-white" @click="o.hideDetails = !o.hideDetails">
            <h2>ORDER NUMBER: {{o.orderNumber}}</h2>
            <div class="row">
              <div class="col-2">
                <div class="col-1 text-left text-success"><span v-show="o.orderSent">SENT </span></div>
                <div class="col-1 text-left text-danger"><span v-show="!o.orderSent">UNSENT</span></div>
                <div class="col-1 text-left text-success"><span v-show="o.orderPaid">Paid</span></div>
                <div class="col-1 text-left text-danger"><span v-show="!o.orderPaid">UNPaid</span></div>
                <div class="col-1 text-left text-success"><span v-show="o.orderCompleted">Completed</span></div>
                <div class="col-1 text-left text-danger"><span v-show="!o.orderCompleted">UNCompleted</span></div>
              </div>
            <div class="col-8">
              <div class="col">
                <p>{{o.personalData.firstname}} {{o.personalData.lastname}}: {{o.globalTotalPrice}} PLN </p>
              </div>
            </div>
            <div class="col">
              <button @click="deleteOrder(o.orderNumber)" class="btn btn-dark">Delete</button>
            </div>
            </div>

          </div>
          <div class="row" v-show="o.hideDetails">
            <div class="col-4 contentBox" >
              <div class="col font-weight-bold"><h3>{{o.personalData.firstname}} {{o.personalData.lastname}}</h3></div>
              <div class="col font-italic">{{o.personalData.email}} {{o.personalData.phone}}</div>
              <div class="col font-weight-bold">{{o.personalData.adress}}</div>
              <div class="col">{{o.personalData.State}}</div>
              <div class="col font-weight-bold">{{o.personalData.postalCode}} {{o.personalData.City}}</div>
              <div class="col font-weight-bold">{{o.personalData.Country}}</div>
              <div class="col"><hr></div>
              <div class="col font-weight-bold">

                <form @submit.prevent="updateOrderStatus(o.orderNumber, o.orderPaid, o.orderCompleted, o.orderSent)">

                <div class="col">
                  <input type="checkbox" id="orderPaid" value="orderPaid" v-model="o.orderPaid">
                  <label for="orderPaid">Paid</label>
                </div>

                <div class="col">
                  <input type="checkbox" id="orderCompleted" value="orderCompleted" v-model="o.orderCompleted">
                  <label for="orderCompleted">Completed</label>
                </div>

                <div class="col">
                  <input type="checkbox" id="orderSent" value="orderSent" v-model="o.orderSent">
                  <label for="orderSent">Sent</label>
                </div>

                <div class="col">
                  <button type="submit" class="btn btn-outilne-secondary">Update Status</button>
                </div>
                </form>
              </div>
            </div>
            <div class="col contentBox text-justify">
              <div class="col contentBox" v-for="(ord, idx) in o.currentUserOrdersList" :key="idx">
                <div class="row font-weight-bold">
                  <div class="col-6">{{ord.artist}}</div>
                  <div class="col-6"> "{{ord.title}}"</div>
                  </div>
                <div class="row">
                  <div class="col font-italic"> {{ord.format}}: {{ord.additionalFormatDesc}} </div>
                </div>
                <div class="row">
                  <div class="col-3 font-weight-bold">{{ord.orderedProducts}}
                    <span v-if="(ord.orderedProducts) > 1">copies</span>
                    <span v-else>copy</span>
                     </div>
                  <div class="col-4"> {{ord.productPrice}} PLN for each</div>
                  <div class="col"> is equal to {{ord.productPrice * ord.orderedProducts}} PLN</div>
                </div>
              </div>
              <div class="col row contentBox">
                <div class="col-12">ORDERED ITEMS:{{o.totalPriceMusic}}</div>
                <div class="col-12">COST OF SHIPPING : {{o.costsOfShipping}} PLN</div>
                <div class="col-12"><h2>TOTAL :{{o.globalTotalPrice}} PLN</h2></div>
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
import db from "../../db";
import firebaseMixin from "../../mixins/firebaseMixin.js";

export default {
  name: "showOrders",
  created() {},
  data() {
    return {
      newOrders: [],
      orderNumber: "",
      orderPaid: false,
      orderCompleted: false,
      orderSent: false,
      selectedArray: [],
      finishedOrders: [],
      ordersButton: false
    };
  },
  watch: {},
  methods: {
    showOrHidePnael(data) {
      console.log(data);
      if (data) {
        data = "none";
      } else if (data == "none") {
        data = true;
      }
      console.log(data);
    }
  },
  computed: {},

  mixins: [firebaseMixin]
};
</script>

<style lang="scss">
</style>
