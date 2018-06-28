<template>
  <div id="app">
    <router-view></router-view>
</div>
</template>

<script>
    import {mapMutations} from "vuex";
    export default {
        name: "app",
        computed: {
            ...mapMutations(['getStorage','addArr'])
        },
        created(){
            this.$store.commit('getStorage')
            this.$store.commit('addArr',[{name: 1, id: 2},{name: 1, id: 2}])
        }
    }
</script>

<style lang="less">

</style>
