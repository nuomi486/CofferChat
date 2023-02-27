<template>
    <div class="ChatArrayLists">
        <!-- item盒子 -->
        <div class="item-box" v-for="(item,index) in chatClassData" :key="index" @click="goDetail(item.pid)">
            <!-- 图片 -->
            <div class="icon">
                <img class="auto_img" :src="item.smallImg" alt="">
            </div>
            <!-- 信息 -->
            <div class="info clearfix">
                <div class="info-context fl">
                    <div class="name">{{item.name}}</div>
                    <div class="enname">{{item.enname}}</div>
                </div>
                <div class="price fr">￥{{item.price}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'ChatArrayLists',
    props:['chatClassData'],
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
    .ChatArrayLists{
        padding: 5px 10px;
        // margin-top: 3px;
        margin-bottom: 12vw;
        // background-color: #000;
        .item-box{
            display: flex;
            flex-direction: row;
            margin: 5px;
            background-color: #fff;
            border-radius: 5px;
            .icon{
                margin-left: 5px;
                padding-top: 2px;
                width: 85px;
                height: 66.68px;
                img{
                    border-radius: 5px;
                }
            }
            .info{
                padding: 0 10px;
                width: 100%;
                .name{
                    padding-top: 10px;
                    line-height: 30px;
                    font-size: 18px;
                }
                .enname{
                    width: 178px;
                    color: #999;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: wrap;
                }
                .price{
                    margin: 10px;
                    line-height: 45px;
                    font-size: 15px;
                    font-weight: bold;
                    color: #0934BA
                }
            }
        }
    }
</style>