import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index'
import UserLogin from './views/user/userLogin'
import UserRegister from './views/user/userRegister'
import Cart from './views/cart'
import List from './views/list'
import ProductClassify from './views/Product/ProductClassify'
import cymanage from './views/Product/ahhd'

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
      path: '/user/login',
      name: 'userLogin',
      component: UserLogin
    },
    {
      path: '/user/register',
      name: 'userRegister',
      component: UserRegister
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
          path: '/Product/ProductClassify',
          name: 'ProductClassify',
          component: ProductClassify
      }
      ,{
          path: '/Product/cy',
          name: 'cymanage',
          component: cymanage

      }

      


  ],
  mode: "history"
})
