<template>
  <div class="NewAddressView">
    <NavBarTav :title="aid ? '编辑地址':'新增地址'" />
    <van-address-edit
      :area-list="areaList"
      show-postal
      :show-delete="!!aid"
      show-set-default
      show-search-result
      :address-info="addressInfo"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      save-button-text="保存地址"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import areaList from '../assets/area'
import NavBarTav from '@/components/NavBarTav.vue';
export default {
    name: "NewAddressView",
    components: { NavBarTav },
    data() {
      return {
        areaList,
        addressInfo: {},
        aid: ''
      }
    },
    methods: {
      onSave(context) {
        const tokenString = sessionStorage.getItem("userToken");
        delete context.country;
        delete context.isRemove;
        //复制传递进来的对象，并插入请求需要的，tokenString，appkey，aid
        let contexts = Object.assign({},context);
        contexts.tokenString = tokenString
        contexts.appkey = this.appkey
        contexts.isDefault = Number(contexts.isDefault)
        // console.log(contexts);
        if(!this.aid){
          this.address(contexts,"/addAddress")
          // console.log(contexts);
        }else{
          this.address(contexts,"/editAddress")
        }
      },
      onDelete() {
        const tokenString = sessionStorage.getItem("userToken");
        this.$toast.loading({
          message: '加载中……',
          forbidClick:true,
          duration:0
        });
        this.axios({
          method:'post',
          url:'/deleteAddress',
          data:{
              appkey: this.appkey,
              tokenString,
              aid:this.aid
          }
        }).then((result) =>{
          this.$toast.clear();
          // console.log(result.data);
          if(result.data.code == 10000){
            this.$toast(result.data.msg)
              setTimeout(() => {
                this.$router.go(-1);
              }, 800);
          }
        },
        error => {
          console.log(error);
        })
      },
      getAddressInfo(){
        const tokenString = sessionStorage.getItem("userToken");
        this.$toast.loading({
          message: '加载中……',
          forbidClick:true,
          duration:0
        });
        this.axios({
          method:'GET',
          url:'/findAddressByAid',
          params:{
              appkey: this.appkey,
              tokenString,
              aid:this.aid
          }
        }).then((result) =>{
          this.$toast.clear();
          if(result.data.code == 40000){
            let data = result.data.result[0]
            data.isDefault = Boolean(data.isDefault)
            // console.log('result.data.result: ', result.data.result);
            this.addressInfo = data
          }
          
        },
        error => {
          console.log(error);
        })
      },
      address(data,url){
        this.axios({
          method:'post',
          url,
          data
        }).then((result) =>{
            this.$toast.clear();
            // this.MyAddress = result.data.result
            // console.log('result.data ', result.data);
            if(result.data.code == 30000 || result.data.code == 9000){
              this.$toast(result.data.msg)
              setTimeout(() => {
                this.$router.go(-1);
              }, 800);
            }
        },
        error => {
            console.log(error);
        })
      }
    },
    mounted(){
      this.aid = this.$route.query.aid
      if(!this.aid){ return; }else{
        this.getAddressInfo()
      }
    }
}
</script>

<style lang="less" scoped>
  /deep/.van-button:nth-child(1){
    border: none;
    background-color: #0c34ba;
  }
</style>