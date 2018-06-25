import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      username: "",
      nickname: "",
      phone: "",
      userId: "",
      addressId: ""
  },
  getters: {

  },
  mutations: {
      getStorage: function (state) {
          for(let i in state){
              if(!state[i]){
                  state[i] = localStorage.getItem(i)
              }
          }
          return state;
      },
      setStorage(state,obj){
          for(let i in obj){
              for(let key in state){
                  if(i == key){
                      state[key] = obj[i];
                      localStorage.setItem(i,state[key]);
                  }
              }

          }
      },
      removeAll(state){
          for(let i in state){
              state[i] = "";
              if(localStorage.getItem(i)){
                  localStorage.removeItem(i);
              }
          }
      },
      removeItem(state,obj){
          for(let i in obj){
              if(state[i]){
                  state[i] = "";
              }
              localStorage.removeItem(i);
          }
      }
  },
  actions: {

  }
})
