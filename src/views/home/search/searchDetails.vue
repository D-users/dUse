<template>
    <div>
        <div class="header-box">
            <p class="back-btn" @click="$router.go(-1)">取消</p>
            <div>
                <input type="text" v-model="key">
            </div>
            <p class="go-btn" @click="getDetail">搜索</p>
        </div>
        <div class="navbar">
            <ul>
                <li><a href="javascript: void(0)">综合</a></li>
                <li><a href="javascript: void(0)">销量</a></li>
                <li><a href="javascript: void(0)">价格</a></li>
                <li><a href="javascript: void(0)">筛选</a></li>
            </ul>
        </div>
        <div class="wraper" ref="wrap" v-if="dataList">
            <ul>
                <li class="item" v-for="item in dataList">
                    <a href="">
                        <div class="left"><a :href="getHref(item.classId)"><img :src="item.titleImg[0].url" alt=""></a></div>
                        <div class="right">
                            <ul>
                                <li class="name">{{item.title}}</li>
                                <li class="prices"><em>￥<span>{{getPriceZ(item.style[0].countersPirce)}}</span>{{getPriceX(item.style[0].countersPirce)}}</em></li>
                                <li class="assess">
                                    <span><span>9万</span>条评价</span>
                                    <span>好评率<span>99</span>%</span>
                                </li>
                            </ul>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
        <div class="footer" v-else>没有搜索结果~~~</div>
    </div>
</template>

<script>
    import {mapState,mapMutations} from "vuex";
    import Bscroll from "better-scroll";
    export default {
        name: "searchDetails",
        data () {
            return {
                dataList:null,
                list: [],
                pgSize: 0,
                pgNo:0,
                key: null,
                his: null,
                priceOrder: false, //true价格顺序
                countOrder: false,
                flag: false
            }
        },
        computed: {
            ...mapState(['keys']),
            ...mapMutations(['setKeys','setStorage'])
        },
        created () {
            if(this.keys){
                this.his = this.keys.split(",");
            }
            this.key = this.$route.params.key
            let formData = this.$qs.stringify({
                key: this.$route.params.key
            });
            let arr = [{"className":"眼线","classId":101},{"className":" 眼影 ","classId":102},{"className":"眉笔","classId":103},{"className": " 唇膏 ","classId":104},{"className":"腮红","classId":105},{"className":"卸妆","classId":106},{"className":"洁面","classId":107},{"className":"爽肤水","classId":108},{"className":"乳液水","classId":109},{"className":"乳液面霜","classId":110},{"className":"精华","classId":111},{"className":"眼霜","classId":112},{"className":"防晒","classId":113},{"className":"面膜","classId":114},{"className":"套装","classId":115},{"className":"护发","classId":201},{"className":"沐浴","classId":202},{"className":"洗发","classId":203},{"className":"染发","classId":204},{"className":"牙膏/牙粉","classId":205},{"className":"造型","classId":206},{"className":"牙刷/牙线","classId":207},{"className":"文胸","classId":301},{"className":"内裤","classId":302},{"className":"保暖衣服","classId":303},{"className":"袜子","classId":304},{"className":"瘦腰","classId":305},{"className":"帽子","classId":306},{"className":"眼镜","classId":307},{"className":"围巾","classId":308},{"className":"雨伞","classId":309},{"className":"项链","classId":310},{"className":"饰品","classId":311},{"className":"皮带","classId":312},{"className":"连衣裙","classId":401},{"className":"针织衫","classId":402},{"className":"T恤","classId":403},{"className":"衬衫","classId":404},{"className":"长裤","classId":405},{"className":"睡衣","classId":406},{"className":"个人护理","classId":501},{"className":"小家电","classId":502},{"className":"连衣裙","classId":503},{"className":"厨具","classId":504},{"className":"厨房家电","classId":505},{"className":"家装","classId":506},{"className":"家纺","classId":507},{"className":"数码办公","classId":508},{"className":"日用品","classId":509},{"className":"餐具","classId":510},{"className":"单肩包","classId":601},{"className":"手提包","classId":602},{"className":"双肩包","classId":603},{"className":"公交报","classId":604},{"className":"手拿包","classId":605},{"className":"钱包","classId":606},{"className":"雪地靴","classId":607},{"className":"拖鞋 ","classId":608},{"className":"奶粉","classId":701},{"className":"饼干蛋糕","classId":702},{"className":"糖果巧克力","classId":703},{"className":"休闲食品","classId":704},{"className":"冲调饮料","classId":705},{"className":"粮油香精","classId":706},{"className":"洗护用品","classId":707},{"className":"玩具乐器","classId":708},{"className":"尿裤","classId":709},{"className":"跑步机","classId":801},{"className":"动感单车","classId":802},{"className":"仰卧板","classId":803},{"className":"瑜伽垫","classId":804},{"className":"自行车","classId":805},{"className":"帐篷垫子","classId":806},{"className":"睡袋吊床","classId":807},{"className":"户外用品","classId":808},{"className":"其他工具","classId":809}];
            let k=0;
            for(let i=0;i<arr.length;i++){
                if(arr[i].classId == this.key){
                    this.flag = true;
                    k = i;
                }
            }
            if(this.flag){
                this.$http.get("/api/goods/find2/"+this.key).then(({data})=>{
                    console.log(data);
                    if(data.status){
                        this.list = data.data;
                        this.dataList = data.data;
                        this.key = arr[k].className;
                    }
                });
            }else{
                this.$http({
                    method: 'post',
                    url: "/api/goods/find/x",
                    data: formData
                }).then(({data})=>{
                    if(data.status){
                        this.list = data.data;
                        if(data.data.length){
                            this.dataList = data.data;
                        }else{
                            this.dataList = null;
                        }
                    }
                });
            }
        },
        mounted() {
            if(this.dataList){
                this.menuScroll = new Bscroll(this.$refs.wrap,{
                    click: true
                });
            }
        },
        methods:{
            getDetail(){
                if(typeof this.key != Number){
                    this.$store.commit('setKeys',{
                        key: this.key
                    });
                    window.location.replace("/search/detail/"+this.key);
                }
            },
            getPriceZ(val){
                return Math.floor(val);
            },
            getPriceX(val){
                let i = (val-0)%1;
                if(i == 0){
                    return ".00";
                }else{
                    let j = Math.round(i*10);
                    return "."+j+"0";
                }
            },
            getHref(val){
                return "/goods/"+val;
            }
        }
    }
