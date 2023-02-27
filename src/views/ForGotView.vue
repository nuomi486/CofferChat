<template>
  <div class="content">
      <NavBarTav title="忘记密码"/>
       <!-- 大图 -->
      <div class="big-img">
          <img src="../assets/images/home_active.png" alt="">
      </div>
      <!-- 忘记密码 -->
      <van-form @submit="onUpPassword">
          <van-field
              v-model="upPassword.phone"
              name="phone"
              label="手机号"
              placeholder="请输入手机号"
          />
          <van-field
              v-model="upPassword.password"
              :type="upPassword.showEye ? 'text':'password'"
              name="password"
              label="新密码"
              :right-icon="upPassword.showEye ? 'eye-o':'closed-eye'"
              @click-right-icon="toggleShowEye"
              placeholder="请输入密码"
          />
          <van-field
              v-model="upPassword.email"
              name="email"
              label="邮箱"
              placeholder="请输入邮箱"
          />
          <van-field
              v-model="upPassword.validCode"
              name="validCode"
              label="邮箱验证码"
              placeholder="请输入验证码"
          >
          <template #button>
            <van-button size="small" type="primary"
              style="background: rgb(12, 52, 186); border-color: rgb(12, 52, 186);"
              :disabled="isCd"
              @click="sendValidCode"
            >
            <span v-show="isCd">{{time}}s后再</span>
              发送验证码
            </van-button>
          </template>
          </van-field>
          <div class="forgot-pwd fr" @click="goLogin">有账号了?立即登录</div>
          <div style="margin: 16px;">
              <van-button round block type="info" native-type="submit">
                  提交
              </van-button>
          </div>
      </van-form>
    </div>
</template>

<script>
import { validForm } from '@/assets/validForm';
import NavBarTav from '@/components/NavBarTav.vue';

export default {
    name:'ForGotView',
    data() {
      return {
        upPassword:{
          phone:'',
          password:'',
          email:'',
          validCode:'',
          showEye:false
        },
        time:60,
        isCd:false,
        timeOut:''
      }
    },
    components:{
      NavBarTav,
    },
    watch:{
      time(){
        if(this.time == 0){
          this.isCd = !this.isCd
          clearInterval(lists.timer);
        }
      }
    },
    methods: {
      onUpPassword(values){
        const tokenString = sessionStorage.getItem('userToken')
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
          email:{
            value: values.email,
            errorMsg: '邮箱格式不正确',
            reg: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
          },
          validCode:{
            value: values.validCode,
            errorMsg: '验证码不正确',
            reg: /^[0-9]\d{5}$/
          }
        };
        let isPass = validForm.valid(o);
        if(isPass){
          // console.log(isPass);
          if(values.validCode == this.$store.state.emailCode){
            console.log("验证码校验成功！");
            this.$store.commit("SetEmailCode", 0)
            // console.log(values);
            this.axios({
                method:'POST',
                url:'/retrievePassword',
                data:{
                  appkey: this.appkey,
                  phone: values.phone,
                  password: values.password
                }
            }).then((result) =>{
                this.$toast.clear();
                // console.log(result.data);
                this.$toast(result.data.msg)
                if(result.data.code == "L001"){
                    this.$router.go(-1)
                }
        },
        error => {
            console.log(error);
        })
          }
        }
      },
      goLogin(){
        this.$router.push({name:'Login'})
      },
      toggleShowEye(){
            this.upPassword.showEye = !this.upPassword.showEye
      },
      palyTime(){
        this.time--
      },
      sendValidCode(){
        this.axios({
          method:'POST',
          url:'/emailValidCode',
          data:{
            appkey: this.appkey,
            email: this.upPassword.email,
          }
        }).then((result) =>{
          this.$toast.clear();
          console.log(result.data);
          
        },
        error => {
          console.log(error);
        })
        let code = ''
        for(let i = 0; i < 6; i++){
          let c = Math.ceil(Math.random()*9);
          code += c
        }
        this.isCd = true
        this.timeOut = setInterval(() => {
          this.palyTime()
        }, 1000);
        this.$store.commit('SetEmailCode',code)
        this.$notify({ message: '请查收你的验证码：' + code,  type: 'success',duration: 5000,});
      },
    },
    mounted() {
    },
}
</script>

<style lang="less" scoped>
.big-img{
      text-align: center;
      margin: 40px 0;
      img{
          width: 120px;
          height: 120px;
      }
  }
  .forgot-pwd{
    margin: 15px;
  }
</style>