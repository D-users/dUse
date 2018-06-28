<template>
    <div>
        <div class="header-box">
            <p class="back-btn">取消</p>
            <div>
                <input type="text" v-model="key">
            </div>
            <p class="go-btn" @click="getDetail">搜索</p>
        </div>
        <div class="navbar">
            <ul>
                <li><a href="javascript: void(0)">综合</a></li>
                <li><a href="javascript: void(0)">销量</a></li>
                <li><a href="javascript: void(0)">价格</a></li>
                <li><a href="javascript: void(0)">筛选</a></li>
            </ul>
        </div>
        <div class="wraper" ref="wrap">
            <ul>
                <li class="item" v-for="item in dataList">
                    <a href="">
                        <div class="left"><img :src="item.titleImg[0].url" alt=""></div>
                        <div class="right">
                            <ul>
                                <li class="name">{{item.title}}</li>
                                <li class="prices"><em>￥<span>{{getPriceZ(item.style[0].countersPirce)}}</span>{{getPriceX(item.style[0].countersPirce)}}</em></li>
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
</template>

<script>
    import {mapState,mapMutations} from "vuex";
    import Bscroll from "better-scroll";
    export default {
        name: "searchDetails",
        data () {
            return {
                dataList:[],
                list: [],
                pgSize: 0,
                pgNo:0,
                key: null,
                his: null,
                priceOrder: false, //true价格顺序
                countOrder: false
            }
        },
        computed: {
            ...mapState(['keys']),
            ...mapMutations(['setKeys','setStorage'])
        },
        created () {
            this.his = this.keys.split(",");
            this.key = this.$route.params.key
            let formData = this.$qs.stringify({
                key: this.$route.params.key
            });
            this.$http({
                method: 'post',
                url: "/api/goods/find/x  ",
                data: formData
            }).then(({data})=>{
                if(data.status){
                    this.list = data.data;
                    this.dataList = data.data;
                }
            });
        },
        mounted() {
            this.menuScroll = new Bscroll(this.$refs.wrap,{
                click: true
            });
        },
        methods:{
            getDetail(){
                if(this.key){
                    this.$store.commit('setKeys',{
                        key: this.key
                    });
                    window.location.replace("/search/detail/"+this.key);
                }
            },
            getPriceZ(val){
                return Math.floor(val);
            },
            getPriceX(val){
                let i = (val-0)%1;
                if(i == 0){
                    return ".00";
                }else{
                    let j = Math.round(i*10);
                    return "."+j+"0";
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .header-box{
        height: 1.6rem;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.4rem;
        font-size: 0.4rem;
        .back-btn{
            color: gray;
            margin-right: 0.3rem;
        }
        div{
            flex: 1;
            input{
                width: 100%;
                height: 100%;
                border: 1px solid gray;
                font-size: 0.4rem;
                padding: 0.2rem 0.3rem;
                padding-left: 1rem;
                border-radius: 0.2rem;
                background: url("../../../assets/img/search/search.png") no-repeat;
                background-size: 0.7rem;
                background-position: 0.1rem 0.1rem;
            }
        }
        .go-btn{
            color: red;
            margin-left: 0.3rem;
        }
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
    .navbar{
        font-size: 0.32rem;
        overflow: auto;
        background-color: #fff;
        margin-top: 0.2rem;
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
    .wraper{
        position: absolute;
        top: 3.13333rem;
        left: 0;
        bottom: 0;
        width: 100%;
        background: rgb(240,240,240);
        overflow: hidden;
            li{
                display: flex;
                border: 1px solid gainsboro;
                background: white;
                .left{
                    width: 120px;
                    height: 120px;
                    overflow: hidden;
                    img{
                        width: 100%;
                    }
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
                    .name{
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
                    .prices{
                        margin-top: 13px;
                        display: inline-block;
                        height: 18px;
                        color: #e93b3d;
                        min-width: 40px;
                        span{
                            font-weight: 400;
                            font-size: 15px;
                        }
                    }
                    .assess{
                        margin-top: 8px;
                    }
                }
            }
    }
</style>