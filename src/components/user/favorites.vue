<template>
    <div>
        <user-header msg="收藏夹"></user-header>
        <div class="nav-box" ref="navBox" v-if="dataList">
            <ul>
                <li v-for="(item,i) in dataList">
                    <a href=""><img :src="item.titleImg[0].url" alt=""></a>
                    <div class="content-box">
                        <p class="title-box">{{item.title}}</p>
                        <p class="type-box">{{item.style[0].type}}</p>
                        <p class="count-box">￥ {{item.style[0].countersPirce}}</p>
                    </div>
                    <div class="remove-box" @click="removeFav(item.classId,i)">移除</div>
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
        computed: {
            ...mapState(['userId'])
        },
        created(){
            let formData = this.$qs.stringify({
                userId: this.userId
            });
            this.$http({
                method: 'post',
                url: "/api/get/collect",
                data: formData
            }).then(({data})=>{
                if(data.status){
                    this.dataList = data.data;
                }
            });
        },
        mounted(){
            this.menuScroll = new Bscroll(this.$refs.navBox,{
                click: true
            });
        },
        methods: {
            removeFav(val,i){
                let formData = this.$qs.stringify({
                    userId: this.userId,
                    classId: val,
                    count: -9999
                });
                this.$http({
                    method: "post",
                    url: "/api/user/collectChange",
                    data: formData
                }).then(({data})=>{
                    if(data.status){
                        alert("删除成功!");
                        let arr = [];
                        for(let j=0;j<this.dataList.length;j++){
                            if(j!=i){
                                arr.push(this.dataList[j])
                            }
                        }
                        this.dataList = arr;
                    }
                });
            }
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
                border-bottom: 1px solid #e5e5e5;
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