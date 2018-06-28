<template>
    <div>
        <user-header msg="收藏夹"></user-header>
        <div class="nav-box" ref="navBox" v-if="dataList">
            <ul>
                <li v-for="item in dataList">
                    <a href=""><img :src="item.titleImg[0].url" alt=""></a>
                    <div class="content-box">
                        <p class="title-box">{{item.title}}</p>
                        <p class="type-box">{{item.style[0].type}}</p>
                        <p class="count-box">￥ {{item.style[0].countersPirce}}</p>
                    </div>
                    <div class="remove-box">移除</div>
                </li>
            </ul>
        </div>
        <div class="empty-box" v-else>
            <p>您的收藏夹空空如也, 快去添加商品吧!</p>
        </div>
    </div>
</template>

<script>
    import UserHeader from "./common/userHeader"
    import Bscroll from 'better-scroll'
    import {mapState} from "vuex";
    export default {
        name: "favorites",
        components: {
            UserHeader
        },
        data(){
            return {
                dataList: []
            }
        },
        created(){
            let formData = this.$qs.stringify({
                key: 4012
            });
            this.$http({
                method: 'post',
                url: "/api/goods/find/classId",
                data: formData
            }).then(({data})=>{
                console.log(data)
                this.dataList.push(data.data[0]);

            });
        },
        mounted(){

        }
    }
</script>

<style lang="less" scoped>
    .nav-box{
        position: absolute;
        top: 1.09333rem;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: rgb(240,240,240);
        overflow: hidden;
        ul{
            li{
                display: flex;
                justify-content: space-between;
                padding: 0.4rem;
                background: white;
                img{
                    width: 2.6667rem;
                    height: 2.6667rem;
                }
                .content-box{
                    font-size: 0.32rem;
                    margin: 0 0.2rem;
                    flex: 1;
                    .title-box{
                        margin-bottom: 0.2rem;
                    }
                    .type-box{
                        margin-bottom: 0.2rem;
                    }
                    .count-box{
                        color: red;
                    }
                }
                .remove-box{
                    font-size: 0.4rem;
                    color: red;
                    width: 1rem;
                    line-height: 2.6667rem;
                }
            }
        }
    }
    .empty-box{
        position: absolute;
        top: 1.09333rem;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: rgb(240,240,240);
        p{
            margin: 1rem auto;
            padding: 0 0.8rem;
            font-size: 0.6rem;
        }
    }
</style>