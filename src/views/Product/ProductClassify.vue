<template>
    <div class="productClassify">
        <div class="header-box">
            <p class="back-btn" @click="$router.go(-1)">取消</p>
            <div>
                <input type="text" v-model="key">
            </div>
            <p class="go-btn" @click="getDetail">搜索</p>
        </div>
        <!--导航栏-->
        <div class="box">
            <div class="btns" ref="tab">
                <div>
                    <div :class="Btnindex==index?'btn btn-active':'btn'" v-for="(value,index) in goodsList" :key="index" @click="switchBtn(index)">{{value.className}}</div>
                </div>

            </div>
            <!--内容页-->
            <div class="con">
                <div class="con-scrollBox">
                    <div class="con-box" >
                        <a href="https://www.baidu.com/"><img :src="goodsCon.img?goodsCon.img:''" alt=""></a>
                        <h2 class="title">{{goodsCon.className}}</h2>
                        <div class="goods-out" ref="lists">
                            <div class="list-box">
                                <div class="goods" v-for="(value,index) in goodsCon.childern" :key="index">
                                    <a :href="getHref(value.classId)">
                                        <img :src="value.img" alt="" class="goods-img">
                                        <div class="goods-name">{{value.className}}</div>
                                    </a>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>

            </div>
        </div>

        <!--<p>{{goodsList}}</p>-->
        <my-footer></my-footer>
    </div>
</template>

<script>
    import MyFooter from '../../components/footer'
    import BScroll from 'better-scroll'
    export default {
        name: "ProductClassify",
        components: {
            MyFooter
        },
        data() {
            return {
                goodsList: [],
                goodsCon:{},
                Btnindex:0,
                bata:'../../assets/img/ProductClassify/25.jpg',
                key: ""
            }
        },
        mounted(){
            this.leftBox = new BScroll(this.$refs.tab,{
                click: true
            });
            this.rightBox = new BScroll(this.$refs.lists,{
                click: true
            });
        },
        methods:{
            switchBtn(i){
              console.log(i)
                this.goodsCon=this.goodsList[i]
                this.Btnindex=i
            },
            getDetail(){
                if(this.key){
                    this.$store.commit('setKeys',{
                        key: this.key
                    });
                    window.location.replace("/search/detail/"+this.key);
                }
            },
            getHref(val){
                return "/search/detail/"+val;
            }
        },
       filter:{
            img(i){
                console.log(i)
                return i
            }
       }
        ,
        created() {
            this.$http.get("/api/goodsList")
                .then((data) => {

                    if (data.status == 200) {
                        this.goodsList = data.data
                         console.log(this.goodsList);
                       this.goodsCon=this.goodsList[0]

                    }


                })
                .catch((err) => {
                    console.error(err);
                })
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
                background: url("../../assets/img/search/search.png") no-repeat;
                background-size: 0.7rem;
                background-position: 0.1rem 0.1rem;
            }
        }
        .go-btn{
            color: red;
            margin-left: 0.3rem;
        }
    }
    .box {
        position: absolute;
        top: 1.6rem;
        bottom: 1.15rem;
        left: 0;
        width: 100%;
        overflow: hidden;
        .btns {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            width: 2rem;
            overflow: hidden;
            .btn {
                background: #efefef;
                color: #e85281;
                border-right: none;
                width: 100%;
                height: 1.3513513513513513rem;
                text-align: center;
                line-height:1.3513513513513513rem;
            }
            .btn-active{
                 background: #fff;
            }

        }
        .con {
            box-sizing: border-box;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            background: white;
            width: 8rem;
            padding: 10px;
            img{
                width: 100%;
                height: 3rem;
            }
            h2{
                color: #333;
                padding-top: 0.32432432432432434rem;
                padding-bottom: 0.13513513513513514rem;
            }
            .goods-out{
                position: absolute;
                top: 4.4rem;
                bottom: 0;
                left: 0;
                width: 100%;
                overflow: hidden;
                .list-box::after{
                    content: '';
                    clear: both;
                    display: block;
                    overflow: hidden;
                    font-size: 0;
                    height: 0;
                }
                .goods{
                    float: left;
                    width: 33.3%;
                    padding: 10px 0;
                    .goods-img{
                        width: 60px;
                        height: 60px;
                        display: block;
                        margin: 0 auto;
                    }
                    .goods-name{
                        font-size: 12px;
                        color: #999;
                        text-align: center;
                    }
                }
            }
        }
    }
</style>