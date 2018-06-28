<template>
    <div class="recharge-box">
        <user-header msg="充值"></user-header>
        <div class="recharge-content" @click="cancelChange">
            <p>充值类型</p>
            <div class="type-box" v-text="type" @click.stop="toShow"></div>
            <p>充值{{type}}</p>
            <input type="text" :placeholder="showPlace" v-model="num">
            <p>应付金额</p>
            <h3>{{num}}元</h3>
            <button class="recharge-btn" @click="confirmRecharge">确认充值</button>
        </div>
        <div class="tabs" v-if="isShow">
            <div class="tab-header">
                <p @click="cancelChange">取消</p>
                <p @click="confirmChange">确定</p>
            </div>
            <transition name="moving">
                <div class="nav" @touchstart="chooseType">
                    <div>
                        <p v-for="item in typeList" :class="changeType(item)" >{{item}}</p>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import UserHeader from "./common/userHeader"
    import {mapState} from "vuex"
    export default {
        name: "recharge",
        data(){
            return {
                type: "积分",
                typeList: ["积分","金额"],
                num: null,
                activeType: "积分",
                isShow: false,
                isChanged: true,
                movingFlag: false
            }
        },
        components: {
            UserHeader
        },
        computed: {
            ...mapState(['userId']),
            showPlace(){
                if(this.type == "积分"){
                    return "建议转入100以上积分"
                }else{
                    return "输入您需要充值的金额"
                }
            }
        },
        methods: {
            toShow(){
                this.isShow = true
            },
            cancelChange(){
                this.isShow = false;
                this.activeType = this.type;
            },
            confirmChange(){
                this.isShow = false;
                this.type = this.activeType;
            },
            changeType(item){
                if(this.activeType == item){
                    return "active";
                }else{
                    return "tab-nav";
                }
            },
            chooseType(e){
                var touch1 = e.targetTouches[0];
                var y1 = touch1.pageY;
                document.addEventListener('touchmove',(e)=>{
                    var touch2 = e.targetTouches[0];
                    var y2 = touch2.pageY;
                    var dy = Math.abs(y2-y1);
                    if(dy>=50 && !this.movingFlag){
                        this.movingFlag = true;
                        var item = this;
                        $(".active").addClass("activeMoving");
                        $(".tab-nav").addClass("moving");
                        $(".active").on("transitionend",function (){
                            if(item.movingFlag){
                                item.movingFlag = false;
                                if(item.activeType == "积分"){
                                    item.activeType = "金额"
                                }else{
                                    item.activeType = "积分"
                                }
                            }
                        });
                    }

                })
            },
            confirmRecharge(){
                if(this.num){
                    let formData = this.$qs.stringify({
                        userId: this.userId,
                        count: this.num
                    });
                    if(this.type == "积分"){
                        this.$http({
                            method: 'post',
                            url: "/api/user/hanAdd",
                            data: formData
                        }).then(({data})=>{
                            if(data.status){
                                alert("充值成功!");
                            }else{
                                alert("充值失败!");
                            }
                        })
                    }else{
                        this.$http({
                            method: 'post',
                            url: "/api/user/moneyAdd",
                            data: formData
                        }).then(({data})=>{
                            if(data.status){
                                alert("充值成功!");
                            }else{
                                alert("充值失败!");
                            }
                        })
                    }
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .recharge-content{
        padding: 0 0.4rem;
        p{
            font-size: 0.37333rem;
            line-height: 1.12rem;
            color: #666;
        }
        .type-box{
            width: 100%;
            border: 1px solid darkgray;
            line-height: 1rem;
            height: 1rem;
            border-radius: 0.08rem;
            padding: 0 0.2rem;
            box-sizing: border-box;
            background: linear-gradient(top, white 0%,rgb(188,188,188)  100%);
        }
        input{
            width: 100%;
            line-height: 1rem;
            border: 1px solid darkgray;
            border-radius: 0.08rem;
            box-sizing: border-box;
            padding: 0 0.25rem;
        }
        h3{
            color: red;
            font-size: 0.37333rem;
            padding-left: 0.35rem;
            line-height: 1rem;
        }
        .recharge-btn{
            background-color: #e85281;
            color: #fff;
            font-size: 0.37333rem;
            text-align: center;
            height: 1.12rem;
            line-height: 1.12rem;
            border: none;
            display: block;
            width: 100%;
            margin: 0.4rem 0;
            border-radius: 0.08rem;
        }
    }
    .tabs{
        position: absolute;
        width: 100%;
        top: 9.4rem;
        left: 0;
        bottom: 0;
        background-color: #d1d5db;
        border-top: 1px solid #e5e5e5;
        display: flex;
        flex-direction: column;
        .tab-header{
            display: flex;
            justify-content: space-between;
            padding: 0 0.4rem;
            color: #007aff;
            line-height: 1.17333rem;
            font-size: 0.4rem;
            background-color: #f0f1f2;
        }
        .nav{
            flex: 1;
            position: relative;
            div{
                position: absolute;
                width: 100%;
                height: 1.2rem;
                top: 50%;
                margin-top: -0.6rem;
                border-top: 1px solid #e5e5e5;
                border-bottom: 1px solid #e5e5e5;
                p{
                    text-align: center;
                    position: absolute;
                    width: 100%;
                    line-height: 1.2rem;
                    font-size: 0.4rem;
                    color: #8a8c90;
                    top: -1.2rem;
                    transition: all 0.7s cubic-bezier(0,1.36,.89,1.36);
                    &.active{
                        font-size: 0.6rem;
                        color: #2a2b2c;
                        top: 0;
                    }
                    &.activeMoving{
                        transform: translate3d(0,-1.2rem,0);
                    }
                    &.moving{
                        transform: translate3d(0,1.2rem,0);
                    }
                }
            }
        }
    }
</style>