<template>
    <div class="wrap">
        <div class="myOrder-title">
            <a href="javascript: void(0)" @click="$router.go(-1)"><img src="../../assets/img/go.png" alt=""></a>
            <h1>我的订单</h1>
        </div>
        <div class="tab">
            <span :class="getClass(-1)" @click="changeIndex(-1)">全部</span>
            <span :class="getClass(0)" @click="changeIndex(0)">待支付</span>
            <span :class="getClass(1)" @click="changeIndex(1)">待发货</span>
            <span :class="getClass(2)" @click="changeIndex(2)">待收货</span>
            <span :class="getClass(3)" @click="changeIndex(3)">待评价</span>
            <span :class="getClass(4)" @click="changeIndex(4)">退货</span>
        </div>
        <div class="lists" v-if="getList" ref="list">
            <ul>
                <li class="goods-item" v-for="item in getList">
                    <div class="goods-num">
                        <p>订单编号： <span>{{item.orderId}}</span></p>
                        <p>{{getText(item.state)}}</p>
                    </div>
                    <div class="order-goods">
                        <img :src="item.titleImg[0].url" alt="">
                        <p class="goods-name">{{item.title}}</p>
                        <p class="goods-type">
                            规格: <span>{{item.style[0].type}}</span>
                        </p>
                        <p class="pri-info">
                            单价: <span class="now-price">￥{{item.style[0].pirce}}</span> <del class="old-price">￥{{item.style[0].countersPirce}}</del>
                            <span>X <em>{{item.count}}</em></span>
                        </p>
                    </div>
                    <div class="sum">合计：￥<span>{{item.style[0].pirce*item.count}}</span></div>
                </li>
            </ul>
        </div>
        <div class="footer">没有更多数据了~~~</div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {mapState} from "vuex";
    export default {
        name: "orderList",
        data() {
            return {
                dataList:[],
                activeIndex: -1
            }
        },
        created() {
            let formData = this.$qs.stringify({
                userId: this.userId
            });
            this.$http.post("/api/get/order", formData, {header: {contentType: 'application/json'}}).then(({data}) => {
                if(data.status){
                    let arr = [];
                    for(let i=0;i<data.data.length;i++){
                        for(let j=0;j<data.data[i].Detail.length;j++){
                            var obj = data.data[i].Detail[j];
                            obj.state = data.data[i].state;
                            obj.orderId = data.data[i]._id;
                            arr.push(obj);
                        }
                    }
                    this.dataList = arr;
                }
            }).catch((err) => {
                console.error(err);
            })
        },
        mounted(){
            console.log($('.lists'));
            this.listScroll = new BScroll(this.$refs.list,{
                click:true
            })
        },
        computed: {
            ...mapState(['userId']),
            getList(){
                let arr = [];
                if(this.activeIndex == -1){
                    arr = this.dataList;
                }else if(this.activeIndex == 0){
                    for(let i=0; i<this.dataList.length;i++){
                        if(this.dataList[i].state == 0){
                            arr.push(this.dataList[i])
                        }
                    }
                }else if(this.activeIndex == 1){
                    for(let i=0; i<this.dataList.length;i++){
                        if(this.dataList[i].state == 1){
                            arr.push(this.dataList[i])
                        }
                    }
                }else if(this.activeIndex == 2){
                    for(let i=0; i<this.dataList.length;i++){
                        if(this.dataList[i].state == 2){
                            arr.push(this.dataList[i])
                        }
                    }
                }else if(this.activeIndex == 3){
                    for(let i=0; i<this.dataList.length;i++){
                        if(this.dataList[i].state == 3){
                            arr.push(this.dataList[i])
                        }
                    }
                }else{
                    for(let i=0; i<this.dataList.length;i++){
                        if(this.dataList[i].state == 4){
                            arr.push(this.dataList[i])
                        }
                    }
                }
                if(arr.length){
                    return arr;
                }else{
                    return null;
                }
            }
        },
        methods: {
            changeIndex(num){
                this.activeIndex = num;
            },
            getClass(num){
                if(num == this.activeIndex){
                    return "active";
                }else{
                    return "";
                }
            },
            getText(num){
                if(num == 0){
                    return "待支付";
                }else if(num == 1){
                    return "待发货";
                }else if(num == 2){
                    return "待收货";
                }else if(num == 3){
                    return "待评价";
                }else{
                    return "退货";
                }
            }
        }
    }

</script>

<style lang="less" scoped>
    .footer {
        background-color: white;
        text-align: center;
        padding: 0.5333rem 0;
        margin-top: 0.4rem;
        color: rgb(116,119,116);
    }
    .myOrder-title {
        font-size: 0.426rem;
        border-bottom: 1px solid #e5e5e5;
        position: relative;
        background-color: white;
        h1 {
            text-align: center;
            font-size: 100%;
            font-weight: 400;
            line-height: 1.006rem;
            color: rgb(116, 119, 116);
        }
        img {
            position: absolute;
            width: 0.266rem;
            top: 50%;
            margin-top: -0.213rem;
            left: 0.4rem;
        }
    }
    .tab {
        display: flex;
        justify-content: space-around;
        border-bottom: 1px solid #e5e5e5;
        line-height: 0.8rem;
        background-color: white;
        span {
            &.active {
                color: #e85281;
                padding: 0 7px;
                border-bottom: 2px solid #e85281;
            }
        }
    }
    .lists{
        position: absolute;
        top: 1.86667rem;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
        background-color: #f2f2f2;
        .goods-item {
            background-color: white;
            margin-top: 0.4rem;
            .goods-num {
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #e5e5e5;
                line-height: 0.8rem;
                color:rgb(116,119,116);
                p:nth-child(1) {
                    margin-left: 0.32rem;
                }
            }
            .order-goods {
                overflow: hidden;
                border-bottom: 1px solid #e5e5e5;
                img {
                    width: 2rem;
                    height: 2rem;
                    border: 1px solid #e5e5e5;
                    margin: 0.186rem 0.213rem 0.186rem 0.33rem;
                    display: block;
                    float: left;
                }
                .goods-name {
                    padding-top: 0.266rem;
                    width: 96%;
                    margin-bottom:0.533rem;
                }
                .goods-type {
                    margin-bottom: 0.1333rem;
                    color: grey;
                    letter-spacing: 0.0266rem;
                }
                .pri-info {
                    .now-price {
                        color: #e85281;
                        margin-right: 0.48rem;
                    }
                    .old-price {
                        margin-right: 2.8rem;
                    }
                }
            }
            .sum {
                text-align: right;
                line-height: 0.8rem;
                margin-right: 0.4rem;
            }
        }
    }
</style>