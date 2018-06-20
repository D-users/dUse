import Vue from 'vue'
import Vuex from 'vuex'
const key = 'user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      user: ""
  },
  getters: {

  },
  mutations: {
      getStorage: function (state) {
          if(!state.user){
              state.user = JSON.parse(localStorage.getItem(key))
          }
          return state.user
      },
      setStorage(state,val){
          state.user = val;
          localStorage.setItem(key,JSON.stringify(val));
      },
      removeStorage(state){
          state.user = "";
          localStorage.removeItem(key);
      }
  },
  actions: {

  }
})
