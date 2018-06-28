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
        <router-view id="f" @click='fade'></router-view>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import Bus from "./../assets/js/bus";
    // import {saveSearch}  from "../assets/js/cache"
    // import storage from 'good-storage'
    import MyFooter from "../components/footer"
    import Search from "./home/search/search"
    // 1. 定义（路由）组件。
    const Index = { template: '#index' };
    export default {
        name: "index",
        data(){
            return{
                message:""
                // search:'',
                // isFocus:true,
                // searches_list:[], //历史搜索记录列表
                // historyxs:false
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
            },
            fade:function(){
                $('#f').addClass('animated  rotateIn')
            },
        //     //输入框获取焦点
        //     initPage(){
        //         this.isFocus = false;
        //         this.$emit('initSearchPage');
        //         //为避免重复先清空再添加
        //         this.searches_list = [];
        //         let searches=storage.get('_search_');
        //         this.searches_list = searches?searches:[];
        //         if (this.searches_list.length > 0 ) {
        //
        //             this.historyxs=true;
        //         }else{
        //             this.historyxs=false;
        //
        //         }
        //
        //     },
        //     //点击搜索
        //     iptShearch(){
        //         this.isFocus = true;
        //
        //         if(this.search!=''){ //搜索框不为空
        //
        //             saveSearch(this.search); // 本地存储搜索的内容
        //
        //             let params = {
        //                 majorInfo : this.search //零件号或零件名（中英文）或零件类型名称或责任人名称
        //             }
        //             this.$emit('handleSearch' , params)
        //
        //             this.isFocus = true;
        //             this.search='';
        //         }
        //
        //
        //     },
        //     //高级搜索按钮
        //     toggleDrawer() {
        //         this.$emit('initSearchPage')
        //         this.$emit('listenSlide')
        //     },
        //     //清空历史记录
        //     clearhis(){
        //         storage.remove('_search_');
        //         this.searches_list = [];
        //         this.historyxs=false;
        //
        //     },
        //     //点击历史搜索把搜索的记录添加到good-storage中
        //     historysearch(item){
        //         saveSearch(item);
        //         this.search = item;
        //         this.iptShearch();
        //         this.historyxs = false;
        //     }
        }
    }

</script>

<style lang="less" scoped>
    .all{
        width: 100%;
        height: 2.41rem;
        z-index: 1;
        padding: 0;
        /*min-width: 300px;*/
        /*max-width: 640px;*/
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
    &.router-link-active{
         color: #e85281;
        border-bottom: 0.01rem solid #e85281;

     }
    }
    }
    }
    /////
    /*.top-box {*/
        /*height: 7%;*/
        /*position: fixed;*/
        /*top: 0;*/
        /*left: 0;*/
        /*width: 100%;*/
        /*z-index: 778;*/
        /*background: #f5f5f5;*/
    /*}*/
        /*.back-box{*/
            /*display: block;*/
            /*height: 100px;*/
            /*padding: 0 30px;*/
            /*line-height: 100px;*/
            /*position: absolute;*/
            /*left: -15px;*/
            /*top: -25px;*/
            /*>span{*/
                /*font-size:18px;*/
                /*color:gainsboro;*/
            /*}*/
        /*}*/
        /*.search-box{*/
            /*position: absolute;*/
            /*width:70%;*/
            /*top: 50%;*/
            /*left: 50%;*/
            /*z-index: 888;*/
            /*transform: translate(-50% , -50%);*/
            /*&.active{*/
                /*width:74%;*/
                /*left: 13%;*/
                /*transform: translate(0 , -50%);*/
            /*}*/
            /*height: 38px;*/
            /*font-size: 0;*/
            /*border:1px solid #fff;*/
            /*background-color: #fff;*/
            /*border-radius: 35px;*/
            /*display: flex;*/
            /*flex-direction: row;*/
            /*justify-content: flex-start;*/
            /*>input{*/
                /*display: inline-block;*/
                /*width: 90%;*/
                /*height: 100%;*/
                /*line-height: 38px;*/
                /*padding: 0;*/
                /*outline: none;*/
                /*border:0 none;*/
                /*font-size: 18px;*/
                /*color:#363636;*/
                /*background-color: transparent;*/
            /*}*/
            /*>span{*/
                /*margin: 0 10px 0 18px;*/
                /*display: inline-block;*/
                /*height: 100%;*/
                /*line-height: 64px;*/
                /*font-size: 36px;*/
                /*color:pink;*/
            /*}*/
        /*}*/
        /*.slidemenu-btn{*/
            /*position: absolute;*/
            /*right: 1%;*/
            /*top:50%;*/
            /*transform: translateY(-50%);*/
            /*z-index: 555;*/
            /*>span{*/
                /*color: red;*/
                /*font-size: 45px;*/
                /*&.text{*/
                    /*font-size: 18px;*/
                /*}*/
            /*}*/
        /*}*/
        /*.history-panel{*/
            /*position: absolute;*/
            /*top: 100px;*/
            /*left: 0;*/
            /*background-color: #fff;*/
            /*!*min-height: 1500px;*!*/
            /*width: 100%;*/
            /*overflow: hidden;*/
            /*.his_ulcon{*/
                /*margin-top: 15px;*/
                /*box-sizing: border-box;*/
                /*padding: 0 33px;*/
                /*display: flex;*/
                /*flex-direction: row;*/
                /*justify-content: flex-start;*/
                /*flex-wrap: wrap;*/
                /*>li{*/
                    /*padding: 0px 3px;*/
                    /*border: 1px solid #f5f5f5;*/
                    /*background: #f5f5f5;*/
                    /*border-radius: 10px;*/
                    /*margin-right: 6px;*/
                    /*margin-bottom: 10px;*/
                    /*font-size: 14px;*/
                    /*color: black;*/
                /*}*/
            /*}*/
            /*h4{*/
                /*box-sizing: border-box;*/
                /*padding: 30px;*/
                /*line-height: 80px;*/
                /*height: 80px;*/
                /*font-size: 25px;*/
            /*}*/
            /*>p{*/
                /*margin: 30px 0;*/
                /*text-align: center;*/
                /*line-height: 80px;*/
                /*height: 80px;*/
                /*font-size: 25px;*/
            /*}*/
        /*}*/
</style>