<template>
    <div class="productClassify">
        <!--导航栏-->
        <div class="box">


            <div class="btns">
                <div :class="Btnindex==index?'btn btn-active':'btn'" v-for="(value,index) in goodsList" :key="index" @click="switchBtn(index)">{{value.className}}</div>
            </div>
            <!--内容页-->
            <div class="con">
                <div class="con-scrollBox">

                    <div class="con-box" >
                        <a href="https://www.baidu.com/"><img :src="goodsCon.img?goodsCon.img:''" alt=""></a>
                        <h2 class="title">{{goodsCon.className}}</h2>
                        <div class="goods-out">


                        <div class="goods" v-for="(value,index) in goodsCon.childern" :key="index">
                            <a href="">
                                <img :src="value.img" alt="" class="goods-img">
                                <div class="goods-name">{{value.className}}</div>
                            </a>



                        </div>
                        </div>


                    </div>

                </div>

            </div>
        </div>

        <!--<p>{{goodsList}}</p>-->

    </div>
</template>

<script>
    export default {
        name: "ProductClassify",
        data() {
            return {
                goodsList: [],
                goodsCon:{},
                Btnindex:0,
                bata:'../../assets/img/ProductClassify/25.jpg'
            }
        },
        methods:{
            switchBtn(i){
              console.log(i)
                this.goodsCon=this.goodsList[i]
                this.Btnindex=i
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
    .productClassify {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        background: blanchedalmond;

    }

    .box {
        position: absolute;
        top: 15px;
        bottom: 25px;
        width: 10rem;
        .btns {
            position: absolute;
            top: 0;
            left: 0;

            width: 2rem;

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
            height: 2.4324324324324325rem;
        }
            h2{
                color: #333;
                padding-top: 0.32432432432432434rem;
                padding-bottom: 0.13513513513513514rem;

            }
            .goods-out{
                width: 100%;

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