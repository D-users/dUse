import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index'
import List from './views/list'
import Cart from './views/cart'
import User from './views/user'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index,
      alias: "/"
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
  ],
  mode: "history"
})
