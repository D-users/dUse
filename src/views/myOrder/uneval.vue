<template>
    <div class="wrap">
        <div class="myOrder-title">
            <img src="../../assets/img/go.png" alt="">
            <h1>我的订单</h1>
        </div>
        <div class="tab">
            <span>全部</span>
            <span>待支付</span>
            <span>待发货</span>
            <span>待收货</span>
            <span class="active">待评价</span>
            <span>退货</span>
        </div>
        <div class="goods-item">
            <div class="goods-num">
                <p>订单编号： <span>1823153132dsa12</span></p>
                <p>待支付</p>
            </div>
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
            <div class="sum">合计：￥<span>224.00</span>(含运费￥<span>8.00</span>)</div>
        </div>
        <div class="footer">没有更多数据了~~~</div>
    </div>
</template>

<script>
    export default {
        name: "uneval",
    }

</script>

<style lang="less" scoped>
    .wrap {
        background-color: #f2f2f2;
        height: 18.293rem;
    }
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
</style>