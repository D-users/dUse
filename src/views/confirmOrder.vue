<template>
    <div class="order-wrap">
        <div class="cart-title">
            <img src="../assets/img/go.png" alt="">
            <h1>确认订单</h1>
        </div>
        <div class="delivery-word">
            <p>配送上门：<span>配送上门</span></p>
        </div>
        <div class="address">
            <div class="address-title">
                <p><span></span>收货地址</p>
                <a href="###">添加地址</a>
            </div>
            <div class="address-tips">您还没有添加收货地址信息哟！</div>
        </div>
        <div class="order-con">
            <div class="order-goods">
                <img src="http://7xlbbv.com2.z0.glb.qiniucdn.com/6c357023d08641cd9a65e2e612c1fe92.jpg?imageView2/1/w/95/h/95/q/30" alt="">
                <p class="goods-name">抗菌防臭袜网眼运动女袜棉袜中筒袜子女跑步袜 1双妆</p>
                <p class="goods-type">
                    规格: <span>均码</span>
                    颜色：<span>粉红</span>
                </p>
                <p class="pri-info">
                    单价: <span class="now-price">￥24.00</span> <del class="old-price">￥29.00</del>
                    <span>X <em>8</em></span>
                </p>
            </div>
            <span class="lines"></span>
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
                <p>韩豆抵扣</p>
                <p>请选择韩豆方式 <span></span></p>
            </div>
        </div>
        <span class="line"></span>
        <div class="pays">
            <p>共<span>9</span>件商品</p>
            <p>总计: <span>￥216.00</span></p>
            <button class="wx">微信支付</button>
            <button class="yu-btn">余额支付</button>
            <p class="yu">可用余额：<span>￥0.00</span></p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "confirm-order"
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
            color:#e85281 ;
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
                color:lightgray;
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
            color: rgb(116,116,116);
        }
    }
</style>