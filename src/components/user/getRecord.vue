<template>
    <div>
        <user-header :msg="getTitle"></user-header>
        <ul class="detail-box" v-if="isShow">
            <li v-for="item in getList">
                <p class="time-box">{{item.timer}}</p>
                <p :class="getClass" v-text="getText(item.amount)"></p>
            </li>
        </ul>
    </div>
</template>

<script>
    import UserHeader from "./common/userHeader"
    import {mapState} from "vuex";
    export default {
        name: "getRecord",
        components: {
            UserHeader
        },
        created(){
            this.type = this.$route.params.type;
            let formData = this.$qs.stringify({
                userId: this.userId
            });
            this.$http({
                method: 'post',
                url: "/api/user/money/Record",
                data: formData
            }).then(({data})=>{
                this.dataList = data.data.rmb;
                this.isShow = true
            });
        },
        computed: {
            ...mapState(['userId']),
            getTitle(){
                if(this.type == "recharge"){
                    return "充值记录"
                }else{
                    return "提现记录"
                }
            },
            getClass(){
                if(this.type == "recharge"){
                    return "add"
                }else{
                    return "red"
                }
            },
            getList(){
                let arr = [];
                if(this.type == "recharge"){
                    for(let i=0;i<this.dataList.length;i++){
                        if(this.dataList[i].userType == "recharge"){
                            arr.push(this.dataList[i]);
                        }
                    }
                }else{
                    for(let i=0;i<this.dataList.length;i++){
                        if(this.dataList[i].userType != "recharge"){
                            arr.push(this.dataList[i]);
                        }
                    }
                }
                return arr;
            }
        },
        methods: {
            getText(num){
                if(this.type == "recharge"){
                    return `+ ${num}`;
                }else{
                    return `- ${num}`;
                }
            }
        },
        data(){
            return {
                type: "",
                dataList: null,
                isShow: false
            }
        }
    }
</script>

<style lang="less" scoped>
    .detail-box{
        position: absolute;
        top: 1.09333rem;
        left: 0;
        bottom: 0;
        width: 100%;
        background: #f4f4f4;
        overflow: auto;
        li {
            background: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.3rem 0.4rem;
            p{
                line-height: 0.48rem;
                font-size: 0.4rem;
                &.add{
                    color: green;
                }
                &.red{
                    color: red;
                }
            }
        }
    }
</style>