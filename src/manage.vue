<template>
    <div class="wrap">
        <div class="container">
            <h1 style="text-align: center;font-size: 40px;padding: 40px 0;color:black;">添加商品页面</h1>
            <div class="selectgoods">
            一级分类：<select name="" @change="updateTwo()" v-model='one'>
            <option v-for="option in goodsArr" :value="option.className">{{option.className}}</option>
        </select>
            二级分类：<select id="sel" name="" v-model="two">
            <option v-for="good in twoArr" :value="good.classId">{{good.className}}</option>
        </select>
                <table style="margin: 0 auto">
                    <tr>
                        <td>商品id：</td>
                        <td><input type="text" class="in"></td>
                    </tr>
                    <tr>
                        <td>商品分类：</td>
                        <td><input type="text" class="in"></td>
                    </tr>
                    <tr>
                        <td>品牌：</td>
                        <td><input type="text" class="in"></td>
                    </tr>
                    <tr>
                        <td>顶部图片：</td>
                        <td><input type="text" class="in"></td>
                    </tr>
                    <tr>
                        <td>详细图片：</td>
                        <td><input type="text" class="in"></td>
                    </tr>
                    <tr>
                        <td>价格：</td>
                        <td><input type="text" class="in"></td>
                    </tr>
                    <tr>
                        <td>韩豆：</td>
                        <td><input type="text" class="in"></td>
                    </tr>
                    <tr>
                        <td>专柜价：</td>
                        <td><input type="text" class="in"></td>
                    </tr>
                    <tr>
                        <td>已售：</td>
                        <td><input type="text" class="in"></td>
                    </tr>
                    <tr>
                        <td>是否为新品：</td>
                        <td>
                            <input type="radio" name="news" style="margin-left: -150px;">是
                            <input type="radio" name="news">否
                        </td>
                    </tr>
                    <tr>
                        <td>温馨提示：</td>
                        <td><input type="text" class="in"></td>
                    </tr>
                    <tr>
                        <td>商品样式：</td>
                        <td>
                            样式：<input type="text">
                            数量：<input type="text">
                        </td>
                    </tr>
                    <tr>
                        <td>用户评论：</td>
                        <td style="width: 300px">
                            星星数量：<input type="text"><br>
                            用户姓名：<input type="text"><br>
                            评价内容：<input type="text"><br>
                            评价时间: <input type="text">
                        </td>
                    </tr>
                </table>
            <input type="button" id="tj" value="提交数据" @click="tj"
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
                twoArr:[]
            }
        },
        created() {
            this.$axios.get("/api/goodslist").then(({data})=> {
                this.goodsArr = data;
                console.log(this.goodsArr);
            }).catch((err)=>{
                console.error(err);
            })
        },
        methods: {
            updateTwo () {
                this.goodsArr.map((value,index)=> {
                    if(value.className==this.one){
                        this.twoArr=value.childern;
                    }
                })
                this.two = this.goodsArr[1].className;
            },
            tj() {
                var data = {
                    one: this.one,
                    two:this.two,
                }
                console.log(data);
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
    .container tr{
        line-height: 40px;
        border-bottom: 1px solid #e5e5e5;
        display: block;
    }
    .container td {
        width: 219px;
    }
    .in {
        width: 400px;
    }
</style>