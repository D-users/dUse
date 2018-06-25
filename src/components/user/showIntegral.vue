<template>
    <div>
        <user-header msg="积分查询"></user-header>
        <div class="tab-box">
            <div class="title-box">
                <p>当前积分:</p>
                <h2>{{num}}<a href="/user/recharge">获取积分</a></h2>
            </div>
            <div class="tabs">
                <span v-for="item in navList" :class="getClass(item)" @click="changeActiveNav(item)">{{item}}</span>
            </div>
        </div>
        <ul v-if="isShow && getList.length" class="lists">
            <li v-for="item in getList">
                <p class="time-box">{{item.timer}}</p>
                <p :class="getTextClass(item.userType)" v-text="getText(item.userType,item.amount)"></p>
            </li>
        </ul>
        <div class="no-content" v-else>
            <h3>暂无任何记录</h3>
        </div>
    </div>
</template>

<script>
    import UserHeader from "./common/userHeader"
    import {mapState} from "vuex"
    export default {
        name: "showIntegral",
        components: {
            UserHeader
        },
        data(){
            return {
                num: 0,
                activeNav: "全部记录",
                navList: ["全部记录","消耗","获得"],
                dataList: null,
                isShow: false
            }
        },
        computed: {
            ...mapState(['userId']),
            getList(){
                if(this.activeNav == "全部记录"){
                    return this.dataList;
                }else{
                    let arr = [];
                    if(this.activeNav == "获得"){
                        for(let i=0; i<this.dataList.length; i++){
                            if(this.dataList[i].userType == "recharge"){
                                arr.push(this.dataList[i]);
                            }
                        }
                    }else{
                        for(let i=0; i<this.dataList.length; i++){
                            if(this.dataList[i].userType != "recharge"){
                                arr.push(this.dataList[i]);
                            }
                        }
                    }
                    return arr;
                }
            }
        },
        methods: {
            getClass(item){
                if(this.activeNav == item){
                    return "active";
                }else{
                    return "";
                }
            },
            getTextClass(val){
                if(val == "recharge"){
                    return "add"
                }else{
                    return "red"
                }
            },
            getText(type,num){
                if(type == "recharge"){
                    return `+ ${num}`;
                }else{
                    return `- ${num}`;
                }
            },
            changeActiveNav(item){
                this.activeNav = item;
            }
        },
        created(){
            let formData = this.$qs.stringify({
                userId: this.userId,
            });
            this.$http({
                method: 'post',
                url: "/api/user/han",
                data: formData
            }).then(({data})=>{
                this.num = data.data.han
            })
            this.$http({
                method: 'post',
                url: "/api/user/money/Record",
                data: formData
            }).then(({data})=>{
                console.log(data)
                this.dataList = data.data.han;
                this.isShow = true
            });
        }
    }
</script>

<style lang="less" scoped>
    .tab-box{
        .title-box{
            background-color: #ff87ad;
            color: #FFFFFF;
            padding: 0.26667rem 0.53333rem;
            p{
                font-size: 0.32rem;
            }
            h2{
                font-size: 1.06667rem;
                margin-top: 0.26667rem;
                position: relative;
                a{
                    display: block;
                    color: #FFFFFF;
                    position: absolute;
                    right: 0;
                    bottom: 0.26667rem;
                    font-size: 0.32rem;
                    border: 1px solid #fff;
                    border-radius: 0.08rem;
                    padding: 0.05333rem 0.16rem;
                }
            }
        }
        .tabs{
            padding: 0.26667rem;
            display: flex;
            span{
                flex: 1;
                background-color: white;
                border: 1px solid #e85281;
                color: #e85281;
                text-align: center;
                line-height: 0.8rem;
                &.active{
                    background-color: #e85281;
                    color: white;
                }
                &:first-child{
                    border-bottom-left-radius: 0.13333rem;
                    border-top-left-radius: 0.13333rem;
                }
                &:last-child{
                    border-bottom-right-radius: 0.13333rem;
                    border-top-right-radius: 0.13333rem;
                }
                &:nth-child(2){
                    border-left: none;
                    border-right: none;
                }
            }
        }
    }
    .lists{
        position: absolute;
        top: 5.22667rem;
        bottom: 0;
        left: 0;
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
    .no-content{
        position: absolute;
        top: 5.22667rem;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #f4f4f4;
        h3{
            font-size: 0.8rem;
            margin-top: 1rem;
            text-align: center;
            color: #333;
        }
    }
</style>