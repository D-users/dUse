<template>
    <div id="user">
        <div v-if="username">
            <div class="topbar">
                <a class="user-msg" href="/user/personalMsg">
                    <img src="../../assets/img/user/user.png" alt="">
                    <div>
                        <p>{{username}}</p>
                        <p>尊敬的用户,{{nickname}} 您好!</p>
                    </div>
                    <img src="../../assets/img/user/go2.png" alt="">
                </a>
                <div class="top-nav">
                    <a href="/user/recharge"><i></i>充值</a>
                    <a href="/user/withdrawal"><i></i>提现申请</a>
                </div>
            </div>
            <div class="midbar">
                <ul class="order-navs">
                    <li><a href="javascript: void(0)"><p>{{unpaid}}</p><p>待支付</p></a></li>
                    <li><a href="javascript: void(0)"><p>{{unSend}}</p><p>待发货</p></a></li>
                    <li><a href="javascript: void(0)"><p>{{unReceived}}</p><p>待收货</p></a></li>
                    <li><a href="javascript: void(0)"><p>{{unEvaluated}}</p><p>待评价</p></a></li>
                    <li><a href="javascript: void(0)"><p>{{returned}}</p><p>退货</p></a></li>
                </ul>
                <div class="mid-nav">
                    <a href="/user/orderList"><i></i>全部订单</a>
                    <a href="/user/favorites"><i></i>宝贝收藏</a>
                </div>
            </div>
            <div class="fotbar">
                <ul>
                    <li><a href="/user/balance"><i></i><p>余额</p></a></li>
                    <li><router-link :to="{ name: 'GetRecord', params: {type:'recharge'}}"><i></i><p>充值记录</p></router-link></li>
                    <li><a href="javascript: void(0)" @click="showAlert"><i></i><p>公告管理</p></a></li>
                    <li><a href="/user/Integral"><i></i><p>积分查询</p></a></li>
                    <li><a href="javascript: void(0)" @click="showAlert"><i></i><p>推广管理</p></a></li>
                    <li><a href="/user/bindCard"><i></i><p>银行卡绑定</p></a></li>
                    <li><a href="javascript: void(0)" @click="showAlert"><i></i><p>手机绑定</p></a></li>
                    <li><router-link :to="{ name: 'GetRecord', params: {type:'withdrawal'}}"><i></i><p>提现记录</p></router-link></li>
                    <li><a href="javascript: void(0)" @click="showAlert"><i></i><p>优惠券</p></a></li>
                </ul>
            </div>
        </div>
        <div class="to-login-box" v-else>
            <a href="/user/login">未登录, 点击前往登陆</a>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex"
    export default {
        name: "userIndex",
        data(){
            return {
                unpaid: 0,
                unSend: 0,
                unReceived: 0,
                unEvaluated: 0,
                returned: 0
            }
        },
        computed: {
            ...mapState(['username','nickname','userId'])
        },
        methods: {
            showAlert(){
                alert("暂无该功能,敬请期待后续添加!");
            }
        },
        created(){
            let formData = this.$qs.stringify({
                userId: this.userId
            });
            this.$http({
                method: "post",
                url: "/api/get/order",
                data: formData
            }).then(({data})=>{
                if(data.status){
                    let arr = [];
                    for(let i=0;i<data.data.length;i++){
                        for(let j=0;j<data.data[i].Detail.length;j++){
                            if(data.data[i].state == 0){
                                this.unpaid += 1;
                            }else if(data.data[i].state == 1){
                                this.unSend += 1;
                            }else if(data.data[i].state == 2){
                                this.unReceived += 1;
                            }else if(data.data[i].state == 3){
                                this.unEvaluated += 1;
                            }else{
                                this.returned += 1;
                            }
                        }
                    }
                }
            })
        }
    }
</script>

