<template>
  <div>
    <br>
    <br>
    <div v-if="!show">
      <h4> You dont have any assets </h4>
    </div>
    <div v-for="(stock, index) in sellStock" :key="index">
      <div class="card portfolio-card">
        <div class="card-header portfolio-card-header">
          {{ stock.name }} ( Price: {{ stock.price }} | Quantity: {{ stock.qty }})
        </div>
        <div class="card-body">
          <div class="form-inline">
            <input type="number" v-model="stock.value" min="0" placeholder="Quantity" class="form-control"
                   style="width: 300px;">
            <button type="button" class="btn btn-danger" style="width: 90px;" @click="sell(stock, index)"
                    :disabled="disableSellButton(index)">Sell
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {eventBus} from '../main';

  export default {
    name: 'Portofolio',
    data() {
      return {
        sellStock: [],
        show: false,
        funds: 0,
        totalPrice: 0
      }
    },
    created() {
      eventBus.$on('add-to-portofolio', (someStocks) => {
        this.sellStock = someStocks;
        this.show = true;
      });
//      eventBus.$on('qty-in-total', (qty) => {
//        this.stocks[index].price = qty;
//      });
      eventBus.$on('total-funds', (funds) => {
        this.funds = funds;
      });
      eventBus.$on('endButton', (price) => {
        for (let index in this.sellStock) {
          this.sellStock[index].price = price;
        }
      });
      eventBus.$on('load', () => {
          this.sellStock = (JSON.parse(localStorage.getItem('savedData')).filter(stock => stock.qty > 0))

      })
    },

    methods: {
      sell(stock, index) {
        this.totalPrice = parseInt(stock.value) * this.sellStock[index].price;
        this.funds += this.totalPrice;
        this.sellStock[index].qty -= parseInt(stock.value);
        this.sellStock[index].value = null;

        if (this.sellStock[index].qty === 0) {
          this.sellStock = [];
          this.show = false;
        }
        eventBus.$emit('funds-in-total', this.funds);
      },

      disableSellButton(index) {
        if ((this.sellStock[index].value > this.sellStock[index].qty) || (this.sellStock[index].value <= 0)) {
          return true;
        }
        else {
          return false;
        }
      }
    }
  }
</script>

<style scoped>
  .btn-danger {
    margin-left: auto;
    color: #fff;
  }

  .portfolio-card-header {
    color: blue;
  }


</style>