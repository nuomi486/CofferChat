<template>
  <div class="search-view">
    <!-- 标题栏(无标题) -->
    <van-nav-bar
        left-text="返回"
        left-arrow 
        @click-left="goback()">
        <!-- 搜索框 -->
        <template #right>
            <div class="home-search">
                <van-search 
                    v-model="keyword"
                    placeholder="请输入搜索关键词"
                    @search="onSearch"
                    autofocus="true"
                />
            </div>
        </template>
    </van-nav-bar>
    <!-- 背景蓝白条 -->
    <BgBox>
        <div class="clearfix">
            <div class="like-item fl"
                v-for="(item,index) in products" :key="index">
                <ProductItem :item="item"></ProductItem>
            </div>
        </div>
    </BgBox>
  </div>
</template>

<script>
import BgBox from '@/components/BgBox.vue';
import ProductItem from '@/components/ProductItem.vue';
export default {
    name: "SearchView",
    data() {
        return {
            keyword: "",
            products:[]
        };
    },
    methods: {
        goback() {
            this.$router.go(-1);
        },
        onSearch() {
            this.$toast.loading({
                message: '加载中……',
                forbidClick:true,
                duration:0
            });
            this.axios({
                method:'GET',
                url:'/search',
                params:{
                    appkey: this.appkey,
                    name: this.keyword
                }
            }).then((result) =>{
                this.$toast.clear();
                // console.log(result.data.result);
                if(result.data.code == "Q001"){
                    // console.log(result.data.result);
                    this.products = result.data.result;
                }else{
                    this.$toast(result.data.msg)
                }
            },
            error => {
                console.log(error);
            })
        },
    },
    components: { BgBox, ProductItem }
}
</script>

<style lang="less" scoped>
    .search-view{
        /deep/ .home-search {
            width: 100%;
        }
        /deep/ .van-nav-bar__right {
            width: 70%;
            overflow: hidden !important;
        }
        
        .like-item{
            width: calc(~"100%/3 -10px + 10px /3");
            margin: 5px;
        }
    }
</style>