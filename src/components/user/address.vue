<template>
    <div>
        <user-header msg="管理收货地址"></user-header>
        <div class="addrLists">
            <ul>
                <li v-for="(item,index) in dataList">
                    <span :class="getClass(item.default)" @click="changeDefault(item.addressId,index)"></span>
                    <div>
                        <p class="user-msg">{{item.receiveName}}<span>{{item.receivePhoneNumber}}</span></p>
                        <p>{{item.province}} {{item.city}} {{item.area}} {{item.DetailedAddress}}</p>
                    </div>
                    <router-link :to="{ name: 'EditAddr', params: {id:item.addressId}}" class="edit-btn">编辑</router-link>
                </li>
            </ul>
        </div>
        <router-link :to="{ name: 'EditAddr', params: {id:'10086'}}" class="to-add">添加新地址</router-link>
    </div>
</template>

<script>
    import UserHeader from "./common/userHeader"
    import {mapState} from "vuex";
    export default {
        name: "addr",
        components: {
            UserHeader
        },
        computed: {
            ...mapState(['userId'])
        },
        data(){
            return{
                dataList: []
            }
        },
        created(){
            let formData = this.$qs.stringify({
                userId: this.userId
            });
            this.$http({
                method: "post",
                url: "/api/user/address",
                data: formData
            }).then(({data})=>{
                this.dataList = data.data.address;
            })
        },
        methods: {
            getClass(val){
                if(val){
                    return "selected icon"
                }else{
                    return "icon"
                }
            },
            changeDefault(val,index){
                let formData = this.$qs.stringify({
                    userId: this.userId,
                    addressId: val
                });
                this.$http({
                    method: "post",
                    url: "/api/user/addressDefault",
                    data: formData
                }).then(({data})=>{
                    if(data.status){
                        for(let i=0;i<this.dataList.length;i++){
                            this.$set(this.dataList[i],"default",false)
                        }
                        this.$set(this.dataList[index],"default",true)
                    }
                })
            },
            getHref(val){
                return `/user/newAddress/${val}`;
            }
        }
    }
</script>

<style lang="less" scoped>
    .to-add{
        position: absolute;
        bottom: 0.4rem;
        left: 2.5%;
        background-color: #e85281;
        color: #fff;
        font-size: 0.37333rem;
        text-align: center;
        height: 1.12rem;
        line-height: 1.12rem;
        border: none;
        display: block;
        width: 95%;
        border-radius: 0.08rem;
    }
    .addrLists{
        background: #f4f4f4;
        position: absolute;
        top: 1.09333rem;
        bottom: 0;
        left: 0;
        width: 100%;
        ul{
            position: absolute;
            top: 0;
            bottom: 1.92rem;
            left: 0;
            width: 100%;
            overflow: auto;
            li{
                background: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.2rem 0.32rem;
                .icon{
                    display: flex;
                    width: 0.4rem;
                    height: 0.4rem;
                    border: 1px solid darkgray;
                    border-radius: 50%;
                    margin: 0 0.2rem;
                    margin-right: 0.4rem;
                    position: relative;
                    &.selected{
                        &::after{
                            content: "";
                            display: block;
                            background: red;
                            width: 0.10667rem;
                            height: 0.10667rem;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            margin-top: -0.05333rem;
                            margin-left: -0.05333rem;
                        }
                    }
                }
                div{
                    flex: 1;
                    .user-msg{
                        font-size: 0.4rem;
                        line-height: 0.8rem;
                        span{
                            color: #acacac;
                            font-size: 0.3rem;
                            padding-left: 0.4rem;
                        }
                    }
                }
                .edit-btn{
                    color: #acacac;
                    font-size: 0.24rem;
                    padding: 0.1rem;
                    padding-left: 0.4rem;
                    border-left: 1px solid #acacac;
                    font-weight: 300;
                }
            }
        }
    }
</style>