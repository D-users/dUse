<template>
    <div class="outer-box" ref="box">
        <div class="inner-box">
            <div class="content" v-if="goods.classProduct">
                <div class="top">
                    <div class="container">
                        <!--引入轮播图主键 开始-->
                        <wc-swiper v-if="list.length" :autoplay="false" class="ttt">
                            <wc-slide v-for="(v, k) in imgList" :key="k" class="slide-slide">
                                <a href="javascript: void(0)" @click="showAlert('广告位,敬请期待!')">
                                    <img :src="v" alt="">
                                </a>
                            </wc-slide>
                        </wc-swiper>
                        <!--引入轮播图主键 开始-->
                    </div>
                </div>
                <div class="middle">
                    <div class="middle_top">
                        <a href="/search/detail/精粹">
                            <img src="http://7xlbbv.com2.z0.glb.qiniucdn.com/be8860bd55bd4548967b8336dff6c16e.jpg?imageView2/1/w/640/h/480/q/100" alt="">
                        </a>
                    </div>
                    <div class="middle_middle">
                        <ul>
                            <li><a href="javascript: void(0)" @click="showAlert('暂无该功能,请期待我们的后续开发!')"><img src="./../../assets/images/download.png" alt=""></a></li>
                            <li><a href="javascript: void(0)" @click="showAlert('暂无该功能,请期待我们的后续开发!')"><img src="./../../assets/images/download-1.png" alt=""></a></li>
                            <li><a href="javascript: void(0)" @click="showAlert('暂无该功能,请期待我们的后续开发!')"><img src="./../../assets/images/download-2.png" alt=""></a></li>
                            <li><a href="javascript: void(0)" @click="showAlert('暂无该功能,请期待我们的后续开发!')"><img src="./../../assets/images/download-3.png" alt=""></a></li>
                            <li><a href="javascript: void(0)" @click="showAlert('暂无该功能,请期待我们的后续开发!')"><img src="./../../assets/images/download-4.png" alt=""></a></li>
                        </ul>
                    </div>
                    <div class="middle_bottom">
                        <img src="./../../assets/images/download-59.jpg" alt="">
                        <div>
                            <wc-swiper  v-if="list.length" :autoplay="false" :pagination="false" class="ttt">
                                <wc-slide v-for="(item,index) in goods.newProduct.data" class="slide-slide">
                                    <template v-for="(v, k) in item">
                                        <a :href="getHref(v.classId)">
                                            <img  :src="v.detailImg[k].url" alt="">
                                        </a>
                                    </template>
                                </wc-slide>
                            </wc-swiper>
                        </div>
                    </div>

                </div>
                <div >
                    <template v-for="(v,k) in goods.classProduct.data">
                        <div class="bottom">
                            <div class="bottom-top">
                                <a href="javascript: void(0)">
                                    <img src="./../../assets/images/download-23.jpg" alt="">
                                </a>
                            </div>
                            <div class="bmbb">
                                <div class="bottom-middle">
                                    <a href="javascript: void(0)">
                                        <img width="100%" src="./../../assets/images/download-60.jpg" alt="">
                                    </a>
                                </div>
                                <div class="bottom-bottom">
                                    <div v-for="(item,index) in v.con">
                                        <router-link :to="{ name: 'goods', params: {goodsId:item.classId}}">
                                            <img width="100%" :src="item.titleImg[0].url" alt="">
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import Bscroll from "better-scroll"
    export default {
        name: "home",
        data () {
            return {
                goods:[],
                count : 0,
                show : false,
                list: [],
                imgList: ["http://7xlbbv.com2.z0.glb.qiniucdn.com/e9bf73a5421245ec93ee804259609268.jpg?imageView2/1/w/750/h/307/q/100","http://7xlbbv.com2.z0.glb.qiniucdn.com/2b1a08ce91ef4c8a9828cb1704722f58.jpg?imageView2/1/w/750/h/307/q/100","http://7xlbbv.com2.z0.glb.qiniucdn.com/ec7b9bcb97ce42eeb786fd868926ade6.jpg?imageView2/1/w/750/h/307/q/100","http://7xlbbv.com2.z0.glb.qiniucdn.com/f3aece965fec4a11b9de2e6ec91d1672.jpg?imageView2/1/w/750/h/307/q/100","http://7xlbbv.com2.z0.glb.qiniucdn.com/da1e47654c6d49549c3cbd2a606114fb.jpg?imageView2/1/w/750/h/307/q/100","http://7xlbbv.com2.z0.glb.qiniucdn.com/9cf8410b73d54a0e9ef81e122afeefee.jpg?imageView2/1/w/750/h/307/q/100"],
            }
        },
        created () {
            axios.get("/api/goods/index").then(({data}) => {
                console.log(data);
                if(data.status){
                    this.goods=data.data;
                    console.log(this.goods);
                }
            }).catch((err) => {
                console.error(err);
            })
        },
        mounted () {
            this.fetchList();
            this.menuScroll = new Bscroll(this.$refs.box,{
                click: true
            });
        },
        methods: {
            fetchList () {
                this.list = [0,1,2,3,4,5];
            },
            transitionend (current) {
                this.currentSlide = current;
            },
            showAlert(val){
                alert(val);
            },
            getHref(val){
                return "/goods/"+val;
            }
        },
        props: {
            pagination: {
                default: false
            },
        },
    }
