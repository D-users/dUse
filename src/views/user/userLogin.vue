<template>
    <div class="login">
        <img src="../../assets/img/user/userlogo.jpg" alt="">
        <div class="login-box">
            <ul>
                <li><label>用户</label><input type="text" placeholder="请输入手机号或用户名" v-model="user"></li>
                <li><label>密码</label><input type="password" placeholder="请输入密码" v-model="pwd"></li>
                <li><input type="button" value="登录" class="login-btn" @click="login"></li>
                <li><a href="/user/register">注册</a><a href="">忘记密码</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from "vuex";
    export default {
        name: "userLogin",
        data(){
          return {
              user: "",
              pwd: ""
          }
        },
        computed: {

        },
        methods: {
            ...mapMutations(['setStorage']),
            login(){
                let formData = this.$qs.stringify({
                    userId: this.user,
                    pwd: this.pwd
                });
                this.$http({
                    method: 'post',
                    url: "/api/user/login",
                    data: formData
                }).then(({data})=>{
                    alert(data.msg);
                    if(data.status){
                        this.$store.commit('setStorage',this.user);
                        window.location.replace("/user");
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .login{
        img{
            width: 8rem;
            display: block;
            margin: 1.5rem auto;
        }
        .login-box{
            width: 90%;
            margin: auto;
            li{
                width: 100%;
                height: 1.2rem;
                display: flex;
                border-bottom: 1px solid gray;
                justify-content: space-between;
                align-items: center;
                padding: 0.133333rem 0;
                &:nth-child(3){
                    border-bottom: none;
                    margin-top: 0.2rem;
                }
                input{
                    line-height: 0.8rem;
                    border-style: hidden;
                    font-size: 0.5rem;
                    font-weight: 300;
                    flex: 1;
                    &.login-btn{
                        width: 100%;
                        background-color: hotpink;
                        color: white;
                        padding: 0.1rem 0;
                    }
                }
                &:last-child{
                    border-bottom: none;
                    height: 0.5rem;
                    a:first-child{
                        color: lightskyblue;
                    }
                    a:last-child{
                        color: lightgrey;
                    }
                }
            }
        }

    }

</style>