<style lang="less" scoped>
    @border: 1px solid #e5e5e5;
    a{
        text-decoration: none;
    }
    #user{
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        background-color: rgb(242,242,242);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-bottom: 1.3rem;
        .topbar{
        margin-bottom: 12px;
    .user-msg{
        height: 2.6667rem;
        box-sizing: border-box;
        padding: 0 0.4rem;
        background-image: url("../../assets/img/user/ci-bg.jpg");
        background-size: 100% 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: @border;
    img:first-child{
        width: 1.3333rem;
        margin-right: 0.2667rem;
    }
    img:last-child{
        width: 0.4rem;
    }
    div{
        flex: 1;
        color: white;
        font-size: 0.37333rem;
        line-height: 0.64rem;
    }
    }
    .top-nav{
        display: flex;
        border-bottom: @border;
    a{
        display: block;
        flex: 1;
        color: rgb(51,51,51);
        height: 1.0667rem;
        font-size: 0.37333rem;
        line-height: 1.0667rem;
        text-align: center;
        background-color: white;
        position: relative;
    i{
        display: block;
        background-image: url("../../assets/img/user/center-icon.png");
        width: 0.69333rem;
        height: 1.06667rem;
        background-size: 7.46667rem auto;
        position: absolute;
        top: 0;
        left: 14%;
        background-position: -0.24rem -1.49333rem;
    }
    &:first-child{
         margin-right: 1px;
    i{
        left: 20%;
        background-position: -0.24rem -1px;
    }
    }
    }
    }
    }
        .midbar{
        border-top: @border;
        border-bottom: @border;
        background-color: white;
        margin-bottom: 12px;
    .order-navs{
        display: flex;
        padding: 0.32rem 0.4rem;
        border-bottom: 1px solid #e5e5e5;
        text-align: center;
        font-size: 0.32rem;
    li{
        flex: 1;
    p:first-child{
        font-size: 0.53333rem;
        margin-bottom: 0.21333rem;
    }
    }
    }
    .mid-nav{
        padding: 0.26667rem 0.4rem;
        display: flex;
        justify-content: space-between;
    a{
        display: block;
        flex: 1;
        text-align: center;
        font-size: 0.37333rem;
        height: 0.53333rem;
        line-height: 0.53333rem;
        position: relative;
    i{
        display: block;
        width: 0.4rem;
        height: 0.53333rem;
        background-position: -0.4rem -4.63rem;
        background-size: 7.46667rem;
        position: absolute;
        top: 0px;
        left: 14%;
        background-image: url("../../assets/img/user/center-icon.png");
        background-repeat: no-repeat;
    }
    &:first-child{
         border-right: @border;
    i{
        background-position: -0.4rem -3.27rem;
    }
    }
    }
    }
    }
        .fotbar{
            flex: 1;
            overflow: auto;
            ul{
                &::after{
         content: ".";
         clear: both;
         display: block;
         overflow: hidden;
         font-size: 0;
         height: 0;
         border-top: @border;
         border-bottom: @border;
     }
                li{
                    border-right: 1px solid #e5e5e5;
                    border-bottom: 1px solid #e5e5e5;
                    float: left;
                    padding: 0.26667rem 0;
                    width: 25%;
                    box-sizing: border-box;
                    height: 2.66667rem;
                    text-align: center;
                    background-color: white;
                    font-size: 0.34667rem;
                    i{
                        display: block;
                        width: 1.06667rem;
                        height: 1.06667rem;
                        margin: 0 auto 10px;
                        background-image: url(../../assets/img/user/center-icon.png);
                        background-repeat: no-repeat;
                        background-size: 7.46667rem;
                    }
                    p{
                        line-height: 0.45333rem;
                    }
                    &:nth-child(1){
                        i{
                            background-position: -0.26667rem -5.86667rem;
                        }
                    }
                    &:nth-child(2){
                        i{
                            background-position: -5.97333rem -0.026667rem;
                        }
                    }
                    &:nth-child(3){
                        i{
                            background-position: -3.30667rem -7.76rem;
                        }
                    }
                    &:nth-child(4){
                        i{
                            background-position: -6.13333rem -7.81333rem;
                        }
                    }
                    &:nth-child(5){
                        i{
                            background-position: -5.97333rem -1.97333rem;
                        }
                    }
                    &:nth-child(6){
                        i{
                            background-position: -3.30667rem -9.68rem;
                        }
                    }
                    &:nth-child(7){
                        i{
                            background-position: -3.30667rem -5.86667rem;
                        }
                    }
                    &:nth-child(8){
                        i{
                            background-size: 100%;
                            background-image: url("../../assets/img/user/icon-tixian.png");
                        }
                    }
                    &:nth-child(9){
                        i{
                            background-size: 100%;
                            background-image: url("../../assets/img/user/icon-ticket.png");
                            background-position: center;
                        }
                    }
                }
            }
        }
        .to-login-box{
            a{
                font-size: 0.6rem;
                display: block;
                text-align: center;
                margin: 1rem auto;
            }
        }
    }
</style>