</script>

<style lang="less" scoped>
    a {
        text-decoration: none;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
    .outer-box{
        position: absolute;
        top: 2.41rem;
        left: 0;
        bottom: 1.30667rem;
        width: 100%;
        overflow: hidden;
    }
    /*.content{*/
        /*position: fixed;*/
        /*top:2.41rem;*/
        /*bottom: 1.227rem;*/
        /*width:100%;*/
        /*overflow: scroll;*/
    /*}*/
    /////////轮播图样式开始
    .slide-slide {
        height: 100%;
        width: 100%;
    }
    .slide-slide>a {
        display: block;
        width: 100%;
        height: 100%;
    }
    .slide-slide img {
        width: 100%;
        height: 100%;
    }
    .ttt {
        height: 100%;
        display: flex;
        justify-content: space-around;
    }
    ////////轮播图样式结束
    .middle_top{
        width: 100%;
    }
    .middle_top>a>img{
        margin-top: 0.267rem;
        width: 100%;
    }
    .middle_middle>ul{
        width: 100%;
        display: flex;
        justify-content: space-around;
        border-bottom-style: solid;
        border-bottom-width: 0.027rem;
        border-bottom-color: #ddd;
        background-color: #fff;
    }
    .middle_middle>ul li img{
        width:100%;
    }
    .middle_bottom>img{
        margin-top: 0.267rem;
        width: 100%;
    }
    .middle_bottom .slide-slide,.middle_bottom .ttt{
        height: 2.667rem;
    }
    .middle_bottom .slide-slide{
        overflow: hidden;
        display: flex;
        height: 2.667rem;
    }
    .middle_bottom .ttt a img{
        width: 2.667rem;
        height: 2.667rem;
        background-color: #ccc;
        display: block;
        margin-left: 0.267rem;
        float: left;
        text-align: center;
        line-height: 2.667rem;
    }
    .bottom-top{
        width: 100%;
    }
    .bottom-top>a>img{
        margin-top: 0.267rem;
        width: 100%;
    }
    .bmbb{
        margin-top: 0.213rem;
        float: left;
        overflow: hidden;
        background-color: #f0f2f5;
    }
    .bmbb .bottom-bottom{
        display: flex;
        flex-wrap: wrap;
    }
    .bmbb .bottom-bottom>div{
        width: 50%;
        height: 5.467rem;
        border-right: 0.027rem solid rgb(239,240,241);
        border-top: 0.027rem  solid rgb(239,240,241);
        position: relative;
        top: -0.08rem;}
    .bmbb .bottom-bottom>div>a>img{
        border: 0;
        vertical-align: bottom;
        height: 100%;
    }
</style>