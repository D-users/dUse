<template>
    <div>
        <div class="top-box">
            <div class="back-box"  @click="$router.back()">
                <span class="iconfont icon-back-m">
                    <a href="">取消</a>
                </span>
            </div>
            <div class="search-box" :class="isFocus?'':'active'">
                <span class="search-btn iconfont icon-sousuo">
                    <img src="./../../../assets/images/download-12.png" width="100%" alt="">
                </span>
                <input class="search-ipt" v-model.trim="search" @focus="initPage" type="text" placeholder="搜索你想要的商品"/>
            </div>
            <div class="slidemenu-btn" v-if="isFocus">
                <span class="iconfont icon-query1" @click="toggleDrawer"></span>
            </div>
            <div class="slidemenu-btn">
                <span class="text" @click="iptShearch">搜索</span>
            </div>
            <div class="history-panel" v-if="!isFocus">
                <h4 v-if="historyxs">搜索历史</h4>
                <ul class="his_ulcon" v-if="historyxs">
                    <li v-for="(item,index) in searches_list" :key="index" @click="historysearch(item)">{{item}}</li>
                </ul>
                <p v-if="historyxs" @click="clearhis()">清空历史记录</p>
            </div>
            <search-details v-show="isShow"></search-details>
        </div>
    </div>
</template>
<script>
import $ from "jquery"
import {saveSearch}  from "./../../../assets/js/cache"
import storage from 'good-storage'
import searchDetails from "./searchDetails"
export default {
    name: "search",
    data(){
        return{
        // message:"",
            isShow:false,
            search:'',
            isFocus:true,
            searches_list:[], //历史搜索记录列表
            historyxs:false
        }
    },
    components:{
        searchDetails,
    },
    methods:{
        //输入框获取焦点
        initPage(){
            this.isShow =false;
            this.isFocus = false;
            this.$emit('initSearchPage');
            //为避免重复先清空再添加
            this.searches_list = [];
            let searches=storage.get('_search_');
            this.searches_list = searches?searches:[];
            if (this.searches_list.length > 0 ) {
                this.historyxs=true;
            }else{
                this.historyxs=false;
            }
        },
        //点击搜索
        iptShearch(){
            this.isFocus = true;
            if(this.search!=''){ //搜索框不为空
                saveSearch(this.search); // 本地存储搜索的内容
                let params = {
                    majorInfo : this.search //零件号或零件名（中英文）或零件类型名称或责任人名称
                }
                this.$emit('handleSearch' , params)
                this.isFocus = true;
                // this.search='';
                this.isShow = true;

            }
        },
        //高级搜索按钮
        toggleDrawer() {
            this.$emit('initSearchPage')
            this.$emit('listenSlide')
        },
        //清空历史记录
        clearhis(){
            storage.remove('_search_');
            this.searches_list = [];
            this.historyxs=false;
        },
        //点击历史搜索把搜索的记录添加到good-storage中
        historysearch(item){
            saveSearch(item);
            this.search = item;
            this.iptShearch();
            this.historyxs = false;
        }
    }
}
</script>

<style lang="less" scoped>
/////
a {
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.iconfont>a:hover{
    color: red;
}
.top-box {
    height: 7%;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 778;
    background: #f5f5f5;
}
.back-box{
    display: block;
    height: 100px;
    padding: 0 30px;
    line-height: 100px;
    position: absolute;
    left: -15px;
    top: -23px;
>span{
        font-size:18px;
        color:gainsboro;
    }
}
.search-box{
    position: absolute;
    width:70%;
    top: 50%;
    left: 50%;
    z-index: 888;
    transform: translate(-50% , -50%);
&.active{
        width:74%;
        left: 13%;
        transform: translate(0 , -50%);
    }
    height: 38px;
    font-size: 0;
    border:1px solid #fff;
    background-color: #fff;
    border-radius: 35px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
>input{
        display: inline-block;
        width: 90%;
        height: 100%;
        line-height: 38px;
        padding: 0;
        outline: none;
        border:0 none;
        font-size: 18px;
        color:#363636;
        background-color: transparent;
    }
>span{
        margin: -13px 10px 0 3px;
        display: inline-block;
        height: 100%;
        line-height: 64px;
        font-size: 36px;
        color:pink;
    }
}
.slidemenu-btn{
    position: absolute;
    right: 3%;
    top:50%;
    transform: translateY(-50%);
    z-index: 555;
>span{
        color: red;
        font-size: 45px;
    &.text{
            font-size: 18px;
        }
    }
}
.history-panel{
    position: absolute;
    top: 100px;
    left: 0;
    background-color: #fff;
    /*min-height: 1500px;*/
    width: 100%;
    overflow: hidden;
.his_ulcon{
        margin-top: 15px;
        box-sizing: border-box;
        padding: 0 33px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
    >li{
            padding: 0px 3px;
            border: 1px solid #f5f5f5;
            background: #f5f5f5;
            border-radius: 10px;
            margin-right: 6px;
            margin-bottom: 10px;
            font-size: 14px;
            color: black;
        }
    }
    h4{
        box-sizing: border-box;
        padding: 30px;
        line-height: 80px;
        height: 80px;
        font-size: 25px;
    }
>p{
        margin: 30px 0;
        text-align: center;
        line-height: 80px;
        height: 80px;
        font-size: 25px;
    }
}
</style>