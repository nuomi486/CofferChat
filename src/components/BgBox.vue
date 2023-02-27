<template>
  <div class="bg-box">
    <div class="bg">
        
    </div>
    <div class="bg-content">
        <slot></slot>
    </div>
    <slot name="bottomContext"></slot>
  </div>
</template>

<script>
export default {
    name:"BgBox"
}
</script>

<style lang="less" scoped>
    .bg-box{
        .bg{
            height: 100px;
            background-color: #0c34ba;
        }
        .bg-content{
            margin: 0 10px;
            padding: 10px;
            position: relative;
            top: -20px;
            background-color: #fff;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
        }
    }
</style>