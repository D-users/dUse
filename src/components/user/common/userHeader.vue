<template>
    <div class="header-box">
        <a href="/user"><img src="../../../assets/img/user/go.png" alt=""></a>
        <h2>{{msg}}</h2>
    </div>
</template>

<script>
    export default {
        name: "userHeader",
        props:{
            msg: String
        }
    }
</script>

<style lang="less" scoped>
    @border: 1px solid #e5e5e5;
    .header-box{
        height: 1.06667rem;
        line-height: 1.06667rem;
        text-align: center;
        position: relative;
        border-bottom: @border;
        img{
            position: absolute;
            width: 0.32rem;
            height: 0.53333rem;
            top: 50%;
            left: 0.4rem;
            margin-top: -0.26667rem;
        }
        h2{
            font-size: 0.42667rem;
            font-weight: 400;
            color: #666666;
        }
    }
</style>