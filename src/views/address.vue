<template>
    <div>
        <div class="address-title">
            <img src="../assets/img/go.png" alt="">
            <h1>收货地址</h1>
            <a href="javascript:void (0)">添加</a>
        </div>
        <div class="address-info">
            <div>
                <p>收货人：<span>陈独秀</span></p>
                <p>18754134411</p>
            </div>
            <p>上海市松江区-9干路</p>
            <div class="set">
                <!--加上off类名，取消选中-->
                <p @click="isShow=!isShow"><span :class="{off:isShow}"></span>设为默认地址</p>
                <p><span></span>编辑 <span class="del-btn">删除</span></p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "addr",
        data() {
            return {
                isShow:true
            }
        }
    }
</script>

<style lang="less" scoped>
    a{
        text-decoration: none;
    }
    .address-title {
        font-size: 0.426rem;
        border-bottom: 1px solid #e5e5e5;
        position: relative;
        background-color: white;
        h1 {
            text-align: center;
            font-size: 100%;
            font-weight: 400;
            line-height: 1.006rem;
            color: rgb(116, 119, 116);
        }
        a {
            position: absolute;
            right: 0.4rem;
            top: 0.32rem;
            display: block;
            font-size: 0.346rem;
        }
        img {
            position: absolute;
            width: 0.266rem;
            top: 50%;
            margin-top: -0.213rem;
            left: 0.4rem;
        }
    }
    .address-info {
        border-bottom: 1px solid #e5e5e5;
        div:nth-child(1){
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            color: rgb(116,119,116);
            p:nth-child(1) {
                margin-left: 0.4rem;
            }
            p:nth-child(2) {
                margin-right: 0.4rem;
            }
        }
        p {
            margin-left: 0.38rem;
            color: rgb(116,119,116);
        }
        .set {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            color: black;
            p:nth-child(1) {
                margin-left: 0.4rem;
                color: rgb(116,119,116);
                line-height: 0.5rem;
                span {
                    display:inline-block;
                    height: 0.5rem;
                    background: url("../assets/img/cc2.png") no-repeat;
                    width: 0.533rem;
                    background-size: 0.48rem auto;
                    float: left;
                    &.off {
                        display:inline-block;
                        height: 0.5rem;
                        background: url("../assets/img/c1.png") no-repeat;
                        width: 0.533rem;
                        background-size: 0.48rem auto;
                        float: left;
                    }
                }
            }
            p:nth-child(2) {
                margin-right: 0.4rem;
                color: black;
                line-height: 0.5rem;
                .del-btn {
                    margin:0 15px ;
                }
            }
        }
    }
</style>