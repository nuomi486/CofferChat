<template>
  <div class="order-box">
    <NavBarTav title="我的订单"/>
    <BgBox>
        <div class="tab-box">
            <van-tabs v-model="tabIndex" color="#0c34ba" @change="getOrders">
                <van-tab v-for="(item,index) in tabData" :key="index" :title="item" :name="index">
                    
                </van-tab>
            </van-tabs>
        </div>
        <template #bottomContext>
            <div v-if="orders.length > 0">
                <div v-for="(item,index) in orders" :key="index">
                    <OrderLists
                        :info-title-left="item.oid"
                        :date=" item.date | formatDate('yyyy-MM-dd hh:mm:ss') "
                        :count="item.count"
                        :total="item.total"
                        :isStatus="item.status"
                        :isRight="true"
                        @confirm-receive="confirmReceive(item,index)"
                        @remove="removeOrder(item,index)" 
                    >
                        <OrderItem v-for="(value,i) in item.data" :key="i" :item="value"/>
                    </OrderLists>
                </div>
            </div>
            <div v-else>
                <van-empty
                    class="custom-image"
                    image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
                    description="暂时没有订单数据哦！"
                />
            </div>
        </template>


    </BgBox>
  </div>
</template>

<script>
import NavBarTav from '@/components/NavBarTav.vue';
import BgBox from '@/components/BgBox.vue';
import OrderLists from '@/components/OrderLists.vue';
import OrderItem from '@/components/OrderItem.vue';
export default {
    name: "OrderView",
    components: { NavBarTav, BgBox, OrderLists, OrderItem },
    data() {
        return {
            tabIndex:'0',
            tabData:["全部","进行中","已完成"],
            orders:[]
        }
    },
    methods: {
        getOrders(){
            this.$toast.loading({
                message: '加载中……',
                forbidClick:true,
                duration:0
            });
            this.axios({
                method:'GET',
                url:'/findOrder',
                params:{
                    appkey: this.appkey,
                    tokenString: sessionStorage.getItem("userToken"),
                    status: this.tabIndex
                }
            }).then((result) =>{
                this.$toast.clear();
                let orderDatas = []
                result.data.result.map(v => {
                    // 得到数据后再循环判断是否oid相等
                    for(let i = 0; i < orderDatas.length; i++){
                        if(orderDatas[i].oid == v.oid){
                            orderDatas[i].data.push(v)
                            orderDatas[i].count += v.count
                            orderDatas[i].total += v.count * v.price
                            return;
                        }
                    }
                    // 初始化每个条目,再包装
                    let o = {}
                    o.oid = v.oid
                    o.count = v.count
                    o.total = v.count * v.price
                    o.status = v.status
                    o.date = v.createdAt
                    o.data = [v]
                    // 将o赋予orderDatas
                    orderDatas.push(o)
                })
                // console.log(orderDatas);
                this.orders = orderDatas
            },
            error => {
                console.log(error);
            })
        },
        confirmReceive(item,index){
            const tokenString = sessionStorage.getItem("userToken")

            if(!tokenString){
                this.$toast("请先登录");
                return this.$router.push({name:"Login"})
            }
            this.$toast.loading({
                message: '加载中……',
                forbidClick:true,
                duration:0
            });
            this.axios({
                method:'post',
                url:'/receive',
                data:{
                    appkey: this.appkey,
                    tokenString,
                    oid: item.oid
                }
            }).then((result) =>{
                this.$toast.clear();
                // console.log(result.data);
                if(result.data.code == 80000){
                    if(this.tabIndex == 1){
                        this.orders.splice(index,1);
                    }
                    // this.$router.go(0)
                    item.status = 2;
                }
                this.$toast(result.data.msg)
            },
            error => {
                console.log(error);
            })
        },
        removeOrder(item,index){
            const tokenString = sessionStorage.getItem("userToken")

            if(!tokenString){
                this.$toast("请先登录");
                return this.$router.push({name:"Login"})
            }
            this.$toast.loading({
                message: '加载中……',
                forbidClick:true,
                duration:0
            });
            this.axios({
                method:'post',
                url:'/removeOrder',
                data:{
                    appkey: this.appkey,
                    tokenString,
                    oid: item.oid
                }
            }).then((result) =>{
                this.$toast.clear();
                // console.log(result.data);
                if(result.data.code == 90000){
                    this.orders.splice(index,1);
                }
                this.$toast(result.data.msg)
            },
            error => {
                this.$toast.clear();
                console.log(error);
            })
        }
    },
    beforeMount(){
        this.getOrders()
    }
}
</script>
