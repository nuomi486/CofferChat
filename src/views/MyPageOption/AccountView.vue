<template>
  <div class="account-box">
    <NavBarTav title="个人资料"/>
    <BgBox>
      <van-cell title="头像">
        <div>
          <div class="user-img fr">
            <img class="auto_img" :src="accountInfo.userImg" alt="">
            <van-uploader class="upload-box" :after-read="uploadUserImg" />
          </div>
        </div>
      </van-cell>
      <van-cell title="用户id" :center="true" :value="accountInfo.userId" />
      <van-cell title="手机号" :center="true" :value="accountInfo.phone" />
      <van-cell title="用户名" :center="true" :value="accountInfo.phone">
        <van-field
          v-model="accountInfo.nickName"
          class="fielb-box"
          maxlength="12"
          placeholder="输入用户名"
          input-align="right"
          type="textarea"
          @change="upUserName"
        />
      </van-cell>
      <div class="desc-box">
        <div class="desc-content">
          <van-field
            v-model="accountInfo.desc"
            rows="2"
            autosize
            label="简介"
            type="textarea"
            maxlength="30"
            show-word-limit
            input-align="right"
            placeholder="这个人很懒，没有输入简介"
            @change="upUserDesc"
          ></van-field>
        </div>
      </div>
    </BgBox>
  </div>
</template>

<script>
import NavBarTav from '@/components/NavBarTav.vue';
import BgBox from '@/components/BgBox.vue';
export default {
    name: "AccountView",
    data() {
      return {
        accountInfo:[]
      }
    },
    components: { NavBarTav, BgBox },
    // watch:{
    //   "accountInfo.userImg"(a,b,c){
    //     console.log('a,b,c: ', a,b,c);
    //   }
    // },
    methods: {
      getAccountInfo(){
        // /findAccountInfo
        this.$toast.loading({
                message: '加载中……',
                forbidClick:true,
                duration:0
            });
            this.axios({
                method:'GET',
                url:'/findAccountInfo',
                params:{
                    appkey: this.appkey,
                    tokenString: sessionStorage.getItem("userToken")
                }
            }).then((result) =>{
                this.$toast.clear();
                // console.log(result.data);
                if(result.data.code == "B001"){
                  this.accountInfo = result.data.result[0]
                }
            },
            error => {
                console.log(error);
            })
      },
      uploadUserImg(file){
        let type = ['gif','jpeg','jpg','png'];

        let size = 1;

        let fileType = file.file.type.split("/")[1]
        // console.log('fileType: ', fileType);
        if(type.indexOf(fileType) == -1) this.$toast(`文件类型只支持${type.jon(",")}`);
        const fileSize = file.file.size / (1024*1024)
        // console.log(fileSize);
        if( fileSize > size) this.$toast(`文件允许最大不能超过${size}MB`);
        // 处理bese64的标记data： image/jpeg;base64
        let base64 = file.content.replace(/^data:image\/[A-Za-z]+;base64,/, '')
        // console.log(base64);
        const tokenString = sessionStorage.getItem("userToken")
        if(!tokenString){
            this.$toast("请先登录")
            this.$router.push({name:'Login'})
        }
        this.$toast.loading({
            message: '上传中……',
            forbidClick:true,
            duration:0
        });
        this.axios({
            method:'POST',
            url:'/updateAvatar',
            data:{
                appkey: this.appkey,
                tokenString,
                imgType: fileType,
                serverBase64Img: base64
            }
        }).then((result) =>{
            this.$toast.clear();
            // console.log(result.data);
            if(result.data.code == "I001"){
              this.userIofo.userBg = result.data.userBg;
            }else if(result.data.code == 700){
                this.$router.push({name:"Home"})
            }
            this.getAccountInfo()
        },
        error => {
            console.log(error);
        })
      },
      upUserName(){
        // console.log(this.accountInfo.nickName);
        this.axios({
          method: "POST",
          url: "/updateNickName",
          data:{
            appkey: this.appkey,
            tokenString: sessionStorage.getItem("userToken"),
            nickName:this.accountInfo.nickName
          }
        }).then(
          (result) => {
            this.$toast.clear();
            // console.log(result.data);
            if (result.data.code == "C001") {
              this.$toast(result.data.msg)
            }
          },
          (error) => {
            console.log(error);
          }
        );
      },
      upUserDesc(){
        // console.log(this.accountInfo.desc);
        this.axios({
          method: "POST",
          url: "/updateDesc",
          data:{
            appkey: this.appkey,
            tokenString: sessionStorage.getItem("userToken"),
            desc:this.accountInfo.desc
          }
        }).then(
          (result) => {
            this.$toast.clear();
            // console.log(result.data);
            if (result.data.code == "D001") {
              this.$toast(result.data.msg)
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
    beforeMount(){
      this.getAccountInfo();
    }
}
</script>

<style lang="less" scoped>
  .account-box{
    padding-top: 46px;
    /deep/ .van-nav-bar .van-icon{
      color: #1A73E8;
    }
    /deep/ .van-nav-bar__text{
      color: #1A73E8;
    }
    /deep/ .van-cell{
      padding: 0;
      height: 44px;
    }

    .user-img{
      width: 34px;
      height: 34px;
      background-color: #ddd;
      border-radius: 50%;
      overflow: hidden;
      position: relative;
    }
    .upload-box{
        opacity: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 8px;
        top: 0;
        background-color: #000;
        .van-uploader__wrapper{
            height: 100%;
        }
        .van-uploader__upload{
            width: 100%;
            height: 100%;
            margin: 0;
        }
      }

      .field-box{
        // line-height: 44px;
        .van-field__control{
          // text-align: right;
          color: #969799;
        }
      }
      .desc-content{
        padding: 10px 0;
        color: #000;
      }
      /deep/ .van-field__control{
          color: #969799;
      }
      
  }
</style>