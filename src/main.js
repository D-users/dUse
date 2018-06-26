import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from "jquery"
import axios from "axios"
// import 'lib-flexible/flexible'
import wcSwiper from './views/home/wc-swiper';
Vue.use(wcSwiper);
Vue.prototype.$http = axios;
Vue.prototype.$api = "/api";//生产环境打包时，将其替换为http://localhost:8888/data
Vue.config.productionTip = false
import animate from "animate.css"
Vue.use(animate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
