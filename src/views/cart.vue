<template>
    <div class="cart-wrap">
        <div class="cart-title">
<<<<<<< HEAD
            <!--<img src="../assets/img/go.png" alt="">-->
=======
            <img src="../assets/img/go.png" alt="">
>>>>>>> 3a4ca11c2b3f1c681b9579719a65f4b2480d252b
            <h1>购物车</h1>
            <a href="javascript:void (0)" v-show="editShow" @click="edit">编辑</a>
            <a href="javascript:void (0)" v-show="compShow" @click="complete">完成</a>
        </div>
        <div class="tips">
            <p>小主，您的购物车还是空的！</p>
            <p>去<span>首页</span>逛逛吧!</p>
        </div>

        <div style="margin:0.26667rem 0 1.3333rem">
            <div v-for="(good,index) in this.cartInfo">
                <div class="shop-list">
                    <ul>
                        <li>
                            <div class="goods-info">
                                <!--加on类名代表选中-->
                                <span class="item-check-btn" @touchstart="select(good)"
                                      :class="good.isShow?'on':''"></span>
                                <a href="###" class="goods-pic">
                                    <img :src="good.titleImg[0].url"
                                         alt="">
                                </a>
                                <p class="goods-name">{{good.title}}
                                    <img src="../assets/img/psale-icon.png" alt="">
                                </p>
                                <p class="goods-type">规格：30g</p>
                                <div class="num-controls">
                                    <a href="javascript:void (0)" class="num-less" @touchstart="good.goodsCount--"
                                       v-if="good.goodsCount!=1">-</a>
                                    <a href="javascript:void (0)" class="num-less" v-if="good.goodsCount==1">-</a>
                                    <input type="text" value="1" class="num" v-model="good.goodsCount">
                                    <a href="javascript:void (0)" class="num-add" @touchstart="good.goodsCount++">+</a>
                                </div>
                                <div class="pri-info">
                                    单价：<em>￥<span>{{good.style[0].pirce}}</span>
                                    <small> + <span>{{good.style[0].hanPirce}}</span>韩豆</small>
                                </em>
                                    <del>￥<span>{{good.style[0].countersPirce}}</span></del>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="cart-footer">
                    <!--加on类名代表选中-->
                    <a href="javascript:void(0)" @touchstart="allShow" :class="isAllShow?'all-btn on':'all-btn'">全选</a>
                    <p>合计(不含运费):<span>￥<b>{{price}}</b></span></p>
                    <a href="javascript:void(0)" class="res-btn">结算</a>
                </div>
                <div class="del-footer">
                    <a href="javascript:void(0)" @touchstart="allShow" :class="isAllShow?'all-btn on':'all-btn'">全选</a>
                    <a href="javascript:void(0)" class="del-btn" @touchstart="del(index)">删除</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "cart",
        data() {
            return {
                editShow: true,
                compShow: false,
                cartInfo: [],
                isAllShow: false,
                isDel: false,
                index: 0
            }
        },
        created() {
            let formData = this.$qs.stringify({
                userId: '5b2a5f5c9a29fa125c295b12'
            });
            this.$http.post("/api/get/cart", formData, {header: {contentType: 'application/json'}}).then(({data}) => {
                this.cartInfo = data.data;

                console.log(this.cartInfo);
            }).catch((err) => {
                console.error(err);
            })
        },
        methods: {
            edit() {
                this.editShow = false;
                this.compShow = true;
                $(".del-footer").css({
                    "bottom": 0,
                    "transition": "0.5s"
                });
                this.cartInfo.forEach((item) => {
                    if (item.isShow == undefined) {
                        this.$set(item, "isShow", false);
                    } else {
                        item.isShow = false;
                    }
                    this.isAllShow = false;
                })

            },
            complete() {
                this.editShow = true;
                this.compShow = false;
                $(".del-footer").css({
                    "bottom": "-1.333rem",
                    "transition": "0.5s"
                });
            },
            del(index) {
                this.index = index;
                this.isDel = !this.isDel;
                this.cartInfo.splice(this.index, 1);
            },
            select(item) {
                if (item.isShow == undefined) {
                    this.$set(item, "isShow", true);
                } else {
                    item.isShow = !item.isShow;
                }
                var num = 0;
                for (var i = 0; i < this.cartInfo.length; i++) {
                    if (this.cartInfo[i].isShow) {
                        num++;
                    }
                }
                if (num == this.cartInfo.length) {
                    this.isAllShow = true;
                } else {
                    this.isAllShow = false;
                }
            },
            allShow() {
                this.cartInfo.forEach((item) => {
                    if (item.isShow == undefined) {
                        this.$set(item, "isShow", true);
                    } else {
                        item.isShow = true;
                    }
                    this.isAllShow = true;
                })
                // this.isAllShow = !this.isAllShow;
            },
        },
        computed: {
            price() {
                var count = 0;
                for (var i = 0; i < this.cartInfo.length; i++) {
                    if (this.cartInfo[i].isShow == true) {
                        count += (this.cartInfo[i].style[0].pirce * this.cartInfo[i].goodsCount);
                    }
                }
                return count.toFixed(2);
            }
        }
    }
</script>

