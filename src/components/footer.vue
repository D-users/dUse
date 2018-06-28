<template>
        <div class="footer">
            <div class="tab-item">
                <a href="/">
                    <div><img src="../assets/img/index.png" alt=""></div>
                    <p>首页</p>
                </a>
            </div>
            <div class="tab-item">
                <a href="/Product/ProductClassify">
                    <div><img src="../assets/img/list.png" alt=""></div>
                    <p>分类</p>
                </a>
            </div>
            <div class="tab-item">
                <a :href="getHref">
                    <div><img src="../assets/img/cart.png" alt=""></div>
                    <p>购物车</p>
                </a>
            </div>
            <div class="tab-item">
                <a href="/user">
                    <div><img src="../assets/img/home.png" alt=""></div>
                    <p>个人中心</p>
                </a>
            </div>
        </div>
</template>

<script>
    import {mapState} from "vuex"
    export default {
        name: "myfooter",
        computed: {
            ...mapState(['userId']),
            getHref(){
                if(this.userId){
                    return "/cart";
                }else{
                    return "/user/login";
                }
            }
        },
    }
</script>

<style scoped lang="less">
    a {
        text-decoration: none;
    }
    .footer {
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 100;
        border-top: 1px solid rgba(7, 17, 27, 0.1);
        background: white;
        .tab-item {
            flex: 1;
            padding: 0.133rem 0 0;
            a {
                display: block;
                text-align: center;
                p {
                    color: #666;
                    font-size: 0.32rem;
                    line-height: 1.8;
                }
                img {
                    width: 0.533rem;
                    height: 0.533rem;
                }
                &.router-link-active {
                    p {
                        color: rgb(240, 20, 20);
                    }
                }
            }
        }
    }
</style>