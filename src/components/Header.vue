<template>
  <div class="row">
    <div class="col-lg-12">
      <nav class="navbar navbar-expand-md navbar-light bg-light border rounded">
        <router-link to="/" class="navbar-brand">Stocker Trader </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse"
                aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <router-link to="/portofolio" tag="li" class="nav-item">
              <a class="nav-link" href="#">Portofolio <span class="sr-only">(current)</span></a>
            </router-link>
            <router-link to="/stocks" tag="li" class="nav-item">
              <a class="nav-link" href="#">Stock</a>
            </router-link>
          </ul>
          <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a class="nav-link" href="#" @click="endDay">End Day</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false">
                  Save & Load
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#" @click="saveDay">Save Day</a>
                  <a class="dropdown-item" href="#" @click="loadDay">Load Day</a>
                </div>
              </li>
              <li class="nav-item active">
                <a class="nav-link" href="#">Funds {{ funds.toLocaleString() }} $ </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
  import {eventBus} from '../main';

  export default {
    name: 'Header',
    data: function () {
      return {
        funds: 10000,
      }
    },
    created() {
      eventBus.$on('total-funds', (funds) => {
        this.funds = funds;
      });
      eventBus.$on('funds-in-total', (sellFunds) => {
        this.funds = sellFunds;
      });
    },
    methods: {
      endDay() {
        eventBus.$emit('endButton');
      },
      saveDay() {
        eventBus.$emit('save');
        localStorage.setItem('fund', this.funds);
      },
      loadDay() {
        eventBus.$emit('load');
        this.funds = JSON.parse(localStorage.getItem('fund'));
      }

    },

  }
</script>

<style>


</style>