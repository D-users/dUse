import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index'
import Cart from './views/cart'
import List from './views/list'
import ProductClassify from './views/Product/ProductClassify'
import manage from './views/manage'
import search from './views/home/search/search'
import Detail from './views/home/search/searchDetails'

//首页路由
import Home from './views/home/home'
import Flash from './views/home/flash'
import Clothes from './views/home/clothes'
import Daily from './views/home/daily'
import Cleaning from './views/home/cleaning'
import Beauty from './views/home/beauty'

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
import Fav from './components/user/favorites'
import SetNick from './components/user/setNickname'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index,
      alias: "/",
      children:[
        {path: '/index/home', name: 'home', component: Home},
        {path: '/index/flash', name: 'flash', component: Flash},
        {path: '/index/beauty', name: 'beauty', component: Beauty},
        {path: '/index/clothes', name: 'clothes', component: Clothes},
        {path: '/index/daily', name: 'daily', component: Daily},
        {path: '/index/cleaning', name: 'cleaning', component: Cleaning}
      ]
    },
    {
      path: '/addGoods',
      name: 'manage',
      component: manage,
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/search/detail/:key',
      name: 'detail',
      component: Detail
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
        {path:"getRecord/:type",name:"GetRecord",component:getRecord},
        {path:"favorites",name:"Fav",component:Fav},
        {path:"setNickname",component:SetNick}
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

      


  ],
  mode: "history"
})
