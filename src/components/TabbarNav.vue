<template>
  <van-tabbar v-model="indexName" @change="saveName">
    <van-tabbar-item
      v-for="(item, index) in tabbarData"
      :key="index"
      :name="item.name"
      :icon="item.icon"
      :to="{name:item.name}"
      replace
    >
      <template #icon="porps">
        <img :src="porps.active ? item.activeImg : item.unactiveImg" alt="" />
      </template>
      <span :class="(indexName == item.name) ? 'activeTitle':'activedTitle'">{{ item.title }}</span>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: "TabbarNav",
  data() {
    return {
      tabbarData: [
        {
          title: "首页",
          icon: "home-o",
          name: "Home",
          path: "/main/home",
          activeImg: require("../assets/images/home_active.png"),
          unactiveImg: require("../assets/images/home.png"),
        },
        {
          title: "菜单",
          icon: "menu-o",
          name: "Menu",
          path: "/main/menu",
          activeImg: require("../assets/images/menu_active.png"),
          unactiveImg: require("../assets/images/menu.png"),
        },
        {
          title: "购物袋",
          icon: "shopbag-o",
          name: "Shopbag",
          path: "/main/shopbag",
          activeImg: require("../assets/images/shopbag_active.png"),
          unactiveImg: require("../assets/images/shopbag.png"),
        },
        {
          title: "我的",
          icon: "My-o",
          name: "My",
          path: "/main/my",
          activeImg: require("../assets/images/my_active.png"),
          unactiveImg: require("../assets/images/my.png"),
        },
      ],
    };
  },
  computed:{
    indexName:{
      get(){
        return this.$store.state.indexName
      },
      set(value){
        // this.SetIndexName(value)
        // console.log("value",value);
      }
    }
  },
  methods:{
    saveName(active){
      // console.log(active);
      // if(active == "My"){
      //   if(sessionStorage.getItem("userToken") != null){
      //     sessionStorage.setItem("indexName",active)
      //     this.SetIndexName(active)
      //   }else{
      //     this.$notify({message:'靓仔，请先点击首页左上角登录后操作'})
      //     return;
      //   }
      // }
      sessionStorage.setItem("indexName",active)
      this.SetIndexName(active)
    },
    ...mapMutations(["SetIndexName"])
  },
  beforeMount(){
    if(sessionStorage.getItem("indexName") != null){
      this.indexName = sessionStorage.getItem("indexName");
      this.$store.commit("SetIndexName",sessionStorage.getItem("indexName"))
    }
  }
};
</script>

<style lang="less" scoped>
.activeTitle {
  color: #0000ff;
}
.activedTitle {
  color: #00adb5;
}
</style>