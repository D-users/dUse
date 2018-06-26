<template>
    <div>
        <form method="post" enctype="multipart/form-data" name="form1">
            列表名:<select name="list1" id="list1">
            <option value="" lid=0 id="op2">一级列表名1111</option>
        </select>
            <select name="list2" id="list2">
                <option value="" lid=0 id="op2">二级列表名</option>
            </select>
            <select name="list3" id="list3">
                <option value="" lid=0 id="op3">三级列表名</option>
            </select><br />
            列表ID:<input type="text" name="listId" value="61"/><br />
            商品标题:<input type="text" name="title" /><br />
            商品介绍:<input type="text" name="introduction" /><br />
            原来价格:<input type="text" name="price0" /><br />
            现在价格:<input type="text" name="price1" /><br />
            商品产地:<input type="text" name="source" /><br />
            商品重量:<input type="text" name="weight" /><br />
            商品品牌:<input type="text" name="brand"/><br />
            商品图片:<input type="file" name="file[]" multiple="multiple" /><br />
            <input type="button" value="提交" @click="putInform" />

        </form>
    </div>
</template>

<script>
    let formDate1 = new FormData(document.form1);
    export default {
        name: "goods2"
        ,
        methods:{
            putInform(){
                console.log(formDate1)
                let formData = this.$qs.stringify(formDate1);
                // this.$http.post("/api/goods",formData1).then(({data})=> {
                //     console.log( data);
                // }).catch((err)=>{
                //     console.error(err);
                // })
            }
        }
    }
</script>

<style scoped>

</style>