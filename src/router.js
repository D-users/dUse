import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index'
import Cart from './views/cart'
import List from './views/list'
import ProductClassify from './views/Product/ProductClassify'
import cymanage from './views/Product/ahhd'

//用户模块路由
import User from './views/user'
import UserIndex from './components/user/userIndex'
import UserLogin from './components/user/userLogin'
import UserRegister from './components/user/userRegister'
import UserMsg from './components/user/userMsg'
import Recharge from './components/user/recharge'
import Withdrawal from './components/user/withdrawal'
import Balance from './components/user/balance'
import BindCard from './components/user/bindCard'
import Integral from './components/user/showIntegral'
import Address from './components/user/address'
import NewAddress from './components/user/addAddress'
import getRecord from './components/user/getRecord'

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
          {path:"login",component:UserLogin},
          {path:"register",component:UserRegister},
          {path:"/",component:UserIndex},
          {path:"personalMsg",component:UserMsg},
          {path:"recharge",component:Recharge},
          {path:"withdrawal",component:Withdrawal},
          {path:"balance",component:Balance},
          {path:"bindCard",component:BindCard},
          {path:"Integral",component:Integral},
          {path:"address",component:Address},
          {path:"newAddress/:id",name:"EditAddr",component:NewAddress},
          {path:"getRecord/:type",name:"GetRecord",component:getRecord}
      ]
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
