import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index'
import Cart from './views/cart'
import List from './views/list'
import ProductClassify from './views/Product/ProductClassify'
import cymanage from './views/Product/ahhd'

//用户模块路由
import User from './views/user'
import UserIndex from './views/user/userIndex'
import UserLogin from './views/user/userLogin'
import UserRegister from './views/user/userRegister'

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
      component: User,
      children: [
          {path:"/user/login",component:UserLogin},
          {path:"/user/register",component:UserRegister},
          {path:"/user",component:UserIndex}
      ]
    },
    // {
    //   path: '/user/login',
    //   name: 'userLogin',
    //   component:
    // },
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
