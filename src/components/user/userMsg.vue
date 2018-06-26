<template>
    <div class="user-msg">
        <user-header msg="个人信息"></user-header>
        <div class="content-box">
            <ul>
                <li><span>头像</span><a href=""><img src="../../assets/img/user/avatar.jpg" alt=""></a></li>
                <li><p>昵称</p><a href=""><p></p><img src="../../assets/img/user/go-right.png" alt=""></a></li>
                <li><p>手机号</p><p>{{phone}}</p></li>
                <li><p>修改密码</p><a href=""><img src="../../assets/img/user/go-right.png" alt=""></a></li>
                <li><p>修改支付密码</p><a href=""><img src="../../assets/img/user/go-right.png" alt=""></a></li>
                <li><p>收货地址</p><a href="/user/address"><img src="../../assets/img/user/go-right.png" alt=""></a></li>
            </ul>
            <button class="cancel-btn" @click="removeMsg">退出登陆</button>
        </div>
    </div>
</template>

<script>
    import UserHeader from "./common/userHeader"
    import {mapState,mapMutations} from "vuex";
    export default {
        name: "userMsg",
        components: {
            UserHeader
        },
        computed: {
            ...mapState(['phone']),
            ...mapMutations(['getNickname','removeAll'])
        },
        methods: {
            removeMsg(){
                this.$store.commit('removeAll');
                window.location.replace("/user/login");
            }
        }
    }
</script>

<style lang="less" scoped>
    @border: 1px solid #e5e5e5;
    .content-box{
        padding: 0 0.4rem 0.13333rem;
        li{
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: @border;
            padding: 0.26667rem 0;
            color: #333;
            font-size: 0.34667rem;
            p{
                line-height: 0.66667rem;
            }
            img{
                width: 0.21333rem;
            }
            &:first-child{
                padding: 0.21333rem 0;
                margin-top: 0.4rem;
                img{
                    width: 1.2rem;
                    height: 1.2rem;
                    border-radius: 50%;
                }
            }
        }
        .cancel-btn{
            background-color: #e85281;
            color: #fff;
            font-size: 0.37333rem;
            text-align: center;
            height: 1.12rem;
            line-height: 1.12rem;
            border: none;
            display: block;
            width: 100%;
            margin: 0.8rem 0;
        }
    }
</style>