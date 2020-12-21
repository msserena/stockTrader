import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueRouter from 'vue-router'

import  { routes } from  './routes'

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.config.productionTip = false;

export const eventBus = new Vue();

const router = new VueRouter({
  routes,
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
