<template>
    <div>
        <user-header msg="绑定银行卡"></user-header>
        <div class="card-box">
            <div class="card-msg">
                <ul>
                    <li>
                        <div class="left-box">卡号</div>
                        <div class="right-box">
                            <input type="text" id="txtCard" placeholder="请输入银行卡号" v-model="cardNumber">
                        </div>
                    </li>
                    <li>
                        <div class="left-box">银行</div>
                        <div class="right-box">
                            <select id="banks" v-model="bank">
                                <option value="">请选择</option>
                                <option value="上海浦东发展银行">上海浦东发展银行</option>
                                <option value="深圳发展银行">深圳发展银行</option>
                                <option value="交通银行">交通银行</option>
                                <option value="光大银行">光大银行</option>
                                <option value="北京银行">北京银行</option>
                                <option value="中国工商银行">中国工商银行</option>
                                <option value="中国建设银行">中国建设银行</option>
                                <option value="中国银行">中国银行</option>
                                <option value="中国农业银行">中国农业银行</option>
                                <option value="招商银行">招商银行</option>
                                <option value="兴业银行">中国民生银行</option>
                            </select>
                        </div>
                    </li>
                    <li>
                        <div class="left-box">姓名</div>
                        <div class="right-box">
                            <input type="text" id="txtName" placeholder="请输入姓名" v-model="cardUserName">
                        </div>
                    </li>
                </ul>
            </div>
            <div class="confirm-box">
                <p>注 : 银行卡用于退款和提现</p>
                <button :class="getClass" @click="bindCard" :disabled="isDisabled">确认绑定</button>
            </div>
        </div>
    </div>

</template>

<script>
    import UserHeader from "./common/userHeader"
    import {mapState} from "vuex";
    export default {
        name: "bindCard",
        components: {
            UserHeader
        },
        data(){
            return{
                cardNumber: "",
                bank: "",
                cardUserName: ""
            }
        },
        computed: {
            ...mapState(['userId']),
            isDisabled(){
                let isCard = /^([1-9]{1})(\d{14}|\d{18})$/;
                if(isCard.test(this.cardNumber) && this.bank && this.cardUserName){
                    return false;
                }else{
                    return true;
                }
            },
            getClass(){
                if(this.isDisabled){
                    return "confirm-btn off"
                }else{
                    return "confirm-btn"
                }
            }
        },
        methods: {
            bindCard(){
                let formData = this.$qs.stringify({
                    userId: this.userId,
                    cardNumber: this.cardNumber,
                    bank: this.bank,
                    cardUserName: this.cardUserName
                });
                this.$http({
                    method: 'post',
                    url: "/api/user/bankCardUpdate",
                    data: formData
                }).then(({data})=>{
                    if(data.status){
                        alert('绑定成功')
                        window.location.replace("/user");
                    }
                })
            }
        },
        created(){
            let formData = this.$qs.stringify({
                userId: this.userId
            });
            this.$http({
                method: 'post',
                url: "/api/user/bankCard",
                data: formData
            }).then(({data})=>{
                if(data.status){
                    var obj = data.data;
                    this.cardNumber = obj.cardNumber;
                    this.bank = obj.bank;
                    this.cardUserName = obj.cardUserName;
                }
            })
        }
    }
</script>

<style lang="less" scoped>
    @border: 1px solid #e5e5e5;
    .card-box{
        margin-top: 0.26667rem;
        .card-msg{
            border-bottom: @border;
            padding: 0 0.26667rem;
            li{
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: @border;
                color: #666;
                font-size: 0.37333rem;
                height: 1.04rem;
                &:last-child{
                    border-bottom: none;
                }
                .left-box{
                    width: 1.06667rem;
                }
                .right-box{
                    flex: 1;
                    #txtCard{
                        width: 100%;
                    }
                    #banks{
                        font-size: 0.34667rem;
                        color: #333;
                        border: 0;
                        width: 95%;
                        position: relative;
                        background: url("../../assets/img/user/select.gif") no-repeat;
                        background-position: 98% 0.21333rem;
                        background-size: 0.34667rem 0.18667rem;
                    }
                    #txtName{
                        width: 100%;
                    }
                }
            }
        }
        .confirm-box{
            padding: 0.26667rem;
            color: #666;
            font-size: 0.32rem;
            .confirm-btn{
                display: block;
                margin-top: 0.4rem;
                width: 100%;
                text-align: center;
                background-color: #e85281;
                padding: 10px 0;
                font-size: 16px;
                color: #fff;
                border: none;
                border-radius: 6px;
                &.off{
                    background-color: gray;
                }
            }
        }
    }
</style>