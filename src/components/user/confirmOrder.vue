<template>
    <div class="order-wrap">
        <div class="cart-title">
            <img @click="$router.go(-1)" src="../../assets/img/go.png" alt="">
            <h1>确认订单</h1>
        </div>
        <div class="delivery-word">
            <p>配送上门：<span>配送上门</span></p>
        </div>
        <div class="address">
            <div class="address-title">
                <p><span></span>收货地址</p>
                <a href="/user/address">添加地址</a>
            </div>
            <div class="address-tips">{{this.addressInfo}}</div>
        </div>
        <div class="order-con">
            <div class="order-goods" v-for="item in orderList">
                <img :src="item.titleImg[0].url" alt="">
                <p class="goods-name">{{item.title}}</p>
                <p class="goods-type">
                    类型: <span>{{item.style[0].type}}</span>
                </p>
                <p class="pri-info">
                    单价: <span class="now-price">{{item.style[0].pirce}}</span>
                    <del class="old-price">￥{{item.style[0].countersPirce}}</del>
                    <span>X <em>{{item.goodsCount}}</em></span>
                </p>
            </div>
            <div class="delivery-type">
                <p>配送方式</p>
                <p>快递：￥<span>0.00</span></p>
            </div>
            <span class="lines"></span>
            <div class="leave-word">
                <span></span>
                <input type="text" placeholder="留言" class="leave-inp">
            </div>
        </div>
        <div class="discounts">
            <div class="ticket">
                <p>优惠券</p>
                <p>不使用优惠券 <span></span></p>
            </div>
            <div class="reduce">
                <p>积分抵扣</p>
                <p>剩余积分 <span style="color: red;">{{score}}</span></p>
            </div>
        </div>
        <span class="line"></span>
        <div class="pays">
            <p>共<span>{{totalCount}}</span>件商品</p>
            <p>总计: <span>￥{{totalPrice}}</span>元</p>
            <button class="wx" @click="showAlert">积分支付</button>
            <button class="yu-btn" @touchstart="pay">余额支付</button>
            <p class="yu">可用余额：<span>￥{{money}}</span></p>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "confirm-order",
        data() {
            return {
                orderList: [],
                addressInfo:'',
                money: "",
                score: "",
                addressId: ""
            }
        },
        computed: {
            ...mapState(['cart']),
            ...mapState(['userId']),
            totalCount() {
                var allCount=0;
                for(var i=0;i<this.orderList.length;i++){
                    allCount += this.orderList[i].goodsCount;
                }
                return allCount;
            },
            totalPrice() {
                var allPrice = 0;
                for(var i=0;i<this.orderList.length;i++){
                    allPrice += (this.orderList[i].style[0].pirce * this.orderList[i].goodsCount);
                }
                return allPrice;
            }
        },
        created() {
            this.orderList = JSON.parse(this.cart);
            let formData = this.$qs.stringify({
                userId: this.userId
            });

            this.$http.post("/api/user/address", formData, {header: {contentType: 'application/json'}}).then(({data}) => {
                var addArr = data.data.address;
                for(var i=0;i<addArr.length;i++) {
                    if(addArr[i].default) {
                        this.addressInfo = addArr[i].province + addArr[i].city + addArr[i].area;
                        this.addressId = addArr[i].addressId;
                    }
                }
            }).catch((err) => {
                console.error(err);
            });

            this.$http.post("/api/user/money",formData).then(({data}) => {
                 if(data.status){
                     this.money = data.data.rmb;
                 }
            });

            this.$http.post("/api/user/han",formData).then(({data}) => {
                if(data.status){
                    this.score = data.data.han;
                }
            });
        },
        methods: {
            showAlert(){
                alert("暂无该功能!")
            },
            pay() {
                var sell = confirm("确认支付？");
                if(sell) {
                    if(this.totalPrice <= this.money){
                        let formData = this.$qs.stringify({
                            userId: this.userId,
                            count: this.totalPrice
                        });
                        this.$http.post("/api/user/moneyPay",formData).then(({data}) => {
                            if(data.status){
                                let arr = [];
                                for(let i=0;i<this.orderList.length;i++){
                                    arr.push({classId: this.orderList[i].classId, count: this.orderList[i].goodsCount})
                                }
                                let fData = this.$qs.stringify({
                                    userId: this.userId,
                                    state: 1,
                                    Detail: JSON.stringify(arr),
                                    totalMoney: this.totalPrice,
                                    orderAddressId: this.addressId
                                })
                                this.$http.post("/api/user/orderChange",fData).then(({data}) => {
                                    if(data.status){
                                        alert("订单生成成功!");
                                        window.location.replace("/user/orderList")
                                    }else{
                                        alert("失败")
                                    }
                                });
                            }
                        });
                    }else{
                        let fData = this.$qs.stringify({
                            userId: this.userId,
                            state: 0
                        })
                        this.$http.post("/api/orderChange",fData).then(({data}) => {
                            if(data.status){
                                alert("余额不足!");
                                window.location.replace("/user/orderList")
                            }
                        });
                    }
                }else {
                    return false;
                }
            }
        }
    }
