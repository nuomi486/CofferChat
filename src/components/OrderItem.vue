<template>
  <div class="order-item">
    <div class="cell-item-box">
        <div class="pro-info-box">
            <!-- 商品图片 -->
            <div class="pro-img fl">
                <img :src="item.smallImg || item.small_img" class="auto_img" alt="">
            </div>
           <div class="pro-context">
                 <!-- 商品文字信息 -->
                <div class="pro-info">
                    <div class="pro-info-next">
                        <div class="pro-name">{{item.name}}</div>
                        <div class="pro-rule">{{item.rule}}</div>
                    </div>
                    <div class="pro-enname">{{item.enname}}</div>
                </div>
                <!-- 商品的价格和数量 -->
                <div class="pro-count-box">
                    <div class="pro-price fl">￥{{item.price}}</div>
                    <div class="pro-step-box fr">x{{item.count}}</div>
                </div>
           </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'OrderItem',
    props:{
        item:{
            type:Object,
            default(){
                return {
                    name:'名称',
                    rule:'规格',
                    enname:'英语名',
                    price:0,
                    count:1
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .order-item{
        padding: 10px 10px;
        .cell-item-box{
            height: 70px;
            .pro-info-box{
                .pro-img{
                    img{
                        width: 80px;
                        height: 80px;
                    }
                    margin-right: 10px;
                }
                .pro-info-next{
                    display: flex;
                    justify-content: start;
                    .pro-name{
                        font-size: 14px;
                    }
                    .pro-rule{
                        font-size: 14px;
                        margin-left: 20px;
                    }
                }
                .pro-enname{
                    color: #999999;
                    margin: 3px 0 0;
                }
            }
            .pro-count-box{
                font-size: 14px;
                color: #444444;
                margin: 20px;
                .pro-price{
                    font-weight: bold;
                    color: red;
                }
            }
        }
    }
    
</style>