</script>

<style lang="less" scoped>
    .header-box{
        height: 1.6rem;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.4rem;
        font-size: 0.4rem;
        .back-btn{
            color: gray;
            margin-right: 0.3rem;
        }
        div{
            flex: 1;
            input{
                width: 100%;
                height: 100%;
                border: 1px solid gray;
                font-size: 0.4rem;
                padding: 0.2rem 0.3rem;
                padding-left: 1rem;
                border-radius: 0.2rem;
                background: url("../../../assets/img/search/search.png") no-repeat;
                background-size: 0.7rem;
                background-position: 0.1rem 0.1rem;
            }
        }
        .go-btn{
            color: red;
            margin-left: 0.3rem;
        }
    }
    .top-box {
        height: 7%;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 778;
        background: #f5f5f5;
    }
    .navbar{
        font-size: 0.32rem;
        overflow: auto;
        background-color: #fff;
        margin-top: 0.2rem;
    }
    .navbar>ul{
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        position: relative;
        padding: 10px 5px 10px 15px;
        height: 45px;
        text-align: center;
    }
    .navbar>ul::before {
        content: "";
        position: absolute;
        pointer-events: none;
        background-color: #e5e5e5;
        height: 1px;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
    }
    .navbar>ul li{
        width: 25%;
        font-size: 12px;
        padding-right: 10px;

    }
    .navbar>ul li>a{
        display: block;
        position: relative;
        padding: 0 5px;
        height: 25px;
        line-height: 25px;
        color: #666;
        background-color: #f2f2f7;
        border-radius: 2px;
    }
    .wraper{
        position: absolute;
        top: 3rem;
        left: 0;
        bottom: 0;
        width: 100%;
        background: rgb(240,240,240);
        overflow: hidden;
            li{
                display: flex;
                border: 1px solid gainsboro;
                background: white;
                .left{
                    width: 120px;
                    height: 120px;
                    overflow: hidden;
                    img{
                        width: 100%;
                    }
                }
                .right{
                    min-height: 120px;
                    padding-bottom: 8px;
                    box-sizing: border-box;
                    padding: 0 10px;
                    overflow: hidden;
                    line-height: 1;
                    background: rgba(255,255,255,0);
                    margin-left: 150px;
                    margin-top: -108px;
                    .name{
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        height: 38px;
                        word-break: break-all;
                        margin-top: 8px;
                        color: #333;
                        line-height: 1.36;
                    }
                    .prices{
                        margin-top: 13px;
                        display: inline-block;
                        height: 18px;
                        color: #e93b3d;
                        min-width: 40px;
                        span{
                            font-weight: 400;
                            font-size: 15px;
                        }
                    }
                    .assess{
                        margin-top: 8px;
                    }
                }
            }
    }
    .footer {
        background-color: white;
        text-align: center;
        padding: 0.5333rem 0;
        margin-top: 0.4rem;
        color: rgb(116,119,116);
    }
</style>