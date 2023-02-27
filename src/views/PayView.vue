<template>
    <div class="PayView-box">
        <NavBarTav title="订单详情"/>
        <div class="AddressInfo-box" @click="show = !show">
            <div class="title">
                <h3>选择地址</h3>
                <van-icon name="arrow" size="15" />
            </div>
            <div class="address">
                <van-cell>
                    <!-- 使用 title 插槽来自定义标题 -->
                    <template #title>
                        <span class="name">{{addressData.name}}</span>
                        <span class="phon">{{addressData.tel}}</span>
                        <van-tag round color="blue" type="danger" v-show="addressData.isDefault">默认</van-tag>
                    </template>
                    <template #label>
                        <span>{{addressData.province}}{{addressData.city}}{{addressData.county}}{{addressData.addressDetail}}</span>
                    </template>
                </van-cell>
            </div>
        </div>
        <br><br>
        <div class="ShoppInfo-box">
            <OrderLists v-if="orderPayData.length > 0" :count="count" :total="total">
                <OrderItem v-for="(item, index) in orderPayData" :key="index" :item="item" />
            </OrderLists>
        </div>
        <div class="foo">
            <van-button round type="info" block @click="onCommit">立即结算</van-button>
        </div>
        <!-- 弹窗 -->
        <van-popup
            v-model="show"
            round
            closeable
            position="bottom"
        >
            <h2>选择地址</h2>
            <div class="list" v-for="(item,index) in addressAllData" :key="index">
                <van-radio-group v-model="isChecked">
                    <van-radio :name="index" @click="isChecked = index">
                        <van-cell class="address">
                            <!-- 使用 title 插槽来自定义标题 -->
                            <template #title>
                                <span class="name">{{item.name}}</span>
                                <span class="phon">{{item.tel}}</span>
                                <van-tag round color="blue" type="danger" v-show="item.isDefault">默认</van-tag>
                            </template>
                            <template #label>
                                <span>{{item.province}}{{item.city}}{{item.county}}{{item.addressDetail}}</span>
                            </template>
                        </van-cell>
                    </van-radio>
                </van-radio-group>
            </div>
            <br><br><br><br><br><br>
            <div class="foo">
                <van-button round type="info" block @click="goPage">添加地址</van-button>
            </div>
        </van-popup>
    </div>
</template>

<script>
import NavBarTav from '@/components/NavBarTav.vue';
import OrderLists from '@/components/OrderLists.vue';
import OrderItem from '@/components/OrderItem.vue';
export default {
    name: "PayView",
    data() {
        return {
            orderPayData:[],
            count: 0,
            total: 0,
            addressAllData:[],
            addressData:{},
            show:false,
            isChecked:0
        };
    },
    components: { NavBarTav, OrderLists, OrderItem },
    computed:{
        sidKeys(){
            return sessionStorage.getItem('sidKeys')
        }
    },
    watch:{
        isChecked(now){
            return this.addressData = this.addressAllData[now]
        }
    },
    methods: {
        getOrderInfo(){
            // console.log(this.sidKeys);
            this.axios({
                method: "GET",
                url: "/commitShopcart",
                params: {
                    appkey: this.appkey,
                    tokenString: sessionStorage.getItem("userToken"),
                    sids: this.sidKeys,
                },
            }).then(
                (result) => {
                    // console.log(result.data);
                    if(result.data.code == 50000){
                        result.data.result.map(v =>{
                            this.count += v.count
                            this.total += v.price * v.count
                        })
                        this.orderPayData = result.data.result
                    }
                },
            ).catch(
                error => console.log(error)
            )
        },
        getAddressInfo(){
            this.axios({
                method: "GET",
                url: "/findAddress",
                params: {
                    appkey: this.appkey,
                    tokenString: sessionStorage.getItem("userToken")
                },
            }).then(
                (result) => {
                    // console.log(result.data);
                    if(result.data.code == 20000){
                        let i = 0
                        result.data.result.map(v => {
                            i+=1
                            if(v.isDefault == 1){
                                this.addressData = v
                                v.isChecked = 0
                            }
                            v.isChecked = (i-1)
                        })
                        // console.log(i);
                        this.addressAllData = result.data.result
                    }
                },
                (error) => {
                    console.log(error);
                });
        },
        onCommit(){
            let address = this.addressData.province + this.addressData.city + this.addressData.county + this.addressData.addressDetail
            this.axios({
                method: "post",
                url: "/pay",
                data: {
                    appkey: this.appkey,
                    tokenString: sessionStorage.getItem("userToken"),
                    sids: this.sidKeys,
                    phone: this.addressData.tel,
                    address,
                    receiver: this.addressData.name
                },
            }).then(
                (result) => {
                    // console.log(result.data);
                    if(result.data.code == 60000){
                        this.$toast(result.data.msg)
                        setTimeout(() => {
                            sessionStorage.removeItem("sidKeys")
                            this.$router.push({name:'Order'})
                        }, 900);
                    }
                },
                (error) => {
                    console.log(error);
                });
        },
        goPage(){
            this.$router.push({name:'NewAddress'})
        }
    },
    beforeMount(){
        if(this.sidKeys === null){
            this.$router.push({name:'Shopbag'})
        }else{
            this.getOrderInfo();
            this.getAddressInfo();
        }
        
    }
}
</script>

<style lang="less" scoped>
    .PayView-box{
        .AddressInfo-box{
            margin: 10px;
            padding: 0 10px;
            background-color: #fff;
            border-radius: 10px;
            
            .title{
                display: flex;
                justify-content: start;

                /deep/ .van-icon-arrow{
                    margin-top: 18px;
                    margin-left: 5px;
                }
            }    
        }
        .ShoppInfo-box{
            margin-top: -10px;
            margin-bottom: 50px;
        }
        .list{
            display: flex;
            justify-content: start;
            padding: 0 10px;
        
        }
        .address{
            /deep/ .van-cell__title{
                span{
                    margin: 0 4px;
                }
            }
        }
        /deep/ .van-popup--bottom{
            h2{
                margin-left: 15px;
            }
        }
        .foo{
            width: 90vw;
            position: fixed;
            left: 5%;
            bottom: 0;
            margin: 5px 0;
        }
    }
</style>