<template>
    <div class="search-box">
        <div class="header-box">
            <p class="back-btn" @click="$router.go(-1)">取消</p>
            <div>
                <input type="text" v-model="key">
            </div>
            <p class="go-btn" @click="getDetail">搜索</p>
        </div>
        <div class="his-box">
            <div v-if="his">
                <p class="his"><span>历史记录</span><span class="delete-all" @click="removeHis">清空全部历史记录</span></p>
                <ul>
                    <li v-for="item in his"><router-link :to="{ name: 'detail', params: {key:item}}">{{item}}</router-link></li>
                </ul>
            </div>
            <p class="no-his" v-else>
                暂无任何历史记录
            </p>
        </div>
    </div>
</template>
<script>
import {mapState,mapMutations} from "vuex";
export default {
    name: "search",
    data() {
        return {
            his: null,
            key: ""
        }
    },
    computed: {
        ...mapState(['keys']),
        ...mapMutations(['setKeys','setStorage'])
    },
    created(){
        if(this.keys){
            this.his = this.keys.split(",")
        }
    },
    methods: {
        getDetail(){
            if(this.key){
                this.$store.commit('setKeys',{
                    key: this.key
                });
                window.location.replace("/search/detail/"+this.key);
            }
        },
        removeHis(){
            this.$store.commit('removeItem',{
                keys: "删除"
            })
            this.his = null;
        }
    }
}

</script>

<style lang="less" scoped>
.search-box{
    .header-box{
        height: 1.6rem;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.4rem;
        font-size: 0.4rem;
        .back-btn{
            color: gray;
            margin-right: 0.3rem;
        }
        div{
            flex: 1;
            input{
                width: 100%;
                height: 100%;
                border: 1px solid gray;
                font-size: 0.4rem;
                padding: 0.2rem 0.3rem;
                padding-left: 1rem;
                border-radius: 0.2rem;
                background: url("../../../assets/img/search/search.png") no-repeat;
                background-size: 0.7rem;
                background-position: 0.1rem 0.1rem;
            }
        }
        .go-btn{
            color: red;
            margin-left: 0.3rem;
        }
    }
    .his-box{
        position: absolute;
        top: 1.6rem;
        left: 0;
        bottom: 0;
        background: rgb(240,240,240);
        width: 100%;
        li{
            background: white;
            letter-spacing: 5px;
            font-size: 0.4rem;
            padding: 0.2rem 0.8rem;
        }
        .his{
            font-size: 0.4rem;
            padding: 0.2rem 0.4rem;
            background: white;
            display: flex;
            justify-content: space-between;
            .delete-all{
                color: red;
            }
        }
        .no-his{
            font-size: 0.6rem;
            text-align: center;
            margin-top: 0.6rem;
        }
    }
}
</style>