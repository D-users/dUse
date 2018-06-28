<template>
    <div class="wrap">
        <a href="###" class="back"><img src="../assets/img/back.png" alt=""></a>
        <div class="slide-wrap">
            <wc-swiper class="swiper" v-if="imgList.length" :defaultSlide="0" :interval="2000" :pagination="true">
                <wc-slide v-for="(v, k) in imgList" :key="k" :class="map[k]">
                    <img :src="v.url" alt="">
                </wc-slide>
            </wc-swiper>
        </div>
        <div class="sp-info">
            <h1><p>{{goodInfo.title}}</p> <img src="../assets/img/psale-icon.png" alt=""></h1>
            <div class="price-info">
                <p><span class="unit-price">{{this.priceInfo.pirce}}</span> <span class="unit-point">+20.00韩豆</span></p>
                <span class="collect" @touchstart="collect">{{this.collectInfo}}</span>
            </div>
            <div class="other-info">
                <p>库存：<span>{{this.priceInfo.count}}</span></p>
                <p>专柜价：<del>￥<span>{{this.priceInfo.countersPirce}}</span></del></p>
                <p>已售：<span>{{this.goodInfo.sold}}</span>件</p>
            </div>
        </div>
        <div class="sp-ensure">
            <p><span>温馨提示</span>当您遇到喜欢的商品，却韩豆不足时，可以用纯现金支付喔!</p>
            <p>
                <a href="###">100%正品</a>
                <a href="###">速度保障</a>
                <a href="###">售后保障</a>
            </p>
        </div>
        <p class="connect-line"></p>
        <div class="choose-type">
            <div class="choose-main">
                <div class="choose-box">
                    <p class="choose-title">分类选择</p>
                    <div class="sp-type">
                        <img :src="this.goodPic.url" alt="">
                        <div class="sp-des">
                            <p>吹风机:</p>
                            <p class="sp-kind" v-for="(kind,index) in goodInfo.style">
                                <span @click="select(index)">{{kind.type}}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="num-controls">
                    <p class="num-title">数量</p>
                    <div class="nc-main">
                        <a href="javascript:void(0)" @touchstart="less" class="num-less">-</a>
                        <input type="text" value="1" class="num" v-model="this.quantity">
                        <a href="javascript:void(0)" @touchstart="quantity++" class="num-add">+</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="details">
            <p class="connect-line"></p>
            <a href="javascript:void(0)" class="eval-link">
                <p class="fl">商品评价(<span>{{comLength}}</span>)</p>
                <img src="../assets/img/right.png" alt="">
                <p class="all-eval">全部评价</p>
            </a>
            <div class="text-box" v-for="(pj,index) in goodInfo.comments">
                <div class="text">
                    <p class="text-name">{{pj.name}}</p>
                    <p class="text-word">{{pj.con}}</p>
                    <p class="date">{{pj.timer}}</p>
                </div>
            </div>
        </div>
        <div class="detail-box">
            <h4 class="detail-tit">商品详情</h4>
            <p v-for="(pics,index) in goodInfo.detailImg">
                <img :src="pics.url" alt="">
                <!--<img v-lazy="imgList" alt="">-->
            </p>
        </div>
        <div class="sp-footer">
            <a href="javascript:void (0)" @click="kfShow=true" class="kf">客服</a>
            <a href="###" class="shopcart">
                <b class="shopnum" v-if="isClick">{{this.quantity}}</b>
                购物车
            </a>
            <a href="javascript:void (0)" class="buy">立即购买</a>
            <a href="javascript:void (0)" @touchstart="isClick=true" class="add-shopcart">加入购物车</a>
        </div>
        <div class="kf_box" v-show="kfShow">
            <div class="kf_bg"></div>
            <div class="kf_cont">
                <h4>客服热线</h4>
                <h2>
                    <a href="###">0755-86717931</a>
                </h2>
                <p>周一至周六：9:00-17:30</p>
                <h3>
                    <a href="###" @touchstart="kfShow=false">取消</a>
                    <a href="###" class="on">拨打</a>
                </h3>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "goods-detail",
        data() {
            return {
                kfShow:false,
                goodInfo:[],
                list:[],
                comLength:'',
                index:0,
                quantity:1,
                isClick:false,
                isCollect:false,
                collectInfo:'收藏',
                map:{
                    0: 'slide a',
                    1: 'slide b',
                    2: 'slide c',
                    3: 'slide d',
                },
                currentSlide:100,
                imgList: [],
                priceInfo:{
                    count:'88',
                    countersPirce:'1040',
                    hanPirce:'260',
                    pirce:'520'
                },
                goodPic:{
                    url:"https://img.alicdn.com/imgextra/i1/929347050/TB2laJbkjihSKJjy0FlXXadEXXa_!!929347050.jpg_430x430q90.jpg",
                }
            }
        },
        created() {

            let formData = this.$qs.stringify({
                key: 3012
            });
            this.$http.post("/api/goods/find/classId",formData,{header: {contentType: 'application/json'}}).then(({data}) => {
                this.goodInfo = data.data[0];
                this.imgList = data.data[0].titleImg;
                this.comLength = data.data[0].comments.length;
                console.log(this.goodInfo);
                console.log(this.imgList);
            }).catch((err) => {
                console.error(err);
            })
        },
        mounted () {
            this.fetchList();
        },
        methods: {
            fetchList () {
                this.list = [0,1,2,3];
            },
            select(index) {
                this.index = index;
                this.priceInfo = this.goodInfo.style[this.index];
                this.goodPic = this.goodInfo.titleImg[this.index];
                // console.log(this.goodPic);
                console.log(this.priceInfo);
            },
            less() {
                if(this.quantity!=1){
                    this.quantity--;
                }
            },
            collect() {
                this.isCollect = !this.isCollect;
                if(this.isCollect) {
                    this.collectInfo = "已收藏";
                }else {
                    this.collectInfo = "收藏";
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .wrap {
        position: relative;
        background-color: #f2f2f2;
        color: rgb(116,119,116);
        width: 100%;
        overflow-x: hidden;
        a {
            text-decoration: none;
        }
        .connect-line {
            height: 10px;
            border-top: 1px solid #e5e5e5;
            border-bottom: 1px solid #e5e5e5;
            background-color: #f2f2f2;
        }
        .back {
            position: absolute;
            left: 0.266rem;
            z-index: 999;
            top: 0.1333rem;
            img {
                width: 0.666rem;
            }
        }
        .slide-wrap {
            width: 100%;
            .swiper {
                width: 100%;
                height: 10rem;
                background-color: white;
                img {
                    margin-bottom: 0.6933rem;
                    width: 100%;
                }
            }
        }
        .slide {
            font-size: 1.333rem;
            display: flex;
            align-items:center;
            justify-content: center;
        }
        .sp-info {
            padding: 0 0.266rem;
            background-color: white;
            border-bottom: 1px solid #e5e5e5;
            h1 {
                font-size: 0.3733rem;
                font-weight: bold;
                padding-top: 0.2667rem;
                padding-bottom: 0.32rem;
                background-color: white;
                height: 0.8rem;
                line-height: 0.8rem;
                display: flex;
                justify-content:space-between;
                p {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                img {
                    width: 0.88rem;
                    height: 0.48rem;
                    margin-right: 1.3066rem;
                    margin-top: 0.16rem;
                }
            }
            .price-info {
                display: flex;
                justify-content: space-between;
                p:nth-child(1) {
                    color: #e85281;
                    font-weight: bolder;
                    .unit-price {
                        font-size: 0.5333rem;
                    }
                    .unit-point {
                        font-size: 0.3733rem;
                    }
                }
                .collect {
                    background: url("../assets/img/icon0.png") no-repeat;
                    background-position: center 0;
                    position: absolute;
                    height: 0.4rem;
                    padding-top: 0.4rem;
                    font-size: 0.32rem;
                    right: 0.3733rem;
                    background-size: 0.4rem auto;
                    color: #666;
                }
            }
            .other-info {
                display: flex;
                justify-content: space-between;
                padding: 0.4rem 0;
                font-size: 0.3466rem;
                font-weight: bolder;
            }
        }
        .sp-ensure {
            background-color: white;
            overflow: hidden;
            padding: 0 0.2666rem;
            p:nth-child(1) {
                margin-top: 0.26667rem;
                line-height: 0.5866rem;
                font-size: 0.32rem;
                font-weight: bolder;
                span {
                    margin-right: 0.1333rem;
                    background-color: #e85281;
                    border-radius: 0.0533rem;
                    color: white;
                    padding: 0.0533rem;
                }
            }
            p:nth-child(2){
                margin-top: 0.5333rem;
                margin-bottom: 0.5333rem;
                a {
                    display: inline-block;
                    padding-left: 0.4rem;
                    line-height: 0.4rem;
                    margin-right: 0.2667rem;
                }
                a:nth-child(1) {
                    background: url("../assets/img/ico_d1.png") no-repeat;
                    background-size: 0.4rem auto;
                }
                a:nth-child(2) {
                    background: url("../assets/img/ico_d2.png") no-repeat;
                    background-size: 0.4rem auto;
                }
                a:nth-child(3) {
                    background: url("../assets/img/ico_d3.png") no-repeat;
                    background-size: 0.4rem auto;
                }
            }
        }
        .choose-type {
            padding: 0 0.2666rem;
            background-color: white;
            .choose-box {
                border-bottom:1px solid #e5e5e5 ;
                padding: 0.4rem 0;
                .choose-title {
                    color: #595758;
                    font-size: 0.3733rem;
                    margin-bottom: 0.4rem;
                }
                .sp-type {
                    display: flex;
                    img {
                        width: 1.7066rem;
                        height: 1.7066rem;
                        margin-right: 0.2666rem;
                    }
                    .sp-des {
                        p {
                            line-height: 0.64rem;
                            font-size: 0.32rem;
                            margin-left: 0.1333rem;
                        }
                        .sp-kind {
                            float: left;
                            padding: 0 0.1333rem;
                            margin-left: 0;
                        }
                        span {
                            background-color: #e85281;
                            color: white;
                            border: 1px solid #e85281;
                            transition: all 0.5s;
                            padding: 0.1866rem 0.2133rem;
                            border-radius: 0.133rem;
                            font-size:0.3733rem;
                            margin-top: 0.133rem;
                            display: inline-block;
                        }
                    }
                }
            }
            .num-controls {
                padding: 0.4rem 0;
                .num-title {
                    font-size: 0.3733rem;
                    color: #595758;
                    margin-bottom: 0.4rem;
                }
                .nc-main {
                    border: 1px solid #e5e5e5;
                    width: 3.2533rem;
                    border-radius: 0.1333rem;
                    height: 0.9333rem;
                    .num-less,.num-add {
                        font-size: 0.4266rem;
                        text-align: center;
                        display: block;
                        width: 0.78rem;
                        height: 0.9333rem;
                        float: left;
                        line-height: 0.9333rem;
                    }
                    .num {
                        width: 1.6rem;
                        height: 0.9333rem;
                        display: block;
                        float: left;
                        line-height: 0.9333rem;
                        text-align: center;
                        border-left: 1px solid #e5e5e5;
                        border-right: 1px solid #e5e5e5;
                        border-top: none;
                        border-bottom: none;
                    }
                }
            }

        }
        .details {
            background-color: white;
            .eval-link {
                font-size: 0.3733rem;
                line-height: 1.333rem;
                font-weight: bold;
                padding: 0 0.4rem 0 0.2666rem;
                display: block;
                overflow: hidden;
                .fl {
                    float: left;
                    line-height: 1.333rem;
                }
                img {
                    float: right;
                    width: 0.2666rem;
                    margin-top: 0.4533rem;
                }
                .all-eval {
                    float: right;
                    color: #999;
                    font-size: 0.3733rem;
                    font-weight: normal;
                    line-height: 1.333rem;
                    margin-right: 0.4rem;
                }
            }
            .text-box {
                border-top: 1px solid #e5e5e5;
                border-bottom: 1px solid #e5e5e5;
                .text {
                    padding: 0 0.2666rem;
                    .text-name {
                        padding: 0.2666rem 0;
                        line-height: 0.2666rem;
                        font-size: 0.3466rem;
                        font-weight: bold;
                    }
                    .text-word {
                        font-size: 0.32rem;
                        color: #727272;
                        padding-bottom: 0.2666rem;
                        line-height: 0.42666rem;
                    }
                    .date {
                        border-bottom: 1px solid #e5e5e5;
                        font-size: 0.32rem;
                        color: #727272;
                        padding-bottom:0.2666rem;
                    }
                }
            }
        }
        .detail-box {
            .detail-tit {
                font-size: 0.3733rem;
                line-height: 0.8rem;
                font-weight: bold;
                background-color: white;
                padding: 0 0.5333rem 0.16rem;
                color: #333;
                border-bottom: 1px solid #ddd;
                margin: 0.2667rem -0.266rem 0;
            }
            p {
                text-align: center;
                img {
                    width: 100%;
                    vertical-align: bottom;
                }
            }
        }
        .sp-footer {
            padding: 0;
            height: 1.2rem;
            border-top: 1px solid #eee;
            width: 100%;
            position: fixed;
            bottom: 0;
            right: 0;
            left: 0;
            background-color: white;
            margin: 0 auto;
            .kf {
                position: absolute;
                left: 0;
                top: 0;
                background: url("../assets/img/ico_kf.png") no-repeat center 0.1333rem;
                background-size: 0.56rem 0.56rem;
                padding-top: 0.8rem;
                text-align: center;
                font-size: 0.2666rem;
                width:1.2rem ;
                height: 1.2rem;
            }
            .shopcart {
                position: absolute;
                left: 1.333rem;
                top: 0;
                background: url("../assets/img/ico_gwc.png") no-repeat center 0.1333rem;
                background-size: 0.56rem 0.56rem;
                padding-top: 0.8rem;
                text-align: center;
                font-size: 0.2666rem;
                width: 1.2rem;
                height: 1.2rem;
                .shopnum {
                    border-radius:0.2666rem;
                    position: absolute;
                    top: 0.0533rem;
                    left: 0.6133rem;
                    height: 0.48rem;
                    line-height: 0.48rem;
                    text-align: center;
                    background: #E6004A;
                    color: #fff;
                    border: none;
                    font-size: 0.2666rem;
                    display: inline-block;
                    padding: 0 0.1333rem;
                    min-width: 8px;
                }
            }
            .buy {
                line-height: 1.2rem;
                height: 1.2rem;
                border: none;
                width: 25%;
                display: block;
                background-color: #e85281;
                color: white;
                font-size: 0.3733rem;
                text-align: center;
                float: right;
            }
            .add-shopcart {
                line-height: 1.2rem;
                height: 1.2rem;
                border: none;
                background: #FFC451;
                color: #fff;
                width: 25%;
                display: block;
                font-size: 0.3733rem;
                text-align: center;
                float: right;
            }
        }
        .kf_box {
            .kf_bg {
                background: rgba(0,0,0,0.5);
                position: fixed;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                z-index: 100;
            }
            .kf_cont {
                position: fixed;
                left: 50%;
                top: 50%;
                margin-left: -3.733rem;
                margin-top: -2.6666rem;
                width: 7.4666rem;
                height: 5.333rem;
                background: white;
                z-index: 101;
                border-radius: 0.1333rem;
                text-align: center;
                h4 {
                    background: #ec5483;
                    color: white;
                    text-align: center;
                    line-height: 0.96rem;
                    font-size: 0.4rem;
                    border-top-left-radius: 0.1333rem;
                    border-top-right-radius: 0.1333rem;
                    font-weight: 400;
                }
                h2 {
                    font-weight: 400;
                    a {
                        font-size: 0.64rem;
                        color: #ec5483;
                        padding: 0.533rem 0 0.2666rem;
                        display: block;
                    }
                }
                p {
                    font-size: 0.3466rem;
                    color: #666;
                }
                h3 {
                    font-weight: 400;
                    a {
                        display: inline-block;
                        margin: 30px 0.2666rem 0.2666rem;
                        font-size: 0.4rem;
                        background: #fff;
                        border: 1px solid #EC5483;
                        color: #EC5483;
                        border-radius: 0.08rem;
                        width: 2.56rem;
                        height: 0.9066rem;
                        line-height: 0.9066rem;
                        &.on {
                            background: #ec5483;
                            color: white;
                        }
                    }
                }
            }
        }
    }

</style>