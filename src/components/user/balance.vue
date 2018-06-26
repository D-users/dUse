<template>
    <div>
        <user-header msg="余额"></user-header>
        <div class="content">
            <p>总余额:</p>
            <h2 :class="getClass">{{num}}</h2>
        </div>
        <div class="record">
            <h2>账户明细</h2>
            <ul>
                <li v-for="item in dataList">
                    <p class="time">{{item.timer}}</p>
                    <p :class="getColor(item.userType)">
                        <span v-if="item.userType == 'recharge'">+</span>
                        <span v-else>-</span>
                        {{item.amount}}
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import UserHeader from "./common/userHeader"
    import {mapState} from "vuex";
    export default {
        name: "balance",
        components: {
            UserHeader
        },
        data(){
            return {
                num : 0,
                dataList: []
            }
        },
        computed: {
            ...mapState(['userId']),
            getClass(){
                if(this.num>=100){
                    return "high"
                }else if(this.num>=30){
                    return ""
                }else{
                    return "low"
                }
            },
        },
        methods: {
            getColor(val){
                if(val == 'recharge'){
                    return "add"
                }else{
                    return "red"
                }
            }
        },
        created(){
            let formData = this.$qs.stringify({
                userId: this.userId,
            });
            this.$http({
                method: 'post',
                url: "/api/user/money",
                data: formData
            }).then(({data})=>{
                if(data.status){
                    this.num = data.data.rmb;
                }
            });
            this.$http({
                method: 'post',
                url: "/api/user/money/Record",
                data: formData
            }).then(({data})=>{
                if(data.status){
                    this.dataList = data.data.rmb.reverse();
                }
            })
        }
    }
</script>

<style lang="less" scoped>
    .content{
        background: #ff87ad;
        padding: 0.45333rem;
        p{
            color: white;
            font-size: 0.42667rem;
            line-height: 1.06667rem;
        }
        h2{
            font-size: 1rem;
            text-align: center;
            line-height: 1.5rem;
            color: yellow;
            &.high{
                color: green;
            }
            &.low{
                color: red;
            }
        }
    }
    .record{
        h2{
            color: green;
            text-align: center;
            font-size: 0.6rem;
            line-height: 1.2rem;
            background: rgb(240,240,240);
        }
        ul{
            position: absolute;
            top: 5.7592rem;
            left: 0;
            bottom: 0;
            width: 100%;
            padding: 0 0.8rem 0.6rem;
            box-sizing: border-box;
            overflow: auto;
            background: rgb(240,240,240);
            li{
                display: flex;
                padding: 0 0.45333rem;
                justify-content: space-between;
                font-size: 0.32rem;
                line-height: 0.8rem;
                .time{
                    flex: 1;
                }
                p.add{
                    color: green;
                }
                p.red{
                    color: red;
                }
            }
        }

    }
</style>