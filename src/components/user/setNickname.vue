<template>
    <div>
        <user-header msg="修改昵称"></user-header>
        <div class="content-box">
            <div class="text-box">
                <p>昵称: </p>
                <input type="text" v-model="nick" placeholder="请输入昵称">
            </div>
            <div class="btn-box">
                <button class="change-btn" @click="changeNick">确认修改</button>
            </div>
        </div>
    </div>
</template>

<script>
    import UserHeader from "./common/userHeader"
    import {mapState,mapMutations} from "vuex";
    export default {
        name: "setNickname",
        components: {
            UserHeader
        },
        data(){
            return {
                nick: ""
            }
        },
        computed: {
            ...mapState(['nickname','userId'])
        },
        created(){
            this.nick = this.nickname;
        },
        methods: {
            changeNick(){
                let formData = this.$qs.stringify({
                    userId: this.userId,
                    phoneNumber: this.nick
                });
                this.$http({
                    method: 'post',
                    url: "/api/user/phoneUpdate",
                    data: formData
                }).then(({data})=>{
                    if(data.status){
                        this.$store.commit('setStorage',{nickname:this.nick});
                        alert("修改成功!");
                    }else{
                        alert("修改失败!");
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .content-box{
        position: absolute;
        top: 1.09333rem;
        bottom: 0;
        left: 0;
        width: 100%;
        background: rgb(240,240,240);
        .text-box{
            background: white;
            width: 100%;
            padding: 0 0.3rem;
            display: flex;
            justify-content: space-between;
            line-height: 1.2rem;
            font-size: 0.4rem;
            padding-bottom: 0.5rem;
            p{
                width: 2rem;
                text-align: center;
            }
            input{
                flex: 1;
            }
        }
        .btn-box{
            background: white;
            padding: 0.5rem 0.4rem;
            .change-btn{
                display: block;
                width: 100%;
                text-align: center;
                background-color: #e85281;
                padding: 10px 0;
                font-size: 16px;
                color: #fff;
                border: none;
                border-radius: 6px;
            }
        }

    }
</style>