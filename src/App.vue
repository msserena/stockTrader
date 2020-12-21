<template>
  <div class="container">
    <header-component></header-component>
    <home v-show="$route.name === 'home'"></home>
    <portofolio v-show="$route.name === 'portofolio'"></portofolio>
    <stocks v-show="$route.name === 'stocks'"></stocks>
  </div>
</template>

<script>
  import HeaderComponent from './components/Header.vue'
  import Home from './components/Home.vue'
  import Stocks from './components/Stocks.vue'
  import Portofolio from './components/Portofolio.vue'

  export default {
    name: 'App',
    components: {
      HeaderComponent,
      Home,
      Portofolio,
      Stocks
    },
  }
</script>

<style>

</style>
