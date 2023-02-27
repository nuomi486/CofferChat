<template>
  <div class="ShopInfo-box">
    <NavBarTav title="商品详情">
      <template #right> </template>
    </NavBarTav>
    <div>
      <img class="auto_img" :src="ChatDetail.large_img" />
    </div>
    <div class="Detail-box">
      <div class="info-box">
        <!-- 商品价格和名称 -->
        <div class="priceAndchatName-box clearfix">
          <div class="fl">
            <div class="chatName">{{ ChatDetail.name }}</div>
            <div class="chatEnName">{{ ChatDetail.enname }}</div>
          </div>
          <div class="chatPrice">￥{{ ChatDetail.price }}</div>
        </div>
        <!-- 商品规格 -->
        <div class="rule-box">
          <!-- 温度，糖分，奶油 -->
          <div class="rule-item clearfix" v-for="(item,index) in ChatDetail.rules" :key="index">
            <div class="rule-title fl">{{item.title}}</div>
            <div class="fl">
              <div class="r-item fl" 
              @click="onRule(item,indexs)" 
              :class="{active: item.ruleIndex == indexs, 'large-text':item.title.length >= 4}"
              v-for="(items,indexs) in item.rule" 
              :key="indexs"
              >
                {{items.title}}
              </div>
            </div>
          </div>
        </div>
        <!-- 商品数量 -->
        <div class="c-box clearfix">
          <div class="select-c fl">选择数量</div>
          <div class="counts-box fr">
            <van-stepper v-model="ruleData.count" theme="round" button-size="22" disable-input />
          </div>
        </div>
        <!-- 商品描述 -->
        <div class="desc-box">
          <div class="desc-title">商品描述</div>
          <div class="desc-text">
            <div class="context">
              <div class="text-item" v-for="(item,index) in ChatDetail.desc" :key="index">
                {{index + 1}}、{{item}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部购物操作nav -->
    <van-goods-action>
      <van-goods-action-icon icon="bag" :badge="shoppCounts" @click="goBagPage" text="购物袋" />
      <van-goods-action-icon icon="like" :color="isLike ? '#ff5000':''" @click="onUpLike" text="收藏" />
      <van-goods-action-button type="warning" color="#0934BA" @click="onAddBag(false)" text="加入购物袋" />
      <van-goods-action-button type="danger" color="#00adb5" @click="onAddBag(true)" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import NavBarTav from '@/components/NavBarTav.vue';
export default {
    name: "ShopInfoView",
    data() {
        return {
            // 异步获取的数据体
            ChatDetail: {},
            // 规格数据
            rule: [],
            // 整体数据
            ruleData: {
                pid: "",
                count: 1
            },
            // 商品数量
            shoppCounts: "",
            // 是否被收藏
            isLike: false
        };
    },
    computed: {
        pid() {
            this.ruleData.pid = sessionStorage.getItem("chatPid");
            return this.ruleData.pid;
        },
    },
    watch: {
        rule() {
            // console.log("改变了",now);
            let arr = [];
            this.rule.map(v => {
                arr.push(v, "/");
            });
            arr.pop();
            let rules = "";
            arr.map(v => {
                rules += v;
            });
            this.ruleData.rule = rules;
        },
    },
    methods: {
        getChatDetail() {
            this.$toast.loading({
                message: "加载中……",
                forbidClick: true,
                duration: 0,
            });
            this.axios({
                method: "GET",
                url: "/productDetail",
                params: {
                    appkey: this.appkey,
                    pid: this.pid,
                },
            }).then((result) => {
                this.$toast.clear();
                // console.log(result.data);
                if (result.data.code == 600) {
                   let data = result.data.result[0];
                   data.desc = data.desc.split(/\n/);
                   let rules = [];
                   let ruleData = ['tem','sugar','milk','cream']
                   ruleData.map( obj => {
                    // 初始化对象
                    let r = {}
                    // 给对象设置title值为data的[v+'_desc']
                    r.title = data[obj+'_desc']
                    // 设置默认激活的下标
                    r.ruleIndex = 0;
                    // 每项规格
                    r.rule = []
                    //获取规格字符串
                    let ruleString = data[obj].split('/');
                    ruleString.map( v => {
                      if(v != ''){
                        r.rule.push({title: v})
                      }
                    })
                    if(r.rule.length > 0){
                      rules.push(r)
                    }
                   })
                   data.rules = rules
                   this.ChatDetail = data
                   this.$store.commit('SetRecording',this.pid)
                }
            }, (error) => {
                console.log(error);
            });
        },
        onClickLeft() {
            this.$router.go(-1);
        },
        onRule(val, index) {
          // console.log(val);
            if(val.ruleIndex == index){
              return
            }
            val.ruleIndex = index
        },
        onAddBag(value) {
          let tokenString = sessionStorage.getItem("userToken");

          if(!tokenString){
            this.$toast('请先登录');
            this.$router.push({name:'Login'});
          }

          let data = {
            tokenString,
            appkey: this.appkey,
            count: this.ruleData.count,
            pid: this.ruleData.pid
          }
          let rs = [];
          this.ChatDetail.rules.map(v => {
            rs.push(v.rule[v.ruleIndex].title)
          })
          data.rule = rs.join('/');

          this.$toast.loading({
              message: "加载中……",
              forbidClick: true,
              duration: 0,
          });
          this.axios({
              method: "post",
              url: "/addShopcart",
              data,
          }).then((result) => {
              this.$toast.clear();
              // console.log(result.data);
              if (result.data.code == 3000) {
                  // console.log(result.data);
                  if(!value){
                    if (result.data.status == 1) {
                        this.$toast(result.data.msg);
                        this.shoppCounts ++
                    }else {
                        this.$toast("修改数量成功");
                    }
                  }else{
                    let a = []
                    a.push(result.data.sid)
                    sessionStorage.setItem("sidKeys", JSON.stringify(a));
                    this.$router.push({name:'Pay'})
                  }
                
              }
          }, (error) => {
              console.log(error);
          });
        },
        getShoppCounts() {
            let tokenString = sessionStorage.getItem("userToken");
            this.$toast.loading({
                message: "加载中……",
                forbidClick: true,
                duration: 0,
            });
            this.axios({
                method: "GET",
                url: "/shopcartCount",
                params: {
                    appkey: this.appkey,
                    tokenString
                },
            }).then((result) => {
                this.$toast.clear();
                // console.log(result);
                this.shoppCounts = result.data.result;
            }, (error) => {
                console.log(error);
            });
        },
        goBagPage() {
            this.$router.push({ name: "Shopbag" });
            sessionStorage.setItem("indexName", "Shopbag");
            this.$store.commit("SetIndexName", "Shopbag");
        },
        getLike() {
            let tokenString = sessionStorage.getItem("userToken");
            this.$toast.loading({
                message: "加载中……",
                forbidClick: true,
                duration: 0,
            });
            this.axios({
                method: "GET",
                url: "/findlike",
                params: {
                    appkey: this.appkey,
                    pid: this.ruleData.pid,
                    tokenString
                },
            }).then((result) => {
                this.$toast.clear();
                // console.log(result.data);
                if (result.data.result.length > 0) {
                    this.isLike = !this.isLike;
                }
            }, (error) => {
                console.log(error);
            });
        },
        onUpLike() {
            let tokenString = sessionStorage.getItem("userToken");
            let url = "";
            if (this.isLike) {
                url = "/notlike";
            }
            else {
                url = "/like";
            }
            // console.log(url);
            this.$toast.loading({
                message: "加载中……",
                forbidClick: true,
                duration: 0,
            });
            this.axios({
                method: "post",
                url,
                data: {
                    appkey: this.appkey,
                    pid: this.ruleData.pid,
                    tokenString
                },
            }).then((result) => {
                this.$toast.clear();
                // console.log(result.data);
                if (result.data.code == 800) {
                    this.isLike = true;
                    this.$toast(result.data.msg);
                }
                else if (result.data.code == 900) {
                    this.isLike = false;
                    this.$toast(result.data.msg);
                }
                else {
                    this.$toast(result.data.msg);
                    this.$router.push({ name: "Login" });
                }
            }, (error) => {
                console.log(error);
            });
        }
    },
    beforeMount() {
        this.getChatDetail();
        this.getShoppCounts();
        this.getLike();
    },
    components: { NavBarTav }
};
</script>

<style lang="less" scoped>
.ShopInfo-box {
  /deep/ .van-stepper--round .van--stepper__plus {
    background-color: #0c34ba !important;
  }

  .Detail-box {
    margin-bottom: 7vw;
    padding: 0 10px;

    //   background-color: black;
    .info-box {
      background-color: #fff;
      position: relative;
      top: -25px;
      padding: 20px;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;

      // 奶茶标题样式
      .priceAndchatName-box {
        .chatName {
          color: black;
          font-size: 16px;
          font-weight: bold;
        }

        .chatEnName {
          font-size: 12px;
          margin: 5px 0;
          color: #a699b3;
        }

        .chatPrice {
          color: #00adb5;
          font-size: 18px;
          font-weight: bold;
          text-align: right;
        }
      }

      // 奶茶规格样式
      .rule-box {
        margin-top: 20px;
        border-bottom: 1px solid #e0dde2;

        .rule-item {
          margin-bottom: 15px;

          .rule-title {
            width: 60px;
            color: black;
            font-size: 14px;
            line-height: 26px;
          }

          .r-item {
            width: 70px;
            height: 26px;
            background-color: #eee;
            color: black;
            font-size: 14px;
            text-align: center;
            line-height: 27px;
            background-repeat: 15px;
            border-radius: 15px;
            margin-left: 10px;

            &.active {
              background-color: #00adb5;
              color: #fff;
            }
          }
        }
      }

      // 奶茶数量样式
      .c-box {
        border-bottom: 1px solid #e0dde2;
        margin-top: 20px;
        padding-bottom: 20px;

        .select-c {
          font-size: 15px;
          color: #000;
        }
      }

      // 奶茶介绍样式
      .desc-box {
        margin: 15px 0;

        .desc-title {
          font-size: 15px;
          margin-bottom: 10px;
          color: #000;
        }

        .desc-text {
          .context {
            font-size: 12px;
            text-indent: 2em;
            margin-bottom: 8px;
            white-space: pre-wrap;
          }
        }
      }
    }
  }
}
</style>