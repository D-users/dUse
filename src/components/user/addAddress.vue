<template>
    <div>
        <user-header :msg="getMsg"></user-header>
        <div class="address-msg">
            <ul>
                <li>
                    <p>收货人: </p>
                    <input type="text" v-model="receiveName" placeholder="请输入收货人姓名">
                </li>
                <li>
                    <p>手机号: </p>
                    <input type="text" v-model="phoneNum" placeholder="请输入收货人手机号码">
                </li>
                <li>
                    <p>身份证: </p>
                    <input type="text" v-model="idCard" placeholder="请输入收货人身份证号码">
                </li>
                <li>
                    <p v-if="!province && !city && !area">选择地区: </p>
                    <p v-else>{{province}} {{city}} {{area}}</p>
                    <a href="javascript:void(0)" @click="isShow=true"><img src="../../assets/img/user/go-right.png" alt=""></a>
                </li>
                <li>
                    <p>详细地址: </p>
                    <textarea type="text" v-model="detailedAddress" placeholder="请输入详细地址"></textarea>
                </li>
            </ul>
        </div>
        <button :class="getBtnClass" :disabled="isDisabled" @click="setAddress">保存收货地址</button>
        <span class="remove-btn" @click="removeAddr(addressId)" v-if="addressId!=10086">删除</span>
        <div class="mask" v-if="isShow">
            <div class="address-box">
                <span class="close-btn" @click="isShow=false">X</span>
                <h3>选择国家地区</h3>
                <p>已选择</p>
                <div class="tab-box">
                    <div :class="getClass(0)" v-text="getProvince" @click="changeIndex(0)"></div>
                    <div :class="getClass(1)" v-text="getCity" @click="changeIndex(1)"></div>
                    <div :class="getClass(2)" v-text="getArea" @click="changeIndex(2)"></div>
                </div>
                <div class="tab-list">
                    <p v-if="activeIndex == 0">选择省份</p>
                    <p v-else-if="activeIndex == 1">选择城市</p>
                    <p v-else>选择区县</p>
                    <div class="lists">
                        <ul>
                            <li v-for="item in getLists" :class="getListClass(item.name)" @click="chooseSelect(item.name)">{{item.name}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UserHeader from "./common/userHeader"
    import {mapState} from "vuex";
    import citys from "../../../public/js/city"
    export default {
        name: "addAddress",
        components: {
            UserHeader,
        },
        created(){
            this.addressId = this.$route.params.id;
            if(this.addressId != 10086){
                let formData = this.$qs.stringify({
                    userId: this.userId
                });
                this.$http({
                    method: "post",
                    url: "/api/user/address",
                    data: formData
                }).then(({data})=>{
                    let arr = data.data.address;
                    for(let i=0; i<arr.length; i++){
                        if(arr[i].addressId == this.addressId){
                            this.receiveName = arr[i].receiveName;
                            this.phoneNum = arr[i].receivePhoneNumber;
                            this.idCard = arr[i].receiveIdCard;
                            this.province = arr[i].province;
                            this.city = arr[i].city;
                            this.area = arr[i].area;
                            this.detailedAddress = arr[i].DetailedAddress;
                        }
                    }
                })
            }
        },
        data(){
            return {
                dataList: citys.dataList,
                province: "",
                city: "",
                area: "",
                receiveName: "",
                phoneNum: "",
                idCard: "",
                detailedAddress: "",
                isShow: false,
                activeIndex: 0,
                addressId: null
            }
        },
        computed: {
            ...mapState(['userId']),
            getMsg(){
                if(this.addressId!=10086){
                    return "编辑收货地址"
                }else{
                    return "添加收货地址"
                }
            },
            getProvince(){
                if(this.province){
                    return this.province
                }else{
                    return "选择省份"
                }
            },
            getCity(){
                if(this.city){
                    return this.city
                }else{
                    return "选择城市"
                }
            },
            getArea(){
                if(this.area){
                    return this.area
                }else{
                    return "选择区县"
                }
            },
            getLists(){
                var arr = [];
                if(this.activeIndex == 0){
                    for(let i = 0; i< this.dataList.length; i++){
                        arr.push({name: this.dataList[i].name})
                    }
                }else if(this.activeIndex == 1){
                    for(let i = 0; i< this.dataList.length; i++){
                        if(this.province == this.dataList[i].name){
                            let arr1 = this.dataList[i].city;
                            for(let j = 0; j< arr1.length; j++){
                                arr.push({name:arr1[j].name})
                            }
                        }
                    }
                }else{
                    for(let i = 0; i< this.dataList.length; i++){
                        if(this.province == this.dataList[i].name){
                            let arr1 = this.dataList[i].city;
                            for(let j = 0; j< arr1.length; j++){
                                if(this.city == arr1[j].name){
                                    let arr2 = arr1[j].district;
                                    for(let k = 0; k<arr2.length; k++){
                                        arr.push({name: arr2[k].name})
                                    }
                                }
                            }
                        }
                    }
                }
                return arr;
            },
            isDisabled(){
                let isPhone=/^[1][3,4,5,7,8][0-9]{9}$/;
                let isCard = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
                if(this.province && this.city && this.area && this.receiveName && this.phoneNum && this.idCard && this.detailedAddress){
                    if(isPhone.test(this.phoneNum) && isCard.test(this.idCard)){
                        return false
                    }else{
                        return true
                    }
                }else{
                    return true;
                }
            },
            getBtnClass(){
               if(this.isDisabled){
                   return "save-btn off"
               }else{
                   return "save-btn"
               }
            }
        },
        methods: {
            getClass(val){
                if(this.activeIndex == val){
                    return "active tab"
                }else{
                    return "tab"
                }
            },
            getListClass(val){
                if(val == this.province || val == this.city || val == this.area){
                    return "selected";
                }else{
                    return "";
                }
            },
            changeIndex(val){
                this.activeIndex = val;
            },
            removeAddr(val){
                let formData = this.$qs.stringify({
                    userId: this.userId,
                    addressId: val
                });
                this.$http({
                    method: "post",
                    url: "/api/user/addressRemove",
                    data: formData
                }).then(({data})=>{
                    if(data.status){
                        alert("已删除!");
                        window.location.replace("/user/address");
                    }else{
                        alert("删除失败!")
                    }
                })
            },
            chooseSelect(val){
                if(this.activeIndex == 0){
                    this.province = val;
                    this.activeIndex = 1;
                }else if(this.activeIndex == 1){
                    this.city = val;
                    this.activeIndex = 2;
                }else{
                    this.area = val;
                    this.isShow = false;
                }
            },
            setAddress(){
                let data = {
                    userId: this.userId,
                    receiveName: this.receiveName,
                    receivePhoneNumber: this.phoneNum,
                    receiveIdCard: this.idCard,
                    province: this.province,
                    city: this.city,
                    area: this.area,
                    DetailedAddress: this.detailedAddress
                };
                if(this.addressId!=10086){
                    data.addressId = this.addressId;
                }
                let formData = this.$qs.stringify(data);
                this.$http({
                    method: 'post',
                    url: "/api/user/addressChange",
                    data: formData
                }).then(({data})=>{
                    if(data.status){
                        if(this.addressId!=10086){
                            alert("修改成功!")
                        }else{
                            alert("添加成功!")
                        }
                    }else{
                        if(this.addressId!=10086){
                            alert("修改失败!")
                        }else{
                            alert("添加失败!")
                        }
                    }
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    .address-msg{
        margin-top: 0.4rem;
        border-top: 1px solid;
        border-bottom: 1px solid;
        li{
            display: flex;
            justify-content: space-between;
            padding: 0.2rem 0;
            width: 90%;
            margin: auto;
            box-sizing: border-box;
            font-size: 0.48rem;
            border-bottom: 1px solid;
            &:last-child{
                border-bottom: none;
            }
            p{
                color: #333;
                padding: 0 0.2rem;
            }
            input{
                flex: 1;
            }
            img{
                height: 0.48rem;
                padding: 0 0.24rem;
            }
            textarea{
                flex: 1;
            }
        }
    }
    .save-btn{
        background-color: #e85281;
        color: #fff;
        font-size: 0.37333rem;
        text-align: center;
        height: 1.12rem;
        line-height: 1.12rem;
        border: none;
        display: block;
        width: 95%;
        margin:auto;
        margin-top: 2rem;
        border-radius: 0.08rem;
        &.off{
            background-color: gray;
        }
    }
    .remove-btn{
        position: absolute;
        top: 0.3rem;
        right: 0.36rem;
        color: red;
    }
    .mask{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        background: rgba(0,0,0,0.5);
        .address-box{
            position: absolute;
            top: 4rem;
            left: 0;
            bottom: 0;
            width: 100%;
            background: white;
            border-top-left-radius: 0.26667rem;
            border-top-right-radius: 0.26667rem;
            .close-btn{
                position: absolute;
                top: 0.2rem;
                right: 0.2rem;
                width: 0.6rem;
                height: 0.6rem;
                text-align: center;
                line-height: 0.6rem;
                font-size: 0.4rem;
                color: #666;
                border: 1px solid #666;
                border-radius: 50%;
            }
            h3{
                line-height: 1rem;
                font-size: 0.48rem;
                text-align: center;
            }
            p{
                text-indent: 2em;
                color: #666;
                font-size: 0.24rem;
            }
            .tab-box{
                display: flex;
                justify-content: space-between;
                line-height: 1rem;
                margin-top: 0.2rem;
                .tab{
                    flex: 1;
                    background: rgb(240,240,240);
                    text-align: center;
                    &.active{
                        color: white;
                        background: #e85281;
                    }
                }
            }
            .tab-list{
                margin-top: 0.2rem;
                p{
                    line-height: 0.6rem;
                }
                .lists{
                    position: absolute;
                    top: 3.4rem;
                    left: 0;
                    bottom: 0;
                    overflow: auto;
                    width: 100%;
                    li{
                        line-height: 0.96rem;
                        font-size: 0.48rem;
                        padding-left: 1rem;
                        &.selected{
                            background: rgb(240,240,240);
                            color: red;
                        }
                    }
                }
            }
        }

    }
</style>