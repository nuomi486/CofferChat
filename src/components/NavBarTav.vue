<template>
  <van-nav-bar
    :title="title"
    left-text="返回"
    left-arrow
    fixed
    placeholder
    @click-left="onClickLeft"
  />
</template>

<script>
export default {
    name:'NvaBarTav',
    props:["title"],
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        }
    }
};
</script>

<style lang="less" scoped>
</style>