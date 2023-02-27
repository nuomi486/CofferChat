<template>
  <div class="order-list">
    <div class="pro-box">
        <div class="info-box clearfix">
            <h3>订单信息</h3>
            <div class="title fl" v-show="infoTitleLeft">订单编号：{{infoTitleLeft}}</div>
            <div class="re-info fr" v-if="isRight">
                <div v-if="!getReceive" @click="confirmReceive">确认收货</div>
                <div class="clearfix" v-else>
                    <div class="fl">已完成</div>
                    <div class="fl delete" @click="remove">
                        <van-icon name="delete" size="20"/>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="cell-list">
                <!-- 商品信息 -->
                <slot></slot>
            </div>
            <div class="circle">
                <van-divider dashed :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 10px' }"/>
                <div class="fl circle-box circle-left"></div>
                <div class="fr circle-box circle-right"></div>
            </div>
            <div class="bottom-into">
                <!-- <div class="address">{{isAddress}}</div> -->
                <div class="date" v-if="date != ''">{{date}}</div>
                <div class="clearfix bottom-context">
                    <div class="fl counts">共计{{count}}件商品</div>
                    <div class="fr total">合计：￥{{total}}</div>
                </div>
            </div>
        </div>
    </div>   
  </div>
</template>

<script>
export default {
    name:'OrderLists',
    props:{
        infoTitleLeft:{
            type:String,
            // default:"左边标题"
        },
        isRight:{
            type:Boolean,
            default:false
        },
        date:{
            type:String,
            // default:"1970-01-01 00:00:00"
        },
        count:{
            type:Number,
            default:0
        },
        total:{
            type:[Number,String],
            default:0
        },
        isStatus:{
            type:Number
        },
    },
    computed:{
        getReceive(){
            if(this.isStatus == 1){
                return false
            }
            return true
        }
    },
    methods: {
        confirmReceive(){
            this.$dialog.confirm({
                message: '确认该订单已经到手？',
            }) .then(() => {
                // on confirm
                this.$emit('confirm-receive')
            })
            .catch(() => {
                // on cancel
            });
        },
        remove(){
            this.$dialog.confirm({
                message: '正在删除订单，确认是否删除该订单？',
            }) .then(() => {
                // on confirm
                this.$emit('remove')
            })
            .catch(() => {
                // on cancel
            });
        }
    },
    beforeMount() {
        if(this.isState == 2){
            this.isReceive = !this.isReceive
        }
    },
}
</script>

<style lang="less" scoped>
    .order-list{
        padding: 5px 10px;
        .pro-box{
            margin: -20px 0 10px 0;
            // padding: 0 10px;
            background-color: #fff;
            .info-box{
                padding: 0 5px;
                line-height: 15px;
                h3{
                    position: relative;
                    top:8px;
                }
            }
            .circle{
                .circle-box{
                    width: 10px;
                    height: 20px;
                    opacity: 0.2;
                    background-color: #ccc;
                    position: relative;
                    top: -25px;
                }
                .circle-left{
                    border-top-right-radius: 10px;
                    border-bottom-right-radius: 10px;
                }
                .circle-right{
                    border-top-left-radius: 10px;
                    border-bottom-left-radius: 10px;
                }
            }
            .bottom-into{
                padding: 10px;
                .date{
                    margin: 5px 0;
                    font-size: 14px;
                    color: #444444;
                }
                .bottom-context{
                    .counts{
                        color: #666666;
                        font-size: 14px;
                    }
                    .total{
                        color: #E4393C;
                        font-size: 14px;
                        font-weight: 700;
                    }
                }
            }
        }
        
    }
</style>