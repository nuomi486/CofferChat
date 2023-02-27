<template>
  <div class="List-box">
    <div class="List-group">
      <div class="list-item">
        <div class="items">
          <van-cell v-for="(item,index) in AddressData" :key="index">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <span class="custom-title">{{item.name}}</span>
              <span class="custom-title">{{item.tel}}</span>
              <van-tag round type="danger" color="#0c34ba" v-if="item.isDefault == 1">默认</van-tag>
            </template>
            <template #label>
              <div class="context">{{item.province}}{{item.city}}{{item.county}}{{item.addressDetail}}</div>
            </template>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon>
              <van-icon class="Ricon" name="edit" size="25" @click="isEdit(item.aid)" />
            </template>
          </van-cell>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddressItem",
  props:["AddressData"],
  methods:{
    isEdit(aid){
        this.$router.push({name:'NewAddress',query:{aid}})
    }
  }
};
</script>

<style lang="less" scoped>
.List-box {
  padding: 12px;
  .List-group {
    margin-bottom: 50px;
    .list-item {
      color: #444444;
      .items {
        color: #444444;
        .custom-title {
          margin-right: 10px;
          font-size: 16px;
          vertical-align: middle;
        }
        .search-icon {
          font-size: 16px;
          line-height: inherit;
        }
        .context {
          color: #444444;
          font-size: 13px;
        }
        .Ricon{
            position: relative;
            top: 10px;
        }
      }
    }
  }
}
.van-cell{
    margin-bottom: 10px;
    border-radius: 10px;
}
</style>