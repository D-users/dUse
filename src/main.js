import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import qs from "qs"

Vue.prototype.$http = axios;
Vue.prototype.$api = "/api";//生产环境打包时, 将其替换为http://localhost:8888/data
Vue.prototype.$qs = qs;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
