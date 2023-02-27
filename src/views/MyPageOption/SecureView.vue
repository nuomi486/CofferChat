<template>
  <div class="MySecure">
    <NavBarTav title="安全中心"/>
    <BgBox>
        <div class="options">
            <van-cell title="修改密码" is-link @click="show = true" />
            <van-cell title="注销账号" is-link @click="destroyAccount" />
        </div>
        <template #bottomContext>
          <van-button round block type="primary" @click="loginOut">退出登录</van-button>
        </template>
    </BgBox>
    <van-popup
        v-model="show"
        closeable
        round
        position="bottom"
    >
        <h2 class="title">修改密码</h2>
        <div class="inputs">
            <van-form @submit="updatePassword">
                <van-field
                    v-model="event.password"
                    :type="event.showEye ? 'text':'password'"
                    name="oldPassword"
                    label="旧密码"
                    :right-icon="event.showEye ? 'eye-o':'closed-eye'"
                    @click-right-icon="event.showEye = !event.showEye"
                    placeholder="请输入密码"
                />
                <van-field
                    v-model="now.password"
                    :type="now.showEye ? 'text':'password'"
                    name="password"
                    label="新密码"
                    :right-icon="now.showEye ? 'eye-o':'closed-eye'"
                    @click-right-icon="now.showEye = !now.showEye"
                    placeholder="请输入密码"
                />
                <div class="commit">
                    <van-button round block type="primary" native-type="submit">确认修改</van-button>
                </div>
            </van-form>
        </div>
        
    </van-popup>
  </div>
</template>

<script>
import NavBarTav from '@/components/NavBarTav.vue';
import BgBox from '@/components/BgBox.vue';
import { validForm } from '@/assets/validForm';

export default {
    name: "SecureView",
    components: { NavBarTav, BgBox },
    data() {
        return {
            show:false,
            now:{
                password:'',
                showEye: false
            },
            event:{
                password:'',
                showEye: false
            }
        }
    },
    methods: {
        loginOut(){
            this.$toast.loading({
                message: '加载中……',
                forbidClick:true,
                duration:0
            });
            this.axios({
                method:'POST',
                url:'/logout',
                data:{
                    appkey: this.appkey,
                    tokenString: sessionStorage.getItem("userToken")
                }
            }).then((result) =>{
                this.$toast.clear();
                console.log(result.data);
                if(result.data.code == "F001"){
                    // console.log('result.data: ', result.data);
                    sessionStorage.removeItem("userToken")
                    this.$notify({ message: result.data.msg});
                    sessionStorage.setItem("indexName","Home")
                    this.$store.commit("SetIndexName",'Home')
                    this.$router.push({name:'Home'})
                    sessionStorage.removeItem("userName")
                }
            },
            error => {
                console.log(error);
            })
        },
        updatePassword(values){
            const tokenString = sessionStorage.getItem('userToken')
            if(!tokenString){
                this.$router.push({name:'Login'})
            }
            //构造表单验证信息  注册正则
            let o = {
                password: {
                    value: values.password,
                    errorMsg: '密码由数字字母下划线组合(6-16字符)',
                    reg: /^[A-Za-z]\w{5,15}$/
                }
            };
            let isPass = validForm.valid(o)
            if(isPass){
                values.tokenString = tokenString
                values.appkey = this.appkey
                // console.log(values);
                this.axios({
                    method:'POST',
                    url:'/updatePassword',
                    data:{
                        ...values
                    }
                }).then((result) =>{
                    this.$toast.clear();
                    // console.log(result.data);
                    if(result.data.code == "E001"){
                        sessionStorage.removeItem('userToken')
                        this.$toast(result.data.msg)
                        this.$router.push({name:'Login'})
                    }
                },
                error => {
                    console.log(error);
                })
            }
        },
        destroyAccount(){
            this.$dialog.confirm({
                message: '是否确认注销账号，一旦确认注销将无法恢复！',
            }) .then(() => {
                // on confirm
                console.log("啪叽一下，账号就没了！");
                
            })
            .catch(() => {
                // on cancel
            });
        }
    },

}
</script>

<style lang="less" scoped>
.bg-content{
    margin-bottom: 30vw;
}
/deep/ .van-popup--bottom{
    .title{
        font-weight: normal;
        margin-left: 20px;
    }
    .inputs{
        margin: 20px;
        .commit{
            padding-top: 20px;
            margin-top: 20px;
        }
    }
}

</style>