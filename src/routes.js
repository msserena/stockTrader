import  Home from './components/Home.vue'
// import  Portofolio from './components/Portofolio.vue'
// import  Stocks from './components/Stocks.vue'

const Portofolio  = resolve => {
  require.ensure(['./components/Portofolio.vue'], ()=> {
    resolve(require('./components/Portofolio.vue'));
  }, 'portofolio');
};

const Stocks  = resolve => {
  require.ensure(['./components/Stocks.vue'], ()=> {
    resolve(require('./components/Stocks.vue'));
  }, 'stocks');
};

export const  routes = [
  {path: '', name:'home', component: Home},
  {path: '/portofolio', name: 'portofolio', component: Portofolio},
  {path: '/stocks', name: 'stocks',  component: Stocks}

];

