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
            ...mapMutations(['getStorage'])
        },
        created(){
            this.$store.commit('getStorage')
        }
    }
</script>

<style lang="less">

</style>
