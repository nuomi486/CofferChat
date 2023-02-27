"use strict";(self["webpackChunkrx"]=self["webpackChunkrx"]||[]).push([[991],{4713:function(t,e,a){a.d(e,{Z:function(){return l}});var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"bg-box"},[e("div",{staticClass:"bg"}),e("div",{staticClass:"bg-content"},[t._t("default")],2),t._t("bottomContext")],2)},o=[],n={name:"BgBox"},i=n,c=a(3736),r=(0,c.Z)(i,s,o,!1,null,"c5631910",null),l=r.exports},8459:function(t,e,a){a.d(e,{Z:function(){return l}});var s=function(){var t=this,e=t._self._c;return e("van-nav-bar",{attrs:{title:t.title,"left-text":"返回","left-arrow":"",fixed:"",placeholder:""},on:{"click-left":t.onClickLeft}})},o=[],n={name:"NvaBarTav",props:["title"],methods:{onClickLeft(){this.$router.go(-1)}}},i=n,c=a(3736),r=(0,c.Z)(i,s,o,!1,null,"1181aa63",null),l=r.exports},1991:function(t,e,a){a.r(e),a.d(e,{default:function(){return d}});var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"account-box"},[e("NavBarTav",{attrs:{title:"个人资料"}}),e("BgBox",[e("van-cell",{attrs:{title:"头像"}},[e("div",[e("div",{staticClass:"user-img fr"},[e("img",{staticClass:"auto_img",attrs:{src:t.accountInfo.userImg,alt:""}}),e("van-uploader",{staticClass:"upload-box",attrs:{"after-read":t.uploadUserImg}})],1)])]),e("van-cell",{attrs:{title:"用户id",center:!0,value:t.accountInfo.userId}}),e("van-cell",{attrs:{title:"手机号",center:!0,value:t.accountInfo.phone}}),e("van-cell",{attrs:{title:"用户名",center:!0,value:t.accountInfo.phone}},[e("van-field",{staticClass:"fielb-box",attrs:{maxlength:"12",placeholder:"输入用户名","input-align":"right",type:"textarea"},on:{change:t.upUserName},model:{value:t.accountInfo.nickName,callback:function(e){t.$set(t.accountInfo,"nickName",e)},expression:"accountInfo.nickName"}})],1),e("div",{staticClass:"desc-box"},[e("div",{staticClass:"desc-content"},[e("van-field",{attrs:{rows:"2",autosize:"",label:"简介",type:"textarea",maxlength:"30","show-word-limit":"","input-align":"right",placeholder:"这个人很懒，没有输入简介"},on:{change:t.upUserDesc},model:{value:t.accountInfo.desc,callback:function(e){t.$set(t.accountInfo,"desc",e)},expression:"accountInfo.desc"}})],1)])],1)],1)},o=[],n=a(8459),i=a(4713),c={name:"AccountView",data(){return{accountInfo:[]}},components:{NavBarTav:n.Z,BgBox:i.Z},methods:{getAccountInfo(){this.$toast.loading({message:"加载中……",forbidClick:!0,duration:0}),this.axios({method:"GET",url:"/findAccountInfo",params:{appkey:this.appkey,tokenString:sessionStorage.getItem("userToken")}}).then((t=>{this.$toast.clear(),"B001"==t.data.code&&(this.accountInfo=t.data.result[0])}),(t=>{console.log(t)}))},uploadUserImg(t){let e=["gif","jpeg","jpg","png"],a=1,s=t.file.type.split("/")[1];-1==e.indexOf(s)&&this.$toast(`文件类型只支持${e.jon(",")}`);const o=t.file.size/1048576;o>a&&this.$toast(`文件允许最大不能超过${a}MB`);let n=t.content.replace(/^data:image\/[A-Za-z]+;base64,/,"");const i=sessionStorage.getItem("userToken");i||(this.$toast("请先登录"),this.$router.push({name:"Login"})),this.$toast.loading({message:"上传中……",forbidClick:!0,duration:0}),this.axios({method:"POST",url:"/updateAvatar",data:{appkey:this.appkey,tokenString:i,imgType:s,serverBase64Img:n}}).then((t=>{this.$toast.clear(),"I001"==t.data.code?this.userIofo.userBg=t.data.userBg:700==t.data.code&&this.$router.push({name:"Home"}),this.getAccountInfo()}),(t=>{console.log(t)}))},upUserName(){this.axios({method:"POST",url:"/updateNickName",data:{appkey:this.appkey,tokenString:sessionStorage.getItem("userToken"),nickName:this.accountInfo.nickName}}).then((t=>{this.$toast.clear(),"C001"==t.data.code&&this.$toast(t.data.msg)}),(t=>{console.log(t)}))},upUserDesc(){this.axios({method:"POST",url:"/updateDesc",data:{appkey:this.appkey,tokenString:sessionStorage.getItem("userToken"),desc:this.accountInfo.desc}}).then((t=>{this.$toast.clear(),"D001"==t.data.code&&this.$toast(t.data.msg)}),(t=>{console.log(t)}))}},beforeMount(){this.getAccountInfo()}},r=c,l=a(3736),u=(0,l.Z)(r,s,o,!1,null,"e606a676",null),d=u.exports}}]);
//# sourceMappingURL=991.618ec49d.js.map