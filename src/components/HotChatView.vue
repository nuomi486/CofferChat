<template>
    <div class="HotChat-box clearfix">
        <div class="HotChat-Item fl" v-for="item in HotChatLists" :key="item.id" @click="goDetail(item.pid)">
            <div class="img-box">
                <img :src="item.smallImg" alt="">
                <div class="hot">Hot</div>
            </div>
            <div class="Chat-info">
                <div class="name">{{item.name}}</div>
                <div class="enname">{{item.enname}}</div>
                <div class="price">￥{{item.price}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HotChatView',
    data() {
        return {
            HotChatLists: [],
        }
    },
    methods: {
        getHotChatData() {
            this.$toast.loading({
                message: '加载中……',
                forbidClick: true,
                duration: 0
            });
            this.axios({
                method: 'GET',
                url: '/typeProducts',
                params: {
                    appkey: this.appkey,
                    key: 'isHot',
                    value: 1
                }
            }).then((result) => {
                this.$toast.clear();
                // console.log(result.data.result);
                if (result.data.code == 500) {
                    this.HotChatLists = result.data.result;
                }
            },
                error => {
                    console.log(error);
                })
        },
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
    },
    beforeMount() {
        this.getHotChatData()
    }
}
</script>

<style lang="less" scoped>
.HotChat-box {
    // height: 120vh;
    padding-top: 5px;
    margin-bottom: 12vw;

    // background-color: #ccc;
    .HotChat-Item {
        width: 152.5px !important;
        background-color: #fff;
        padding: 8px;
        margin: 0 10px 10px 9px;
        border-radius: 5px;

        &:nth-child(2) {
            margin-right: 0px;
        }

        .img-box {
            border-radius: 8px;
            overflow: hidden;
            position: relative;

            img {
                width: 150px;
                border-radius: 8px;
            }

            .hot {
                position: absolute;
                top: 0;
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

        .Chat-info {
            margin-top: 10px;
            .name {
                font-size: 18px;
                margin-bottom: 5px;
            }
            .enname {
                color: #999;
                font-size: 12px;
                margin-bottom: 10px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .price {
                color: #00adb5;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }
}

</style>