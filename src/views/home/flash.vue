<template>
    <div>
        <div class="content">
            <div class="top">
                <wc-swiper v-if="list.length" :autoplay="false" class="ttt">
                    <wc-slide v-for="(v, k) in imgList" :key="k" class="slide-slide">
                        <a href="javascript: void(0)">
                            <img :src="v" alt="">
                        </a>
                    </wc-slide>
                </wc-swiper>
            </div>
            <div class="middle">
                <ul>
                    <li>
                        <a href="javascript: void(0)">
                            <img src="http://7xlbbv.com2.z0.glb.qiniucdn.com/9c39a1dd3f814774bdb64e1ff52d4f45.jpg?imageView2/1/w/640/h/480/q/100" alt="">
                        </a>
                    </li>
                    <li>
                        <a href="javascript: void(0)">
                            <img src="http://7xlbbv.com2.z0.glb.qiniucdn.com/259f37a2b90547149680b02e443a4cd8.jpg?imageView2/1/w/640/h/480/q/100" alt="">
                        </a>
                    </li>
                    <li>
                        <a href="javascript: void(0)">
                            <img src="http://7xlbbv.com2.z0.glb.qiniucdn.com/18aca9ae1dcd49109e5c3333c4efb292.jpg?imageView2/1/w/640/h/480/q/100" alt="">
                        </a>
                    </li>
                </ul>

            </div>
            <div class="bottom">
                <a href="">
                    <img src="http://7xlbbv.com2.z0.glb.qiniucdn.com/3e0295eeb5c34d28afd0fc7ef76eee6e.jpg?imageView2/1/w/640/h/480/q/100" alt="">
                </a>
            </div>
        </div>

    </div>
</template>

<script>
    import animate from 'animate.css'
    export default {
        name: "flash",
        data () {
            return {
                count : 0,
                show : false,
                list: [],
                imgList: ["http://7xlbbv.com2.z0.glb.qiniucdn.com/0e122f61be9a4efeb83e19c2174b2011.jpg?imageView2/1/w/750/h/307/q/100","http://7xlbbv.com2.z0.glb.qiniucdn.com/2b1a08ce91ef4c8a9828cb1704722f58.jpg?imageView2/1/w/750/h/307/q/100","http://7xlbbv.com2.z0.glb.qiniucdn.com/ec7b9bcb97ce42eeb786fd868926ade6.jpg?imageView2/1/w/750/h/307/q/100","http://7xlbbv.com2.z0.glb.qiniucdn.com/f3aece965fec4a11b9de2e6ec91d1672.jpg?imageView2/1/w/750/h/307/q/100","http://7xlbbv.com2.z0.glb.qiniucdn.com/da1e47654c6d49549c3cbd2a606114fb.jpg?imageView2/1/w/750/h/307/q/100","http://7xlbbv.com2.z0.glb.qiniucdn.com/9cf8410b73d54a0e9ef81e122afeefee.jpg?imageView2/1/w/750/h/307/q/100"],
            }
        },
        mounted () {
            this.fetchList();
        },
        methods: {
            fetchList () {
                this.list = [0,1,2,3,4,5];
            },
            transitionend (current) {
                this.currentSlide = current;
            },
        },
        props: {
            pagination: {
                default: false
            },
        },
    }
</script>

<style lang="less" scoped>
    @import "./../../assets/css/animate.css";
* {
    margin: 0;
    padding: 0;
}
a {
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
a img {
    border: 0;
}
img{
    vertical-align: bottom;
}
.content{
    position: fixed;
    top:2.41rem;
    bottom: 1.227rem;
    width:100%;
    overflow: scroll;
}
//////
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
.middle>ul{
    display: flex;
    width: 100%;
    height: auto;
    overflow: hidden;
    padding: 0.16rem 0.08rem;
    box-sizing: border-box;
    background: #f0f2f5;
}
.middle>ul li{
    padding: 0px 0.08rem;
    width: 33.33%;
    box-sizing: border-box;
}
.middle>ul li>a>img {
    width: 100%;
}
.bottom{
    width: 100%;
    margin-top: -0.253rem;
}
.bottom>a>img{
    margin-top: 0.267rem;
    width: 100%;
}
</style>