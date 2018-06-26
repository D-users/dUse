<template>
    <div>
        <user-header msg="提现"></user-header>
        <div class="card-msg">
            <h3>提现账号: </h3>
            <p>{{bank}}({{cardUser}})</p>
            <p>{{cardNumber}}</p>
        </div>
        <ul class="count-box">
            <li>
                <p>可提现余额<span>{{restNum}}</span>元</p>
                <a href="">提现记录</a>
            </li>
            <li><span class="icon">￥</span><input type="number" v-model="count"></li>
            <li><p>最少提现10元</p></li>
        </ul>
        <button :class="getClass" :disabled="isDisabled" @click="sendWithdrawal">提现</button>
    </div>
</template>

<script>
    import UserHeader from "./common/userHeader"
    import {mapState} from "vuex";
    export default {
        name: "withdrawal",
        components: {
            UserHeader
        },
        data(){
            return {
                cardNumber: "",
                cardUser: "",
                bank: "",
                restNum: 0,
                count: null
            }
        },
        computed: {
            ...mapState(['userId']),
            isDisabled(){
                if(this.count >= 10){
                    return false;
                }else {
                    return true;
                }
            },
            getClass(){
                if(this.isDisabled){
                    return "withdraw-btn off"
                }else{
                    return "withdraw-btn"
                }
            }
        },
        methods: {
            sendWithdrawal(){
                let formData = this.$qs.stringify({
                    userId: this.userId,
                    count: this.count
                });
                this.$http({
                    method: 'post',
                    url: "/api/user/moneyPay",
                    data: formData
                }).then(({data})=>{
                    if(data.status){
                        alert("提现成功");
                    }else{
                        alert("余额不足, 提现失败");
                    }
                    window.location.replace("/user/withdrawal");
                });
            }
        },
        created(){
            let formData = this.$qs.stringify({
                userId: this.userId,
            });
            this.$http({
                method: 'post',
                url: "/api/user/bankCard",
                data: formData
            }).then(({data})=>{
                if(data.status){
                    let obj = data.data;
                    //隐藏银行卡号
                    this.cardNumber = "**** **** **** "+obj.cardNumber%10000;
                    //隐藏姓名
                    this.cardUser = obj.cardUserName.substr(0,1)+"**";
                    this.bank = obj.bank;
                }
            });
            this.$http({
                method: 'post',
                url: "/api/user/money",
                data: formData
            }).then(({data})=>{
                if(data.status){
                    this.restNum = data.data.rmb;
                }
            });
        }
    }
</script>

<style lang="less" scoped>
    .card-msg{
        width: 95%;
        margin: 0.2rem auto;
        box-sizing: border-box;
        background: rgb(240,240,240);
        padding-left: 0.5rem;
        padding-bottom: 0.5rem;
        border-radius: 0.08rem;
        h3{
            line-height: 1rem;
            font-size: 0.4rem;
            color: mediumvioletred;
        }
        p{
            line-height: 0.64rem;
            font-size: 0.32rem;
            color: dodgerblue;
        }
    }
    .count-box{
        width: 95%;
        margin: 0.2rem auto;
        background: rgb(240,240,240);
        border-radius: 0.08rem;
        li{
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid white;
            font-size: 0.32rem;
            padding: 0.3rem 0.2rem;
            p{
                color: #666;
            }
            span{
                color: red;
                &.icon{
                    font-size: 0.64rem;
                    margin-right: 0.2rem;
                }
            }
            a{
                color: #666;
                display: block;
                background: url("../../assets/img/user/go-right.png") no-repeat;
                background-size: 0.18667rem;
                padding-right: 0.32rem;
                background-position: right center;
            }
            input{
                flex: 1;
                color: red;
                font-size: 0.64rem;
                background: rgb(240,240,240);
                border: none;
            }
        }
    }
    .withdraw-btn{
        background-color: #e85281;
        color: #fff;
        font-size: 0.37333rem;
        text-align: center;
        height: 1.12rem;
        line-height: 1.12rem;
        border: none;
        display: block;
        width: 95%;
        margin: 0.4rem auto;
        border-radius: 0.08rem;
        &.off{
            background-color: gray;
        }
    }
</style>