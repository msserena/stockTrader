<template>
  <div>
    <br>
    <div class="card">
      <div class="card-body">
        <h3>Trader or View your Portofolio </h3>
        <p>You may Save & Load your Data
          <br>Click on 'End Day' to begin a 'New Day'</p>
        <hr>
        <h6> Your Funds: {{ funds.toLocaleString() }} $ </h6>
      </div>
    </div>
  </div>
</template>
<script>
  import {eventBus} from '../main';

  export default {
    name: 'Home',
    data() {
      return {
        funds: 10000,
      }
    },
    created() {
      eventBus.$on('total-funds', (yourFunds) => {
        this.funds = yourFunds;
      });
      eventBus.$on('funds-in-total', (sellFunds) => {
        this.funds = sellFunds;
      })
    },
  }
</script>
<style>

</style>