import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        username: "",
        nickname: "",
        userId: "",
        addressId: "",
        keys: "",
        arr: []
    },
    getters: {

    },
    mutations: {
        addArr(state,arr){
            for(let i=0;i<arr.length;i++){
                state.arr.push(arr[i]);
            }
        },
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
        setKeys(state,obj){
            if(state.keys){
                let flag = true;
                let arr = state.keys.split(",");
                for(let i=0; i<arr.length; i++){
                    if(arr[i] == obj.key){
                        flag = false
                    }
                }
                if(flag){
                    arr.push(obj.key)
                }
                state.keys = arr.join(",")
                localStorage.setItem('keys',state.keys);
            }else{
                state.keys = obj.key;
                localStorage.setItem('keys',state.keys);
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