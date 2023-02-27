<template>
  <div class="MyAddress">
    <NavBarTav title="地址管理"/>
    <van-empty description="还没设置地址，请尽快添加地址叭！" v-if="MyAddress.length == 0"/>
    <AddressItem :AddressData="MyAddress" v-else/>
    <div class="foo">
        <van-button round type="info" block @click="goPage">添加地址</van-button>
    </div>
  </div>
</template>

<script>
import NavBarTav from '@/components/NavBarTav.vue';
import AddressItem from '../../components/AddressItem.vue';
export default {
    name: "AddressView",
    components: { NavBarTav, AddressItem },
    data() {
        return {
            MyAddress:[]
        }
    },
    methods: {
        getMyAddress(){
            const tokenString = sessionStorage.getItem("userToken");

            this.$toast.loading({
                message: '加载中……',
                forbidClick:true,
                duration:0
            });
            this.axios({
                method:'GET',
                url:'/findAddress',
                params:{
                    appkey: this.appkey,
                    tokenString
                }
            }).then((result) =>{
                this.$toast.clear();
                this.MyAddress = result.data.result
            },
            error => {
                console.log(error);
            })
        },
        goPage(){
            this.$router.push({name:'NewAddress'})
        }
    },
    beforeMount(){
        this.getMyAddress()
    }
}
</script>

<style lang="less" scoped>
    .MyAddress{
        .foo{
            width: 90vw;
            position: fixed;
            left: 5%;
            bottom: 0;
            margin: 5px 0;
        }
    }    
</style>