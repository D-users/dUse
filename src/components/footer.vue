<template>
        <div class="footer">
            <div class="tab-item">
                <a href="/home">
                    <div><img src="http://m.051.com/Content/Images/n_ico_on1.png" alt=""></div>
                    <p>首页</p>
                </a>
            </div>
            <div class="tab-item">
                <a href="/kinds">
                    <div><img src="http://m.051.com/Content/Images/n_ico2.png" alt=""></div>
                    <p>分类</p>
                </a>
            </div>
            <div class="tab-item">
                <a href="/cart">
                    <div><img src="http://m.051.com/Content/Images/n_ico3.png" alt=""></div>
                    <p>购物车</p>
                </a>
            </div>
            <div class="tab-item">
                <a href="/person">
                    <div><img src="http://m.051.com/Content/Images/n_ico4.png" alt=""></div>
                    <p>个人中心</p>
                </a>
            </div>
        </div>
</template>

<script>
    export default {
        name: "myfooter"
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