<style scoped lang="less">
    .cart-wrap {
        background-color: #f2f2f2;
    }

    a {
        text-decoration: none;
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
        a {
            position: absolute;
            right: 0.4rem;
            top: 0.32rem;
            display: block;
        }
        img {
            position: absolute;
            width: 0.266rem;
            top: 50%;
            margin-top: -0.213rem;
            left: 0.4rem;
        }
    }

    .tips {
        display: none;
        text-align: center;
        color: #999;
        font-size: 0.32rem;
        padding: 0.8rem;
        line-height: 0.533rem;
        span {
            color: #e85281;
            font-size: 0.4rem;
        }
    }

    .shop-list {
        background-color: white;
        width: 100%;
        li {
            padding: 0.4rem 0.266rem;
            border-bottom: 1px solid #e5e5e5;
            position: relative;
            color: rgb(116, 119, 116);
            .goods-info {
                .item-check-btn {
                    display: block;
                    height: 2.933rem;
                    background: url("../assets/img/c1.png") no-repeat;
                    background-position: center center;
                    width: 0.533rem;
                    background-size: 0.48rem auto;
                    float: left;
                    &.on {
                        background: url("../assets/img/cc2.png") no-repeat;
                        display: block;
                        height: 2.933rem;
                        background-position: center center;
                        width: 0.533rem;
                        background-size: 0.48rem auto;
                        float: left;
                    }
                }
                .goods-name {
                    height: 0.907rem;
                    font-size: 0.32rem;
                    img {
                        height: 0.427rem;
                        position: relative;
                        top: 1px;
                        width: auto;
                    }
                }
                .goods-type {
                    color: #999;
                    padding: 0 0.213rem 0.213rem 0;
                    font-size: 0.347rem;
                }
                .goods-pic {
                    width: 2.533rem;
                    height: 2.533rem;
                    border: 1px solid #e5e5e5;
                    margin: 0.186rem 0.213rem 0.186rem 0.133rem;
                    display: block;
                    float: left;
                    img {
                        width: 100%;
                    }
                }
                .num-controls {
                    border: 1px solid #e5e5e5;
                    width: 2.293rem;
                    border-radius: 0.133rem;
                    height: 0.666rem;
                    margin-left: 3.466rem;
                    margin-top: 0.053rem;
                    margin-bottom: 0.053rem;
                    .num-less {
                        font-size: 0.427rem;
                        text-align: center;
                        display: block;
                        width: 0.533rem;
                        height: 0.667rem;
                        float: left;
                        line-height: 0.667rem;
                    }
                    .num {
                        width: 1.066rem;
                        height: 0.613rem;
                        display: block;
                        float: left;
                        line-height: 0.667rem;
                        text-align: center;
                        border-left: 1px solid #e5e5e5;
                        border-right: 1px solid #e5e5e5;
                        border-top: none;
                        border-bottom: none;
                        font-size: 0.373rem;
                    }
                    .num-add {
                        font-size: 0.427rem;
                        text-align: center;
                        display: block;
                        width: 0.533rem;
                        height: 0.667rem;
                        float: left;
                        line-height: 0.667rem;
                    }
                }
                .pri-info {
                    margin: 0.213rem 0 0 3.466rem;
                    font-size: 0.346rem;
                    em {
                        font-size: 0.373rem;
                        color: #e85281;
                        margin-right: 0.32rem;
                        small {
                            font-size: 0.32rem;
                        }
                    }
                    del {
                        font-size: 0.346rem;
                    }
                }
            }
        }
    }

    .cart-footer {
        border-top: 1px solid #e5e5e5;
        background-color: white;
        width: 100%;
        bottom: 0;
        z-index: 10;
        position: fixed;
        display: flex;
        height: 1.333rem;
        justify-content: space-between;
        line-height: 1.333rem;
        .all-btn {
            background: url("../assets/img/c1.png") no-repeat;
            background-size: 0.48rem auto;
            background-position: 0.266rem center;
            width: 1.066rem;
            height: 1.333rem;
            padding-left: 0.933rem;
            font-size: 0.373rem;
            display: block;
            color: rgb(116, 119, 116);
            font-weight: 500;
            &.on {
                background: url("../assets/img/cc2.png") no-repeat;
                background-size: 0.48rem auto;
                background-position: 0.266rem center;
                width: 1.066rem;
                height: 1.333rem;
                padding-left: 0.933rem;
                font-size: 0.373rem;
                display: block;
                color: rgb(116, 119, 116);
                font-weight: 500;
            }
        }
        p {
            position: absolute;
            left: 2rem;
            font-size: 0.373rem;
            color: rgb(116, 119, 116);
            span {
                color: #e85281;
            }
        }
        .res-btn {
            width: 25%;
            display: block;
            background-color: #e85281;
            color: white;
            font-size: 0.373rem;
            text-align: center;
            position: relative;
        }
    }

    .del-footer {
        border-top: 1px solid #e5e5e5;
        background-color: white;
        width: 100%;
        bottom: -1.333rem;
        /*bottom: 0;*/
        z-index: 10;
        position: fixed;
        display: flex;
        height: 1.333rem;
        justify-content: space-between;
        line-height: 1.333rem;
        .all-btn {
            background: url("../assets/img/c1.png") no-repeat;
            background-size: 0.48rem auto;
            background-position: 0.266rem center;
            width: 1.066rem;
            height: 1.333rem;
            padding-left: 0.933rem;
            font-size: 0.373rem;
            display: block;
            color: rgb(116, 119, 116);
            font-weight: 500;
            &.on {
                background: url("../assets/img/cc2.png") no-repeat;
                background-size: 0.48rem auto;
                background-position: 0.266rem center;
                width: 1.066rem;
                height: 1.333rem;
                padding-left: 0.933rem;
                font-size: 0.373rem;
                display: block;
                color: rgb(116, 119, 116);
                font-weight: 500;
            }
        }
        .del-btn {
            display: block;
            width: 25%;
            height: 1.333rem;
            background-color: #4a9bd7;
            text-align: center;
            line-height: 1.333rem;
            font-size: 0.373rem;
            color: white;
        }
    }
</style>