<template>
    <div class="outer-box" ref="box">
        <div class="inner-box">
            <div class="content">
            <div class="top">
                <!--引入轮播图组件-->
                <wc-swiper v-if="list.length" :autoplay="false" class="ttt">
                    <wc-slide v-for="(v, k) in imgList" :key="k" class="slide-slide">
                        <a href="javascript: void(0)">
                            <img :src="v" alt="">
                        </a>
                    </wc-slide>
                </wc-swiper>
            </div>
            <div class="middle">
                <ul class="middle_top">
                    <li><a href="javascript: void(0)"><img src="./../../assets/images/download-67.jpg" alt=""></a></li>
                    <li><a href="javascript: void(0)"><img src="./../../assets/images/download-73.jpg" alt=""></a></li>
                </ul>
                <ul class="middle_bottom">
                    <li><a href="javascript: void(0)"><img src="./../../assets/images/download-70.jpg" alt=""></a></li>
                    <li><a href="javascript: void(0)"><img src="./../../assets/images/download-71.jpg" alt=""></a></li>
                    <li><a href="javascript: void(0)"><img src="./../../assets/images/download-68.jpg" alt=""></a></li>
                </ul>
            </div>
            <div class="bottom">
                <div class="bottom_top">
                   <span>一 爆款榜单 一</span>
                </div>
                <ul class="bottom_bottom">
                    <li v-for="item in dataList">
                        <a :href="getHref(item.classId)">
                            <img v-lazy="item.titleImg[0].url" alt="">
                            <span class="name">{{item.title}}</span>
                            <span class="prices">￥<span>{{getZ(item.style[0].pirce)}}</span><span>{{getX(item.style[0].pirce)}}</span>+<span>{{Math.round(item.style[0].hanPirce)}}积分</span></span>
                            <span class="people_buy">{{item.sold}}人购买</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    import Bscroll from "better-scroll"
    export default {
        name: "beauty",
        data () {
            return {
                count : 0,
                show : false,
                dataList: [],
                list: [],
                imgList: ["http://7xlbbv.com2.z0.glb.qiniucdn.com/f23ef6fe4a4d47b58bb519a374bc2c44.jpg?imageView2/1/w/750/h/307/q/100","http://7xlbbv.com2.z0.glb.qiniucdn.com/2b1a08ce91ef4c8a9828cb1704722f58.jpg?imageView2/1/w/750/h/307/q/100","http://7xlbbv.com2.z0.glb.qiniucdn.com/ec7b9bcb97ce42eeb786fd868926ade6.jpg?imageView2/1/w/750/h/307/q/100","http://7xlbbv.com2.z0.glb.qiniucdn.com/f3aece965fec4a11b9de2e6ec91d1672.jpg?imageView2/1/w/750/h/307/q/100","http://7xlbbv.com2.z0.glb.qiniucdn.com/da1e47654c6d49549c3cbd2a606114fb.jpg?imageView2/1/w/750/h/307/q/100","http://7xlbbv.com2.z0.glb.qiniucdn.com/9cf8410b73d54a0e9ef81e122afeefee.jpg?imageView2/1/w/750/h/307/q/100"],
            }
        },
        mounted () {
            this.fetchList();
            this.menuScroll = new Bscroll(this.$refs.box,{
                click: true
            });
        },
        created(){
            this.$http.get("/api/goods/find3/彩妆").then(({data})=>{
                if(data.status){
                    this.dataList = data.data;
                }
            });
        },
        methods: {
            fetchList () {
                this.list = [0,1,2,3,4,5];
            },
            transitionend (current) {
                this.currentSlide = current;
            },
            getZ(val){
                return Math.floor(val-0);
            },
            getX(val){
                let i = (val-0)%1;
                let j = Math.round(i*10);
                return "."+j+"0";
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
    }
//////////
.middle{
    width: 100%;
    height: auto;
    overflow: hidden;
    padding: 0.16rem 0.08rem;
    box-sizing: border-box;
    display: block;
    background: #f0f2f5;
}
.middle .middle_top{
    width: 100%;
    display: flex;
    height: auto;
    overflow: hidden;
}
.middle .middle_top li{
    width: 50%;
    padding: 0 0.08rem;
    box-sizing: border-box;
}
.middle .middle_top li>a>img{
    width: 100%;
}
.middle .middle_bottom{
    display: flex;
    padding-top: 0.16rem;
}
.middle .middle_bottom li{
    width: 33.33%;
    padding: 0 0.08rem;
    box-sizing: border-box;
}
.middle .middle_bottom li>a>img{
    width: 100%;
}
.bottom_top{
    margin-top: 0.213rem;
    position: relative;
    display: -webkit-box;
    color: #e85281;
    font-size: 0.453rem;
    font-weight: 200;
    -webkit-box-pack: center;
}
.bottom_bottom{
    margin-top: 0.213rem;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    background-color: #f0f2f5;
}
.bottom_bottom li{
    text-align: center;
    width: 48%;
    box-sizing: border-box;
    padding-top: 0.107rem;
    position: relative;
    margin: 0.2rem 1%;
}
.even{
    padding-left: 0.107rem;
}

.bottom_bottom li>a{
    display: block;
    background-color: #fff;
    padding-bottom: 0.16rem;
    padding-top: 0.2rem;
}
.bottom_bottom li>a>img{
    width: 4.187rem;
    margin: 0 auto;
    height: 4.187rem;
}
.bottom_bottom .name{
    height: 0.88rem;
    font-size: 0.347rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-word;
    color: #232326;
    margin-top: 0.133rem;
    line-height: 0.453rem;
    margin-bottom: 0.08rem;
    padding: 0 0.107rem;
    text-align: left;
}
.bottom_bottom .prices,.bottom_bottom .people_buy{
    font-size: 0.347rem;
    display: block;
    padding: 0 0.107rem;
    position: relative;
    top: 0.027rem;
    height: 0.667rem;
    line-height: 0.667rem;
    text-align: left;
}
.bottom_bottom .prices{
    color: #e85281;
}
</style>