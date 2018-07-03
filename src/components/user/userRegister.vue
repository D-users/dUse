<template>
    <div class="register">
        <img src="../../assets/img/user/register.jpg" alt="">
        <div class="register-box">
            <ul>
                <li><div>手机号</div><input type="text" placeholder="请输入手机号" v-model="user"></li>
                <li><div>验证码</div><input type="text" placeholder="请输入验证码"><button>获取验证码</button></li>
                <li><div>密码</div><input type="password" placeholder="请输入您的密码(首位英文字母,6~15位)" v-model="pwd"></li>
                <li><button :class="getClass" @click="register" :disabled="isTrue">立即注册</button></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "userRegister",
        data(){
            return {
                user: "",
                pwd: ""
            }
        },
        computed: {
            getClass(){
                if(this.isTrue){
                    return "register-btn off"
                }else{
                    return "register-btn"
                }
            },
            isTrue(){
                let isPhone=/^[1][3,4,5,7,8][0-9]{9}$/;
                let isPwd = /^[a-zA-Z]\w{5,15}$/;
                if (isPhone.test(this.user) && isPwd.test(this.pwd)) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        methods: {
            register(){
                let postData = this.$qs.stringify({
                    userName: this.user,
                    pwd: this.pwd
                });
                this.$http({
                    method: 'post',
                    url: "/api/user/regist",
                    data: postData
                }).then(({data})=>{
                    alert(data.msg);
                    if(data.status){
                        window.location.replace("/user/login");
                    }else{
                        window.location.replace("/");
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .register{
        img{
            display: block;
            width: 90%;
            margin: auto;
        }
        .register-box{
            width: 90%;
            margin: auto;
            li{
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid gray;
                line-height: 1.1rem;
                padding: 0.2rem 0;
                font-size: 0.4rem;
                div{
                    width: 1.5rem;
                }
                input{
                    flex: 1;
                }
                button{
                    background-color: hotpink;
                    padding: 0.1333rem;
                    border-radius: 0.1333rem;
                    color: white;
                    display: inline-block;
                    height: 0.8rem;
                    &.register-btn{
                        width: 100%;
                        border-radius: 0;
                        height: 1rem;
                    }
                    &.off{
                        background-color: gray;
                    }
                }
                &:nth-child(3){
                    margin-bottom: 0.4rem;
                    div{
                        letter-spacing: 0.32rem;
                    }
                }
                &:last-child{
                    border-bottom: none;
                }
            }
        }
    }
</style>