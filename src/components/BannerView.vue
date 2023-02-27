<template>
  <div class="banner-conten">
      <van-swipe class="my-swipe" :autoplay="3000" lazy-render>
        <van-swipe-item v-for="item in bannerData" :key="item.pid" @click="goDetail(item.pid)">
          <img class="auto_img" :src="item.bannerImg" alt="" />
        </van-swipe-item>
      </van-swipe>
      <p>
        热卖推荐
      </p>
    </div>
</template>

<script>
    export default {
        name:'BannerView',
        props:['bannerData'],
        methods:{
            goDetail(pid){
              // console.log(pid);
              sessionStorage.setItem('chatPid',pid)
              let ids = sessionStorage.getItem('chatPid')
              this.$router.push({
                  name:'Detail',
                  params:{
                      pid: ids
                  }
              })
            } 
        }
    }
</script>

<style lang="less" scoped>
    .banner-conten{
      width: 95vw;
      height: 83vw;
      margin: 0 auto;
      background-color: #fff;
      p{
        height: 28px;
        line-height: 28px;
        text-align: center;
        align-content: center;
        font-size: 14px;
        color: #fff;
        width: 90px;
        margin-top: 10px;
        background-color: #00adb5;
        border-radius: 0 15px 0 0;
      }
      .my-swipe{
        border-radius: 10px 10px 0 0;
      }
    }
</style>