</script>

<style scoped lang="less">
    a {
        text-decoration: none;
    }

    .order-wrap {
        background-color: #f2f2f2;
        color: rgb(116, 119, 116);
    }

    .cart-title {
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

    .delivery-word {
        font-size: 0.32rem;
        background-color: white;
        line-height: 1.006rem;
        border-bottom: 1px solid #e5e5e5;
        letter-spacing: 1px;
        span {
            color: #e85281;
            font-size: 0.346rem;
            padding-bottom: 0.213rem;
            border-bottom: 0.053rem solid #f89;
            padding-left: 0.133rem;
            padding-right: 0.133rem;
        }
    }

    .address {
        background-color: white;
        margin-top: 0.2667rem;
        padding-bottom: 0.266rem;
        border-bottom: 1px solid #e5e5e5;
        .address-title {
            display: flex;
            justify-content: space-between;
            font-size: 0.3466rem;
            padding: 0.266rem 0;
            p {
                margin-left: 0.4rem;
            }
            a {
                margin-right: 0.266rem;
                color: #e85281;
            }
        }
        .address-tips {
            border: 1px solid #e5e5e5;
            margin: 0 auto;
            width: 80%;
            text-align: center;
            padding: 0.8rem 0.667rem;
        }
    }

    .order-con {
        background-color: white;
        margin-top: 0.266rem;
        overflow: hidden;
        border-bottom: 1px solid #e5e5e5;
        .order-goods {
            border-bottom: 1px solid #e5e5e5;
            margin-bottom: 10px;
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
                margin-bottom: 0.533rem;
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
        .lines {
            border: 1px solid #e5e5e5;
            width: 93%;
            display: block;
            margin: 0.133rem auto;
        }
        .delivery-type {
            display: flex;
            justify-content: space-between;
            line-height: 0.533rem;
            p:nth-child(1) {
                margin-left: 0.32rem;
            }
            p:nth-child(2) {
                margin-right: 0.32rem;
            }
        }
        .leave-word {
            display: flex;
            input::-webkit-input-placeholder {
                color: lightgray;
            }
            .leave-inp {
                margin-left: 0.533rem;
                width: 100%;
                line-height: 0.8rem;
            }
        }
    }

    .discounts {
        margin-top: 0.2667rem;
        border-top: 1px solid #e5e5e5;
        background-color: white;
        .ticket {
            display: flex;
            border-bottom: 1px solid #e5e5e5;
            justify-content: space-between;
            line-height: 0.8rem;
            p:nth-child(1) {
                margin-left: 0.32rem;
                font-size: 0.346rem;
            }
            p:nth-child(2) {
                margin-right: 0.667rem;
                color: grey;
                font-size: 0.32rem;
            }
        }
        .reduce {
            display: flex;
            justify-content: space-between;
            line-height: 0.8rem;
            border-bottom: 1px solid #e5e5e5;
            p:nth-child(1) {
                margin-left: 0.32rem;
                font-size: 0.346rem;
            }
            p:nth-child(2) {
                margin-right: 0.667rem;
                color: grey;
                font-size: 0.32rem;
            }
        }
    }

    .line {
        margin: 0.2667rem 0;
        border: 1px solid #e5e5e5;
        display: block;
    }

    .pays {
        background-color: white;
        text-align: center;
        color: black;
        overflow: hidden;
        letter-spacing: 1px;
        p:nth-child(1) {
            margin: 0.4rem 0 0.266rem;
        }
        p:nth-child(2) {
            span {
                color: #e85281;
            }
            margin: 0.266rem 0;
        }
        .wx {
            display: block;
            background-color: seagreen;
            color: white;
            padding: 0.266rem 4rem;
            margin: 0 auto;
            border-radius: 0.133rem;
            letter-spacing: 1px;
        }
        .yu-btn {
            display: block;
            background-color: red;
            color: white;
            padding: 0.266rem 4rem;
            margin: 0.266rem auto;
            border-radius: 0.133rem;
            letter-spacing: 1px;
        }
        .yu {
            color: rgb(116, 116, 116);
        }
    }
</style>