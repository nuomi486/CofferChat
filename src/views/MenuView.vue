<template>
  <div class="Menu">
    <div class="search-box">
        <van-search placeholder="请输入搜索关键词" @focus="goSearchView"/>
    </div>
    <!-- 分类选项菜单 -->
    <div class="menuOption-box">
        <div class="menu-options" v-for="(item,index) in typeOptions" :key="index">
            <div class="option-item" @click="optionClick(index)">
                <div class="o-icon">
                    <img class="auto_img" :src="(menuIndex == index) ? item.inActiveIcon:item.activeIcon" alt="">
                </div>
                <div class="o-name" :class="(menuIndex == index) ? 'active':''">
                    {{item.title}}
                </div>
            </div>
        </div>
    </div>
    <!-- 列表组件 -->
    <ChatArrayLists :chatClassData="chatClassData"/>
  </div>
</template>

<script>
import ChatArrayLists from '@/components/ChatArrayLists.vue';
import NavBarTav from '@/components/NavBarTav.vue';
export default {
    name: "MenuView",
    data() {
        return {
            menuIndex: 0,
            typeOptions: [
                {
                    title: "推荐",
                    activeIcon: require("../assets/images/icons_09.gif"),
                    inActiveIcon: require("../assets/images/icons_21.gif")
                },
                {
                    title: "拿铁",
                    activeIcon: require("../assets/images/icons_05.gif"),
                    inActiveIcon: require("../assets/images/icons_19.gif")
                },
                {
                    title: "咖啡",
                    activeIcon: require("../assets/images/icons_03.gif"),
                    inActiveIcon: require("../assets/images/icons_18.gif")
                },
                {
                    title: "瑞纳冰",
                    activeIcon: require("../assets/images/icons_07.gif"),
                    inActiveIcon: require("../assets/images/icons_20.gif")
                },
                {
                    title: "水果茶",
                    activeIcon: require("../assets/images/icons_11.gif"),
                    inActiveIcon: require("../assets/images/icons_22.png")
                },
            ],
            chatClassData: []
        };
    },
    methods: {
        optionClick(index) {
            // console.log('index,title: ', index,title);
            if (this.menuIndex == index)
                return;
            this.menuIndex = index;
            this.getTypeData();
        },
        getTypeData() {
            this.$toast.loading({
                message: "加载中……",
                forbidClick: true,
                duration: 0
            });
            this.axios({
                method: "GET",
                url: "/type",
                params: {
                    appkey: this.appkey,
                }
            }).then((result) => {
                this.$toast.clear();
                if (result.data.code == 400) {
                    let data = result.data.result;
                    data.unshift({
                        type: "isHot",
                        typeDesc: "推荐"
                    });
                    // console.log(data);
                    this.typeOptions.map(obj => {
                        for (let i = 0; i < data.length; i++) {
                            if (obj.title == data[i].typeDesc) {
                                obj.type = data[i].type;
                                break;
                            }
                        }
                    });
                    let type = this.typeOptions[this.menuIndex].type;
                    this.getClassData(type);
                }
            }, error => {
                console.log(error);
            });
        },
        getClassData(type) {
            let params = {
                appkey: this.appkey,
            };
            if (type == "isHot") {
                params.key = type,
                    params.value = 1;
            }
            else {
                params.key = "type",
                    params.value = type;
            }
            // console.log('params: ', params);
            this.axios({
                method: "GET",
                url: "/typeProducts",
                params,
            }).then((result) => {
                this.$toast.clear();
                if (result.data.code == 500) {
                    let data = result.data.result;
                    this.chatClassData = data;
                }
            }, error => {
                console.log(error);
            });
        },
        goSearchView(){
            this.$router.push({name:"Search"})
        }
    },
    beforeMount() {
        this.getTypeData();
    },
    components: { ChatArrayLists, NavBarTav }
}
</script>

<style lang="less" scoped>
    .Menu{
        // padding: 10px;
        .search-box{
            padding: 10px;
            // height: 46px;
            // .van-search{
            //     position: fixed;
            //     top: 5px;
            //     width: 95vw;
            // }
        }
        .menuOption-box{
            // padding: 10px;
            display: flex;
            justify-content: space-around;
            text-align: center;
            .menu-options{
                flex: 1;
                background-color: #fff;
                height: 70px;
                .option-item{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding-top: 10px;
                    .o-icon{
                        width: 34px;
                        height: 34px;
                    }
                    .o-name{
                        color: #252422;
                        font-size: 14px;
                        font-weight: bold;
                        &.active{
                            color: #0a35b9;
                        }
                    }
                }
            }
        }
    }
</style>