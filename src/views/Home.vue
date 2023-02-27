<template>    
  <div class="home">
    <van-nav-bar left-arrow fixed placeholder>
      <template #left>
        <div class="home-nav" @click="isLogin">
          <div class="t1">{{ Greetings }}</div>
          <div class="t2">{{userName}}</div>
        </div>
      </template>
      <template #right>
        <div class="home-search">
          <van-search placeholder="请输入搜索关键词" @focus="goSearchView"/>
        </div>
      </template>
    </van-nav-bar>
    <banner-view :bannerData="bannerData"/>
    <HotChatView/>
  </div>
</template>
<script>
import BannerView from '@/components/BannerView.vue';
import HotChatView from '@/components/HotChatView.vue';
import { mapMutations } from 'vuex';
// 默认导出组件
export default {
  components: { BannerView, HotChatView},
  // 组件名称
  name:"Home",
  data(){
    return{
      // 动态时间
      Greetings: "",
      bannerData:[],
    }
  },
  computed:{
    userName(){
      return sessionStorage.getItem("userName") || "靓仔靓仔"
    }
  },
  methods:{
    getDate(){
      // 获取当前时间
      let hour = new Date().getHours();
      // console.log(hour);
      if (hour < 6) {
        this.Greetings = "嘿，凌晨好！"
      } else if (hour < 9){
        this.Greetings = "嘿，早上好！"
      } else if (hour < 12){
        this.Greetings = "嘿，上午好！"
      } else if (hour < 14){
        this.Greetings = "嘿，中午好！"
      } else if (hour < 18){
        this.Greetings = "嘿，下午好！"
      } else if (hour <= 23){
        this.Greetings = "嘿，晚上好！"
      }
    },
    getBannerData(){
      this.$toast.loading({
        message: '加载中……',
        forbidClick:true,
        duration:0
      });
      this.axios({
        method:'GET',
        url:'/banner',
        params:{
          appkey: this.appkey,
        }
      }).then((result) =>{
        this.$toast.clear();
        // console.log(result.data.result);
        if(result.data.code == 300){
          this.bannerData = result.data.result;
        }
      },
      error => {
        console.log(error);
      })
    },
    isLogin(){
      const tokens = sessionStorage.getItem("userToken")
      if(!tokens){
        this.$notify({ message: '靓仔，您尚未登录',});
        this.$router.push({name:'Login'})
      }else{
        this.$router.push({name:'My'})
        sessionStorage.setItem("indexName",'My')
        this.SetIndexName("My")
      }
      
    },
    ...mapMutations(["SetIndexName"]),
    goSearchView(){
      this.$router.push({name:"Search"})
    }
  },
  // 挂载之前动态获取时间
  beforeMount(){
    this.getDate();
    this.getBannerData();
  },
};
</script>
<style lang="less" scoped>
  .home{
    .home-nav{
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      .t1{
        font-weight: bold;
        display: inline-block;
      }
      .t2{
        width: 11vw;
        font-weight: bold;
        color: blue;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    /deep/ .home-search{
      padding: 0;
      overflow: hidden;
      top: -1px;
    }
    /deep/ .van-nav-bar__right{
      overflow: hidden !important;
    }
  }
  
  
</style>
