<template>
    <div class="wrap">
        <div class="container">
            <h1 style="text-align: center;font-size: 40px;padding: 10px 0;color:black;">添加商品页面</h1>
            <div class="selectgoods">
                一级分类：<select name="" @change="updateTwo" v-model='one'>
                <option v-for="option in goodsArr" :value="option.className">{{option.className}}</option>
            </select>
                二级分类：<select name="" v-model="two">
                <option v-for="good in twoArr.childern" :value="good.className">{{good.className}}</option>
            </select>
                <input type="button" id="tj" value="提交数据"
                       style="padding: 15px 20px;color: white;background-color: green;font-size: 16px;border-radius: 5px;display: block;margin: 40px auto;">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "manage",
        data() {
            return {
                one:'彩妆护肤',
                two:'101',
                goodsArr:[],
                twoArr:{}
            }
        },
        created() {
            this.$http.get("/api/goodslist").then(({data})=> {
                this.goodsArr = data;
                console.log(this.goodsArr);
            }).catch((err)=>{
                console.error(err);
            })
        },
        methods: {
            updateTwo () {

                for (var i in this.goodsArr){
                    var obj = this.goodsArr[i];
                    // console.log(obj.className);
                    if(obj.className == this.one){
                         //console.log(obj);
                        this.twoArr = obj;
                          console.log(this.twoArr.childern);
                        break;
                    }
                }
                this.two = this.goodsArr[1].className;

            }
        },
    }
</script>

<style scoped>
    .wrap {
        background: burlywood;
        color: black;
    }

    .container {
        width: 90%;
        margin: 10px auto;
        height: 900px;
        font-size: 16px;
    }
    .selectgoods {
        text-align: center;
        margin: 30px 0;
    }
</style>