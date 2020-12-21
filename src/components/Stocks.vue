<template>
  <div>

    <br>
    <br>
    <div v-for="(stock, index) in stocks" :key="index">
      <div class="card portfolio-card">
        <div class="card-header portfolio-card-header">
          {{ stock.name }} ( Price: {{ stock.price }} | Quantity: {{ stock.qty }})
        </div>
        <div class="card-body">
          <div class="form-inline">
            <input type="number" v-model="stock.value" min="0" placeholder="Quantity" class="form-control"
                   style="width: 300px;">
            <button type="button" class="btn btn-success" style="width: 90px;" @click="buy(stock, index)"
                    :disabled="disableBuyButton(index)">Buy
              <!--:disabled="stock.value === null"-->
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

    name: 'Stocks',
    data: function () {
      return {
        stocks: [
          {name: 'Apple', price: 100, qty: 0, value: null},
          {name: 'BMW', price: 140, qty: 0, value: null},
          {name: 'Google', price: 130, qty: 0, value: null},
          {name: 'Twitter', price: 99, qty: 0, value: null},
        ],
        funds: 10000,
        sellStock: [],
        totalPrice: 0
      }
    },
    methods: {
      randomNumber(min, max) {
        return Math.floor((Math.random() * (max - min)) + min);
      },

      buy(stock, index) {

        if (this.funds >= this.totalPrice) {
          this.totalPrice = parseInt(stock.value) * this.stocks[index].price;
          this.funds -= this.totalPrice;
          this.stocks[index].qty += parseInt(stock.value);
          this.stocks[index].value = null;

          if (this.sellStock.indexOf(stock) === -1) {
            this.sellStock.push(this.stocks[index]);
          }

          eventBus.$emit('total-funds', this.funds);
          eventBus.$emit('add-to-portofolio', this.sellStock);

        }
        else {
          this.disableBuyButton(index);
        }
      },

      disableBuyButton(index) {
        if ((this.stocks[index].value > this.stocks[index].price) || (this.stocks[index].value <= 0)) {
          return true;
        }
        else {
          return false;
        }
      }
    },

    created() {
      eventBus.$on('endButton', () => {
        for (let index in this.stocks) {
          this.stocks[index].price = this.randomNumber(80, 110);
        }
      });
      eventBus.$on('qty-in-total', (qty) => {
        this.stocks[index].price = qty;
      });

      eventBus.$on('save', () => {
        localStorage.setItem('savedData', JSON.stringify(this.stocks));
      });
      eventBus.$on('load', () => {
        this.stocks = JSON.parse(localStorage.getItem('savedData'))
      });
      eventBus.$on('funds-in-total', (sellFunds) => {
        this.funds = sellFunds;
      });
    }

  }
</script>

<style>
  .portfolio-card-header {
    background-color: #d0ffd0;
  }

  .btn-success {
    margin-left: auto;
    color: #fff;
    background-color: #28a745;
    border-color: #28a745;
  }

  .btn:disabled {
    opacity: .65;
  }

</style>