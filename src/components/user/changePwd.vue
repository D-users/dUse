<template>
    <div>
        <user-header :msg="修改密码"></user-header>
        <div class="content-box">
            <div class="text-box">
                <p>用户名: </p>
                <input type="text" v-model="userName" placeholder="请输入原密码">
                <p>原密码: </p>
                <input type="text" v-model="pwd1" placeholder="请输入原密码">
                <p>新密码: </p>
                <input type="password" v-model="pwd2" placeholder="请输入新密码(首位英文字母,6~15位)">
                <p>确认密码: </p>
                <input type="password" v-model="pwd3" placeholder="注意与之前相同">
            </div>
            <div class="btn-box">
                <button class="change-btn" @click="changePwd">确认修改</button>
            </div>
        </div>
    </div>
</template>

<script>
    import UserHeader from "./common/userHeader"
    import {mapState} from "vuex"
    export default {
        name: "changePwd",
        components: {
            UserHeader
        },
        data(){
            return {
                userName: null,
                pwd1: null,
                pwd2: null,
                pwd3: null
            }
        },
        computed: {
            ...mapState(['userId'])
        },
        methods: {
            changePwd(){
                if(this.pwd2 != this.pwd3){
                    alert("两次密码输入不一致")
                }else{
                    let formData = this.$qs.stringify({
                        userName: this.userName,
                        pwd: this.pwd1,
                        pwdNew: this.pwd2
                    });
                    this.$http.post("/api/user/change2",formData).then(({data}) => {
                        if(data.status){
                            alert("修改成功!")
                        }
                    });
                }
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