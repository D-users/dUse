import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index'
import User from './views/user'
import Cart from './views/cart'
import List from './views/list'

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
      path: '/user',
      name: 'user',
      component: User
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
    }
  ],
  mode: "history"
})
