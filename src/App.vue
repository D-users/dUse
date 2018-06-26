<template>
  <div id="app"><!--v-cloak-->
    <bottom-navigate v-show="isShow"></bottom-navigate>
  <router-view></router-view>
</div>
</template>

<script>
<<<<<<< HEAD
    import {mapMutations} from "vuex";
    export default {
        name: "app",
        computed: {
            ...mapMutations(['getStorage'])
        },
        created(){
            this.$store.commit('getStorage')
=======
    import bottomNavigate from "./views/home/bottomNavigate"
    import Bus from "./assets/js/bus"
    import Seo from "./assets/js/cache"

    export default {
        name:"app",
        data() {
            return {
                isShow:true,
            }
        },
        components:{
            bottomNavigate,
        },
        mounted(){
            Bus.$on('show', function(msg){
            //msg就是通过事件 传递来的数据
                console.log("自定义的事件触发，接收到的数据"+msg);
                // this.isShow=msg;
                // this.$set(this.isShow,msg);
                // alert(isShow);
            })
>>>>>>> pengliu
        }
    }
</script>

<style lang="less">
  /*!*去{{}}的闪烁*!*/
  /*[v-cloak] {*/
    /*display: none;!important;*/
  /*}*/
  .app{

  }
</style>
