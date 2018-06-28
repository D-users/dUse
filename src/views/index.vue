<template id="index">
    <div>
        <div class="all">
            <a href="/search">
                <img src="./../assets/images/download-66.jpg" alt="" width="100%">
            </a>
            <div class="tab">
                <div class="tab-item">
                    <router-link  to="/">首页</router-link>
                </div>
                <div class="tab-item">
                    <router-link  to="/index/flash">限时抢购</router-link>
                </div>
                <div class="tab-item">
                    <router-link  to="/index/beauty">美妆</router-link>
                </div>
                <div class="tab-item">
                    <router-link  to="/index/clothes">服饰</router-link>
                </div>
                <div class="tab-item">
                    <router-link  to="/index/daily">日用</router-link>
                </div>
                <div class="tab-item">
                    <router-link to="/index/cleaning">洗护</router-link>
                </div>
            </div>
        </div>
        <router-view id="f"></router-view>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import Bus from "./../assets/js/bus";
    import MyFooter from "../components/footer"
    import Search from "./home/search/search"
    const Index = { template: '#index' };
    export default {
        name: "index",
        data(){
            return{
                message:""
            }
        },
        components:{
            Search,
            MyFooter
        },
        methods:{
            show(){
                this.isShow=false;
                Bus.$emit("show",false);
            }
        }
    }

</script>

<style lang="less" scoped>
    .all{
        width: 100%;
        height: 2.41rem;
        z-index: 1;
        padding: 0;
        margin: 0 auto;
        position: fixed;
        left: 0;
        top: 0;
        transition: all 0.5s ;
    }
    .tab{
        display: flex;
        position: relative;
        .tab-item{
            flex:1;
            a{
                display: block;
                text-align: center;
                line-height: 1.173rem;
                font-size: 0.373rem;
                color: rgb(77,85,93);
                text-decoration: none;
                &.router-link-exact-active{
                    color: #e85281;
                    border-bottom: 0.01rem solid #e85281;
                }
            }
        }
    }
</style>