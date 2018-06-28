<template>
  <div class="wrap">
    <button @click="add">上传</button>
  </div>
</template>

<script>
  export default {
    name: "manage",
       methods:{
        add(){
            let date = [{name:1,class:"5456"},{name:1,class:"5456"}];
            this.$http.post('/api/goods/addcy',{
                data: date
            }).then(({data}) => {
                console.log(data)
            })

        }
      //     this.$axios.post('/api/goods/add', data,).then(({data}) => {
      //     if (data.status == "0") {
      //         alert(data.msg);
      //         location.reload();
      //     }
      //     if (data.status == "1") {
      //         alert("添加成功!")
      //         location.reload();
      //
      //     }
      // })
      }
  }
</script>

<style lang="less" scoped>

</style>
