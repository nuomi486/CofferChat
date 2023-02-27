<template>
  <div class="bag-box">
    <van-nav-bar
      title="购物袋"
      fixed
      placeholder
      @click-right="isEdit = !isEdit"
    >
      <template #right>
        <div style="color: #1a73e8" v-show="bagData.length > 0">
          {{ isEdit ? "完成" : "编辑" }}
        </div>
      </template>
    </van-nav-bar>
    <div class="shoppbag-bg">
      <img class="auto_img" src="../assets/images/shopbag_bg.png" alt="" />
    </div>
    <div class="shoppbag-box" v-if="bagData.length > 0">
      <!-- 信息条目 -->
      <van-swipe-cell v-for="(item, index) in bagData" :key="index">
        <div class="shippList">
          <div class="item">
            <div class="checked-box">
              <van-checkbox v-model="item.checked" />
            </div>
            <div class="img-box">
              <img :src="item.small_img" alt="" />
            </div>
            <div class="info-box">
              <div class="info">
                <div class="name">
                  <div>{{ item.name }}</div>
                  <div>{{ item.rule }}</div>
                </div>
                <div class="enname">{{ item.enname }}</div>
              </div>
              <div class="count">
                <div class="price fl">￥{{ item.price }}</div>
                <van-stepper
                  class="fr"
                  v-model="item.count"
                  theme="round"
                  button-size="22"
                  disable-input
                  @change="onChanges(item.sid, item.count)"
                />
              </div>
            </div>
          </div>
        </div>
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="onDelete(item.sid)"
          />
        </template>
      </van-swipe-cell>

      <!-- 提交操作 -->
      <van-submit-bar
        v-if="!isEdit"
        :price="getprice"
        button-text="提交订单"
        @submit="onSubmit"
      >
        <van-checkbox v-model="isChecked">全选</van-checkbox>
      </van-submit-bar>
      <van-submit-bar v-else button-text="删除商品" @submit="onDelete">
        <van-checkbox v-model="isChecked">全选</van-checkbox>
      </van-submit-bar>
    </div>
    <div v-else>
      <van-empty
        image="https://unpkg.com/@vant/assets/custom-empty-image.png"
        image-size="80"
        description="你的购物袋空空如也"
      >
        <van-button
          round
          type="danger"
          color="#1A73E8"
          @click="goPage"
          class="bottom-button"
          >去逛一逛</van-button
        >
      </van-empty>
    </div>
  </div>
</template>

<script>
import NavBarTav from '@/components/NavBarTav.vue';
export default {
    name: "ShopBagView",
    data() {
        return {
            bagData: [],
            isEdit: false,
            checked: false,
        };
    },
    computed: {
        BagLogin() {
            const tokens = sessionStorage.getItem("userToken");
            if (!tokens) {
                return true;
            }
            return false;
        },
        getprice() {
            let total = 0;
            for (const obj of this.bagData) {
                if (obj.checked) {
                    let price = obj.count * obj.price;
                    // console.log('obj.count * obj.price: ', price);
                    total += price;
                }
            }
            // let a = String(total * 100).split("")
            // console.log(a);
            return total * 100;
        },
        isChecked: {
            get() {
                let isTrue = [];
                for (const obj of this.bagData) {
                    if (obj.checked == true) {
                        isTrue.push(obj.checked);
                    }
                }
                if (isTrue.length == this.bagData.length) {
                    return true;
                }
                else {
                    return false;
                }
            },
            set(value) {
                this.checked = value;
                // console.log(value);
                this.checkAll();
            },
        },
    },
    methods: {
        getBag() {
            this.$toast.loading({
                message: "加载中……",
                forbidClick: true,
                duration: 0,
            });
            this.axios({
                method: "GET",
                url: "/findAllShopcart",
                params: {
                    appkey: this.appkey,
                    tokenString: sessionStorage.getItem("userToken"),
                },
            }).then((result) => {
                this.$toast.clear();
                // console.log(result.data);
                if (result.data.code == 5000) {
                    // this.bagData = result.data.result[0];
                    result.data.result.map((v) => {
                        v.checked = false;
                    });
                    this.bagData = result.data.result;
                }
            }, (error) => {
                console.log(error);
            });
        },
        back() {
            this.$router.go(-1);
        },
        goPage() {
            this.$router.push({ name: "Home" });
            sessionStorage.setItem("indexName", "Home");
            this.$store.commit("SetIndexName", "Home");
        },
        checkAll() {
            for (const obj of this.bagData) {
                obj.checked = this.checked;
            }
        },
        onSubmit() {
            let sidKeys = [];
            this.bagData.forEach(v => {
                if (v.checked == true) {
                    sidKeys.push(v.sid);
                }
            });
            // console.log(sidKeys);
            if (sidKeys.length > 0) {
                sessionStorage.setItem("sidKeys", JSON.stringify(sidKeys));
                this.$router.push({ name: "Pay"});
            }
            else {
                this.$toast("请选择下单的商品！");
            }
        },
        onChanges(sid, num) {
            this.axios({
                method: "POST",
                url: "/modifyShopcartCount",
                data: {
                    appkey: this.appkey,
                    tokenString: sessionStorage.getItem("userToken"),
                    sid,
                    count: num,
                },
            }).then((result) => {
                // console.log(result.data);
                if (result.data.code == 6000 || result.data.code == 6001) {
                    // this.bagData = result.data.result[0];
                    this.$toast(result.data.msg);
                }
            }, (error) => {
                console.log(error);
            });
        },
        onDelete(...sidKeys) {
            // console.log(sidKeys);
            for (const obj of this.bagData) {
                if (obj.checked) {
                    sidKeys.push(obj.sid);
                }
            }
            // console.log(JSON.stringify(sidKeys));
            this.axios({
                method: "POST",
                url: "/removeShopcart",
                data: {
                    appkey: this.appkey,
                    tokenString: sessionStorage.getItem("userToken"),
                    sids: JSON.stringify(sidKeys),
                },
            }).then((result) => {
                // console.log(result.data);
                if (result.data.code == 7000) {
                    // this.bagData = result.data.result[0];
                    this.getBag();
                    this.$toast(result.data.msg);
                }
            }, (error) => {
                console.log(error);
            });
        },
    },
    beforeMount() {
        this.getBag();
    },
    components: { NavBarTav }
};
</script>

<style lang="less" scoped>
.bag-box {
  // background-color: black;
  .shoppbag-box {
    padding: 10px;
    margin-bottom: 80px;
    .shippList {
      background-color: #fff;
      .item {
        display: flex;
        justify-content: start;
        padding: 10px;
        .checked-box {
          margin-top: 30px;
        }
        .img-box > img {
          width: 80px;
          margin: 0 10px;
        }
        .info-box {
          width: 100%;
          .info {
            margin-bottom: 15px;
            .name {
              display: flex;
              justify-content: start;
              margin-bottom: 3px;
              div {
                font-size: 14px;
                color: #444444;
                margin: 0 5px;
              }
              div:nth-child(2) {
                color: #666666;
              }
            }
            .enname {
              color: #999999;
              font-size: 12px;
              margin: 0 5px;
            }
          }
          .count {
            display: flex;
            justify-content: space-between;
            .price {
              color: #e4393c;
              font-size: 14px;
              font-weight: 700;
            }
          }
        }
      }
    }
    /deep/ .van-submit-bar {
      margin-bottom: 45px;
      .van-checkbox {
        position: absolute;
        left: 20px;
      }
    }
  }
  /deep/ .delete-button {
    height: 100%;
  }
  .van-swipe-cell {
    border-radius: 10px;
    margin-bottom: 10px;
  }
}
</style>