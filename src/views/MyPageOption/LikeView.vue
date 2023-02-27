<template>
    <div class="MyLike">
        <NavBarTav title="我的收藏"/>
        <BgBox>
            <div class="clearfix">
                <div class="like-item fl"
                    v-for="(item,index) in arrayList" :key="index">
                    <ProductItem :item="item">
                        <van-icon name="delete-o" size="20" @click="onDeleteLike(index)" />
                    </ProductItem>
                </div>
            </div>
        </BgBox>
    </div>
</template>

<script>
import NavBarTav from '@/components/NavBarTav.vue';
import BgBox from '@/components/BgBox.vue';
import ProductItem from '../../components/ProductItem.vue';
export default {
    name: "LikeView",
    components: { NavBarTav, BgBox, ProductItem },
    data() {
        return {
            arrayList:[]
        }
    },
    methods: {
        getMyLike(){
            let tokenString = sessionStorage.getItem('userToken')

            this.$toast.loading({
                message: "加载中……",
                forbidClick: true,
                duration: 0,
            });
            this.axios({
                method: "GET",
                url: "/findAllLike",
                params: {
                    appkey: this.appkey,
                    tokenString
                },
            }).then(
                (result) => {
                this.$toast.clear();
                    // console.log(result.data);
                    this.arrayList = result.data.result
                },
                (error) => {
                    console.log(error);
                }
            );
        },
        onDeleteLike(index){
            let tokenString = sessionStorage.getItem('userToken')

            // console.log(url);
            this.$toast.loading({
                message: "加载中……",
                forbidClick: true,
                duration: 0,
            });
            this.axios({
                method: "post",
                url:'/notlike',
                data: {
                appkey: this.appkey,
                pid: this.arrayList[index].pid,
                tokenString
                },
            }).then(
                (result) => {
                this.$toast.clear();
                // console.log(result.data);
                if(result.data.code == 900){
                    this.$toast("删除收藏成功")
                    this.arrayList.splice(index,1)
                }else{
                    this.$toast(result.data.msg)
                    this.$router.push({name:'Login'})
                }
                },
                (error) => {
                console.log(error);
                }
            );
        }
    },
    beforeMount(){
        this.getMyLike();
    }
}
</script>

<style lang="less" scoped>
.like-item{
    width: calc(~"100%/3 -10px + 10px /3");
    margin: 5px;
}
</style>