 <template>
    <div class="wrap">
        <div class="container">
            <h1 style="text-align: center;font-size: 40px;padding: 0px 0;color:black;">添加商品页面</h1>
            <!--添加的页面-->
            <form method="post" enctype="multipart/form-data" name="form1">
                <div class="selectgoods">
                    一级分类：<select @change="updateTwo()" v-model='one'>
                    <option v-for="option in goodsArr" :value="option.className">{{option.className}}</option>
                </select>
                    二级分类：<select id="sel" name="classId" v-model="two">
                    <option v-for="good in twoArr" :value="good.classId">{{good.className}}</option>
                </select>
                    <table style="margin: 0 auto">
                        <tr>
                            <td>商品分类：</td>
                            <td>{{aaaa}} <br> {{two}}</td>

                        </tr>
                        <tr>
                            <td>商品id：</td>
                            <td><input type="text" class="in" v-model="id"></td>
                        </tr>
                        <tr>
                            <td>品牌</td>
                            <td><input type="text" class="in" v-model="brand"></td>
                        </tr>
                        <tr>
                            <td>标题</td>
                            <td><input type="text" class="in" v-model="title"></td>
                        </tr>
                        <tr>
                            <td>搜索关键字(至少两个)：</td>
                            <td><input v-for="(value,index) in keyword" type="text" class="in" name="keyword"
                                       v-model="keyword[index]">
                            </td>
                            <td style=""><input type="button" value="继续添加" @click="keyword.push('')"></td>
                        </tr>
                        <tr class="titleImg">
                            <td>顶部图片：</td>

                            <td><input type="txet" class="in" v-for="(value,index) in file1" v-model="file1[index]">
                            </td>
                            <td style=""><input type="button" value="继续添加" @click="file1.push('图片在线地址')"></td>
                        </tr>
                        <tr>
                            <td>详细图片：</td>

                            <td><input type="text" class="in" v-for="(value,index) in file2" v-model="file2[index]">
                            </td>
                            <td style=""><input type="button" value="继续添加" @click="file2.push('图片在线地址')"></td>

                        </tr>
                        <tr class="sold">
                            <td>已售多少件：</td>
                            <td><input type="number" class="in" v-model="sold"></td>
                        </tr>
                        <tr class="tips">
                            <td>温馨提示(售后保障)：</td>
                            <td><input type="text" class="in" v-model="tips"></td>
                        </tr>
                        <tr class="goodstyle">
                            <td>商品样式(至少一个)：</td>
                            <td>
                                <div v-for="(value,index) in goodstyle" style="margin-top:10px">

                                    样式：<input type="text" v-model="goodstyle[index].type">
                                    数量：<input type="text" v-model="goodstyle[index].count">
                                    价格：<input type="text" v-model="goodstyle[index].pirce">
                                </div>

                            </td>
                            <td style=""><input type="button" value="继续添加"
                                                @click="goodstyle.push({type:'样式',count:'数量'})"></td>
                        </tr>
                        <tr class="comments">
                            <td>用户评论(至少两个)：</td>

                            <td style="width: 300px" ref="commentsRef">
                                <div style="margin-top:10px" v-for="(value,index) in comments">
                                    星星数量：<input type="text" v-model="comments[index].starCount"><br>
                                    用户姓名：<input type="text" v-model="comments[index].name"><br>
                                    评价内容：<input type="text" v-model="comments[index].con"><br>
                                    评价时间: <input type="text" v-model="comments[index].timer">
                                </div>

                            </td>

                            <td style=""><input type="button" value="继续添加" @click="comments.push('')"></td>
                        </tr>
                    </table>
                    <input type="button" id="tj" value="提交数据" @click="tj"
                           style="padding: 15px 20px;color: white;background-color: green;font-size: 16px;border-radius: 5px;display: block;margin: 40px auto;">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "manage",
        data() {
            return {
                a:'',
                one: '彩妆护肤',
                two: '',
                goodsArr: [],
                twoArr: [],
                title:'',
                id: 1,
                brand: '',
                pirce: '',
                hanPirce:'' ,
                countersPirce: '',
                sold: '',
                tips: '七天无理由退换/正品保障/急速退款',
                file1: ["图片在线地址", "图片在线地址"],
                file2: ["图片在线地址", "图片在线地址", "图片在线地址"],
                keyword: ["", ""],
                goodstyle: [{type: '', count: '',pirce:''},
                    {type: '', count: '',pirce:''}],
                comments: [{
                    starCount: 5,
                    name: '评价用户姓名',
                    con: '内容',
                    timer: '2018-06-15'
                }, {
                    starCount: 5,
                    name: '评价用户姓名',
                    con: '内容',
                    timer: '2018-06-15'
                }]
            }
        },
        created() {
            this.$http.get("/api/goodslist").then(({data}) => {
                this.goodsArr = data;
                //  console.log(this.goodsArr);
            }).catch((err) => {
                console.error(err);
            })
        },
        methods: {
            updateTwo() {

                this.goodsArr.map((value, index) => {
                    if (value.className == this.one) {
                        this.twoArr = value.childern

                    }
                })
                this.two = this.goodsArr[1].className;
            },
            tj() {
                var data = {
                    classId: this.two,
                    id: this.id,
                    brand: this.brand,
                    keyword: this.keyword,
                    titleImg: this.file1,
                    title:this.title,
                    detailImg: this.file2,
                    sold: this.sold,
                    tips: this.tips,
                    goodstyle: this.goodstyle,
                    comments: this.comments
                }
                // console.log(data)
                let formData = this.$qs.stringify(data, {indices: false});
                this.$http.post('/api/goods', formData, {header: {contentType: 'application/json'}}).then(({data}) => {
                    console.log(data)
                    if (data.status == "0") {

                        alert(data.msg)
                    }
                    if (data.status == "1") {

                        alert("添加成功")
                    }
                })


            },
            putimg1(e) {
                var file = e.target.files
                this.file1 = file


                console.log(this.file1.length)
            },
            putimg2(e) {
                var file = e.target.files
                this.file2 = file


                console.log(this.file2.length)
            }

        },
        computed:{

            aaaa(){
                var a=''
                this.twoArr.map((value)=>{

                    if(value.classId==this.two){
                        a=value.className
                    }
                })
                return a
            }
        }
    }
</script>

<style lang="less" scoped>
    .wrap {

        color: black;
    }

    .container {
        width: 90%;
        margin: 10px auto;
        height: 900px;
        font-size: 16px;
    }

    .selectgoods {
       // border: 1px solid red;

        text-align: center;
        margin: 30px 0;
    }

    .container tr {
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