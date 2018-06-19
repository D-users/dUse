<template>
    <div class="register">
        <img src="../../assets/img/register.jpg" alt="">
        <div class="register-box">
            <ul>
                <li><div>手机号</div><input type="text" placeholder="请输入手机号"></li>
                <li><div>验证码</div><input type="text" placeholder="请输入验证码"><button>获取验证码</button></li>
                <li><div>密码</div><input type="password" placeholder="请输入您的密码"></li>
                <li><button>立即注册</button></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "userRegister"
    }
</script>

<style lang="less" scoped>
    .register{
        img{
            display: block;
            width: 80%;
            margin: auto;
        }
        .register-box{
            width: 90%;
            margin: auto;
            li{
                width: 100%;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid gray;
                div{
                    width: 1.5rem;
                }
                input{
                    flex: 1;
                }
                &:nth-child(3){
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