<template>
<<<<<<< HEAD
  <div id="app">
    <router-view></router-view>
</div>
=======
    <div id="app">
        <router-view></router-view>
    </div>
>>>>>>> 3a4ca11c2b3f1c681b9579719a65f4b2480d252b
</template>

<script>
    import {mapMutations} from "vuex";
    export default {
        name: "app",
        computed: {
            ...mapMutations(['getStorage'])
        },
        created(){
            this.$store.commit('getStorage')
        }
    }
</script>

<style lang="less">

<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 3a4ca11c2b3f1c681b9579719a65f4b2480d252b
