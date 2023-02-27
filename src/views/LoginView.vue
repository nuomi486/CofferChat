<template>
  <!-- 未登录展示的 -->
  <div class="login-box">
    <!-- 头部 -->
    <div class="nav">
        <!-- 左边 -->
        <div class="nav-left">
            <img class="logo" src="../assets/images/home_active.png" alt="">
            <span>Luckin coffee</span>
        </div>
        <!-- 右边 -->
        <div class="nav-right" @click="goHome">先逛一逛</div>
    </div>
    <!-- 大图 -->
    <div class="big-img">
        <img src="../assets/images/home_active.png" alt="">
    </div>
    <div class="content">
        <!-- 登录 -->
        <van-form @submit="onLogin">
            <van-field
                v-model="login.phone"
                name="phone"
                label="手机号"
                placeholder="请输入手机号"
            />
            <van-field
                v-model="login.password"
                :type="login.showEye ? 'text':'password'"
                name="password"
                label="密码"
                :right-icon="login.showEye ? 'eye-o':'closed-eye'"
                @click-right-icon="toggleShowEye"
                placeholder="请输入密码"
            />
            <div class="forgot-pwd fr" @click="goForgot">忘记密码?</div>
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                    登录
                </van-button>
            </div>
            <div style="margin: 16px;" class="registerBtn">
                <van-button round block type="info" color="#ffffff" native-type="button" @click="show = !show">
                    注册
                </van-button>
            </div>
        </van-form>
    </div>
    <!-- 默认隐藏的注册popup -->
    <div class="regsiter">
        <van-popup v-model="show" round closeable position="bottom">
            <h1 class="title">注册</h1>
            <!-- 注册表单 -->
            <van-form @submit="onRegsiter">
                <van-field
                    v-model="regsiter.nickName"
                    name="nickName"
                    label="用户名"
                    placeholder="请输入用户名"
                />
                <van-field
                    v-model="regsiter.phone"
                    name="phone"
                    label="手机号"
                    placeholder="请输入手机号"
                />
                <van-field
                    v-model="regsiter.password"
                    :type="regsiter.showEye ? 'text':'password'"
                    name="password"
                    label="密码"
                    :right-icon="regsiter.showEye ? 'eye-o':'closed-eye'"
                    @click-right-icon="regsiter.showEye = !regsiter.showEye"
                    placeholder="请输入密码"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">
                        注册
                    </van-button>
                </div>
            </van-form>
        </van-popup>
    </div>
  </div>
</template>

<script>
import {validForm} from '../assets/validForm'

export default {
    name:'LoginView',
    data() {
        return {
          login:{
                phone:'',
                password:'',
                showEye:false
            },
            regsiter:{
                phone:'',
                password:'',
                nickName:'',
                showEye:false
            },
            show:false,
            isLoginState: false,
        }
    },
    methods:{
       toggleShowEye(){
            this.login.showEye = !this.login.showEye
        },
        goHome(){
          this.$router.push({name:'Home'})
          sessionStorage.setItem('indexName','Home')
        },
        onLogin(values){
            values["appkey"] = this.appkey
            // console.log(values);
            this.$toast.loading({
                message: '登录中……',
                forbidClick:true,
                duration:0
            });

            //构造表单验证信息  注册正则
            let o = {
                phone: {
                    value: values.phone,
                    errorMsg: '手机号格式不正确',
                    reg: /^1[3-9]\d{9}$/
                },
                password: {
                    value: values.password,
                    errorMsg: '密码由数字字母下划线组合(6-16字符)',
                    reg: /^[A-Za-z]\w{5,15}$/
                }
            };

            let isPass = validForm.valid(o);
            if(isPass){
                this.axios({
                    method:'POST',
                    url:'/login',
                    data:{
                        ...values
                    }
                }).then((result) =>{
                    this.$toast.clear();
                    // console.log(result.data);
                    if(result.data.code == 200){
                        sessionStorage.setItem("userToken",result.data.token)
                        this.$router.go(-1)
                    }else{
                        this.$notify({ message: result.data.msg});
                    }
                },
                error => {
                    console.log(error);
                })
            }
            
        },
        onRegsiter(values){
            values["appkey"] = this.appkey
            // console.log(values);
            this.$toast.loading({
                message: '正在注册……',
                forbidClick:true,
                duration:0
            });

            //构造表单验证信息  注册正则
            let o = {
                phone: {
                    value: values.phone,
                    errorMsg: '手机号格式不正确',
                    reg: /^1[3-9]\d{9}$/
                },
                password: {
                    value: values.password,
                    errorMsg: '密码由数字字母下划线组合(6-16字符)',
                    reg: /^[A-Za-z]\w{5,15}$/
                },
                nickName: {
                    value: values.nickName,
                    errorMsg: '昵称由字母数字下划线汉字组合(1-10字符)',
                    reg: /^[\w\u4e00-\u9fa5]{1,10}$/
                },
            };

            let isPass = validForm.valid(o);
            if(isPass){
                this.axios({
                    method:'POST',
                    url:'/register',
                    data:{
                        ...values
                    }
                }).then((result) =>{
                    this.$toast.clear();
                    // console.log(result.data);
                    if(result.data.code == 100){
                        this.login.phone = values.phone
                        this.login.password = values.password
                        this.show = false
                        this.$notify({ message: result.data.msg});
                    }else{
                        this.$notify({ message: result.data.msg});
                    }
                },
                error => {
                    console.log(error);
                })
            }
        },
        goForgot(){
            this.$router.push({name:'Forgot'})
        }
    }
}
</script>

<style lang="less" scoped>
.login-box{
  .nav{
      height: 50px;
      border-bottom: 1px solid #dedede;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 18px;
      .logo{
          height: 35px;
          width: 35px;
      }
      span{
          position: absolute;
          top: 18px;
          color: #7d6566;
          font-weight: 600;
          font-size: 16px;
          margin-left: 10px;
      }

      .nav-right{
          color: blue;
          font-weight: 600;
      }
  }
  .big-img{
      text-align: center;
      margin: 40px 0;
      img{
          width: 120px;
          height: 120px;
      }
  }
  .registerBtn{
      .van-button{
          color: black !important;
          border: 0.02667rem solid gray !important;
      }
  }

  .regsiter{
      .title{
          color: #646566;
          margin-left: 10px;
      }
  }

  .content{
    .forgot-pwd{
        font-size: 14px;
        color: #666666;
        margin: 15px;

    }
    .van-form{
        padding: 0 10px;
    }
  }
}
</style>