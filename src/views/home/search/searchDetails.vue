<template>
    <div>
        <div class="navbar">
            <ul>
                <li><a href="">综合</a></li>
                <li><a href="">销量</a></li>
                <li><a href="">价格</a></li>
                <li><a href="">筛选</a></li>
            </ul>
        </div>
        <div class="wraper" @scroll="onScroll($event)">
            <div class="goods">
                <ul>
                    <li class="item" v-for="item in 10">
                        <a href="">
                            <div class="left"><img src="//img10.360buyimg.com/n2/s240x240_jfs/t22420/320/609612451/143731/4ead7dcf/5b1171b2N4f1a9ca0.jpg!q70.jpg" alt=""></div>
                            <div class="right">
                                <ul>
                                    <li class="name">小米（MI）空气净化器2S 除雾霾 除甲醛 空气质量屏幕显示 三层净化</li>
                                    <li class="prices"><em>￥<span>899</span>.00</em></li>
                                    <li class="assess">
                                        <span><span>9万</span>条评价</span>
                                        <span>好评率<span>99</span>%</span>
                                    </li>
                                </ul>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    // import InfiniteLoading from 'vue-infinite-loading';
    export default {
        name: "searchDetails",
        data () {
            return {
                items:[],
                pgSize:36,
                rawItems:[],
                pgNo:1
            }
        },

        ready () {
            for(var i=0;i<=1000;i++){
                this.rawItems.push(i)
            }
            this.changePgItems()
        },
        methods:{
            onScroll(event){
                var offsetHeight = event.currentTarget.offsetHeight,
                    scrollHeight = event.target.scrollHeight,
                    scrollTop = event.target.scrollTop,
                    scrollBottom = offsetHeight + scrollTop
                if(scrollTop===0)
                {
                    if(this.pgNo===1)
                    {
                        return
                    }
                    this.pgNo--
                    this.changePgItems()
                    event.target.scrollTop=offsetHeight-1
                }
                if(scrollBottom===scrollHeight || scrollBottom===scrollHeight+2)
                {
                    if(this.pgNo==Math.ceil(this.rawItems.length/this.pgSize))
                    {
                        return
                    }
                    this.pgNo++
                    this.changePgItems()
                    event.target.scrollTop=1
                }
            },
            changePgItems(){
                var start = (this.pgNo-1) * this.pgSize,
                    items = this.rawItems.slice(start,this.pgSize+((this.pgNo-1)*this.pgSize))
                this.items = items
            }
        }
    }
</script>

<style lang="less" scoped>
    a {
        text-decoration: none;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
    .wraper{
        position: fixed;
        top:2.41rem;
        bottom: 1.227rem;
        width:100%;
        overflow: scroll;
        border:1px solid gainsboro;
    }
    .navbar{
        min-height: 45px;
        font-size: 12px;
        overflow: auto;
        background-color: #fff;
        margin-top: 57px;
    }
    .navbar>ul{
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        position: relative;
        padding: 10px 5px 10px 15px;
        height: 45px;
        text-align: center;
    }
    .navbar>ul::before {
        content: "";
        position: absolute;
        pointer-events: none;
        background-color: #e5e5e5;
        height: 1px;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
    }
    .navbar>ul li{
        width: 25%;
        font-size: 12px;
        padding-right: 10px;

    }
    .navbar>ul li>a{
        display: block;
        position: relative;
        padding: 0 5px;
        height: 25px;
        line-height: 25px;
        color: #666;
        background-color: #f2f2f7;
        border-radius: 2px;
    }
    .navbar>ul li>a:hover{
        color: red;
    }
    .goods>ul{
        display: block;
        position: relative;
        padding: 3px 0 2px;
        background-color: #fff;
    }
    .goods>ul li.item{
        display: flex;
        border: 1px solid gainsboro;
    }
    .left{
        width: 120px;
        height: 120px;
        overflow: hidden;
    }
    .left>img{
        width: 100%;
    }
    .right{
        min-height: 120px;
        padding-bottom: 8px;
        box-sizing: border-box;
        padding: 0 10px;
        overflow: hidden;
        line-height: 1;
        background: rgba(255,255,255,0);
        margin-left: 150px;
        margin-top: -108px;
    }
    .right .name{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        height: 38px;
        word-break: break-all;
        margin-top: 8px;
        color: #333;
        line-height: 1.36;
    }
    .right .prices{
        margin-top: 13px;
        display: inline-block;
        height: 18px;
        color: #e93b3d;
        min-width: 40px;
    }
    .right .prices>em>span{
        font-weight: 400;
        font-size: 15px;
    }
    .right .assess{
        margin-top: 8px;
    }
</style>