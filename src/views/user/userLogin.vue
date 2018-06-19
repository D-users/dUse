<template>
    <div class="login">
        <img src="../../assets/img/userlogo.jpg" alt="">
        <div class="login-box">
            <ul>
                <li><label>用户</label><input type="text" placeholder="请输入手机号或用户名"></li>
                <li><label>密码</label><input type="password" placeholder="请输入密码"></li>
                <li><input type="button" value="登录" class="login-btn"></li>
                <li><a href="/user/register">注册</a><a href="">忘记密码</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "user"
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
                    }
                }
                &:last-child{
                    border-bottom: none;
                    height: 0.5rem;
                }
            }
        }

    }

</style>