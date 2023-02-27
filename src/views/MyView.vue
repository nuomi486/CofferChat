<template>
    <div class="My-box">
        <!-- 登录后展示的 -->
        <div class="isLogin-box">
            <div class="my-bg" :style="{backgroundImage: `url(${userIofo.userBg || ''})`}">
                <van-uploader class="upload-box" :after-read="uploadBg" />
            </div>
            <div class="UOp-box">
                <!-- 信息背景页 -->
                <div class="info-box">
                    <!-- 用户信息块 -->
                   <div class="userInfo">
                        <div class="userIcon">
                            <img class="auto_img" :src="userIofo.userImg" alt="">
                        </div>
                        <div class="username">
                            <p>{{userIofo.nickName}}</p>
                            <span>{{userIofo.desc || "暂无个性签名！"}}</span>
                        </div>
                   </div>
                   <!-- 选项块 -->
                   <div class="options">
                        <van-cell v-for="(item,index) in options" :key="index" :title="item.title" is-link @click="goPage(item.name,item.title)"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'MyView',
    data() {
        return {
            userIofo:[],
            options:[
                {
                    title:'个人资料',
                    name:'Account'
                },
                {
                    title:'我的订单',
                    name:'Order'
                },
                {
                    title:'我的收藏',
                    name:'Like'
                },
                {
                    title:'地址管理',
                    name:'Address'
                },
                {
                    title:'安全中心',
                    name:'Secure'
                },
                {
                    title:'我的足迹',
                    name:'Record'
                },
            ]
        }
    },
    methods:{
        getLoginState(){
            // this.$toast.loading({
            //     message: '加载中……',
            //     forbidClick:true,
            //     duration:0
            // });
            this.axios({
                method:'GET',
                url:'/findMy',
                params:{
                    appkey: this.appkey,
                    tokenString: sessionStorage.getItem("userToken")
                }
            }).then((result) =>{
                // this.$toast.clear();
                // console.log(result.data);
                if(result.data.code == "A001"){
                    // console.log(result.data);
                    this.userIofo = result.data.result[0]
                    this.isLoginState = true;
                    sessionStorage.setItem("userName",result.data.result[0].nickName)
                }else{
                    this.$router.push({name:'Login'})
                    this.$notify({ message: result.data.msg});
                }
            },
            error => {
                console.log(error);
            })
        },
        uploadBg(file){
            let type = ['gif','jpeg','jpg','png'];

            let size = 1;

            let fileType = file.file.type.split("/")[1]
            // console.log('fileType: ', fileType);
            if(type.indexOf(fileType) == -1) this.$toast(`文件类型只支持${type.join(",")}`);
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
                url:'/updateUserBg',
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
            },
            error => {
                console.log(error);
            })
        },
        goPage(name,title){
            this.isChild = !this.isChild
            this.$router.push({name,params:{title}})
        }
    },
    beforeMount(){
        this.getLoginState()
    }
}
</script>

<style lang="less" scoped>
    .My-box{
        margin: 0;
        .isLogin-box{
            .UOp-box{
                margin-bottom: 7vw;
                padding: 0 10px;
                .info-box{   
                    background-color: rgba(255, 255, 255,0.8);
                    position: relative;
                    top: -17vw;
                    padding: 20px;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                    .islogin-bg{
                        img{
                            height: 50px;
                        }
                    }
                    .userInfo{
                        display: flex;
                        justify-content: flex-start;
                        margin-bottom: 30px;
                        .userIcon{
                            width: 62px;
                            height: 62px;
                            position: relative;
                            top: 15px;
                            img{
                                height: 60px;
                                border-radius: 50px;
                                border: 3px solid silver ;
                            }
                        }
                        .username{
                            padding: 0 20px;
                            p{
                                font-size: 18px;
                                font-weight: bold;
                                color: blue;
                                margin-bottom: 5px;
                            }
                            span{
                                
                                display: block;
                                color: #646566;
                                font-size: 15px;
                            }
                        }
                    }
                }
            }
            .my-bg{
                height: 180px;
                background-color: #fff;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: cover;
                position: relative;
            }
            .upload-box{
                opacity: 0;
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                /deep/ .van-uploader__wrapper{
                    height: 100%;
                }
                /deep/ .van-uploader__upload{
                    width: 100%;
                    height: 100%;
                    margin: 0;
                }
            }
        }
    }
</style>