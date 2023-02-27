<template>
  <div class="product-item" @click="goDetail(item.pid)">
    <div class="img">
        <img :src="item.smallImg" alt="" class="auto_img">
        <div class="hot" v-show="item.isHot == 1">Hot</div>
    </div>
    <div class="pro-name">{{item.name}}</div>
    <div class="pro-enname">{{item.enname}}</div>
    <div class="bottom">
        <div class="pro-price">￥{{item.price}}</div>
        <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
    name:"ProductItem",
    props:{
        // 配置项写法
        item:{
            type:Object,
            default(){
                return {};
            }
        }
    },
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
    .product-item{
        width: 155px;
        .pro-name{
            margin-top: 10px;
            font-size: 14px;
        }
        .pro-enname{
            width: 120px;
            margin-top: 5px;
            margin-bottom: 10px;
            font-size: 12px;
            font-weight: bold;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

        }
        .pro-price{
            font-size: 14px;
            font-weight: bold;
            color: #00adb5;
        }
        .img{
            height: 150px;
            .hot{
                position: relative;
                top: -155px;
                left: 5px;
                width: 24px;
                height: 24px;
                line-height: 24px;
                text-align: center;
                color: #fff;
                background-color: #00adb5;
                font-size: 12px;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
            }
        }
        .bottom{
            display: flex;
            justify-content: space-between;
        }
    }
</style>