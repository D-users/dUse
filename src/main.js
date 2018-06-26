import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from "axios"
import qs from "qs"
import $ from "jquery";
import animate from "animate.css"
import wcSwiper from './views/home/wc-swiper';

Vue.prototype.$http = axios;
Vue.prototype.$api = "/api";
Vue.prototype.$qs = qs;
Vue.config.productionTip = false;

Vue.use(animate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
