<template>
    <div>
        <div class="tab">
            <div class="tab-item" @click="changed">
                <img class="one" src="./../../assets/images/download-10.png" alt="">
                <router-link to="/index">首页</router-link>
            </div>
            <div class="tab-item">
                <img src="./../../assets/images/download-7.png" alt="">
                <router-link to="/list">分类</router-link>
            </div>
            <div class="tab-item">
                <img src="./../../assets/images/download-8.png" alt="">
                <router-link to="/cart">购物车</router-link>
            </div>
            <div class="tab-item">
                <img src="./../../assets/images/download-10.png" alt="">
                <router-link to="/user">个人中心</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "bottomNavigate",
        data(){
            return{
                // imgSrc:["./../../assets/images/download-10.png"]
            }
        },
        methods:{
            changed(){
                // $(".one").attr("src","./../../assets/images/download-6.png");
            }
        }

    }
</script>

<style lang="less" scoped>
    .tab{
        border-top: 0.027rem solid #e5e5e5;
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        display: flex;
        height: 1.227rem;
        margin-top:-1.227rem;
        .tab-item{
            flex:1;
            height: 1.093rem;
            margin-top: 0.133rem;
            img{
                display: block;
                width: 0.533rem;
                height: 0.533rem;
                margin: 0 auto;
            }
            a{
                display: block;
                text-align: center;
                line-height: 0.56rem;
                font-size: 0.373rem;
                color: rgb(77,85,93);
                text-decoration: none;
                &.router-link-active{
                    color: #e85281;
                }
            }
        }
    }
</style>