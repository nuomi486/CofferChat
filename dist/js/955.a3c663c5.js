"use strict";(self["webpackChunkrx"]=self["webpackChunkrx"]||[]).push([[955],{8459:function(t,s,e){e.d(s,{Z:function(){return l}});var a=function(){var t=this,s=t._self._c;return s("van-nav-bar",{attrs:{title:t.title,"left-text":"返回","left-arrow":"",fixed:"",placeholder:""},on:{"click-left":t.onClickLeft}})},r=[],n={name:"NvaBarTav",props:["title"],methods:{onClickLeft(){this.$router.go(-1)}}},i=n,o=e(3736),d=(0,o.Z)(i,a,r,!1,null,"1181aa63",null),l=d.exports},6826:function(t,s,e){e.r(s),e.d(s,{default:function(){return m}});var a=function(){var t=this,s=t._self._c;return s("div",{staticClass:"MyAddress"},[s("NavBarTav",{attrs:{title:"地址管理"}}),0==t.MyAddress.length?s("van-empty",{attrs:{description:"还没设置地址，请尽快添加地址叭！"}}):s("AddressItem",{attrs:{AddressData:t.MyAddress}}),s("div",{staticClass:"foo"},[s("van-button",{attrs:{round:"",type:"info",block:""},on:{click:t.goPage}},[t._v("添加地址")])],1)],1)},r=[],n=e(8459),i=function(){var t=this,s=t._self._c;return s("div",{staticClass:"List-box"},[s("div",{staticClass:"List-group"},[s("div",{staticClass:"list-item"},[s("div",{staticClass:"items"},t._l(t.AddressData,(function(e,a){return s("van-cell",{key:a,scopedSlots:t._u([{key:"title",fn:function(){return[s("span",{staticClass:"custom-title"},[t._v(t._s(e.name))]),s("span",{staticClass:"custom-title"},[t._v(t._s(e.tel))]),1==e.isDefault?s("van-tag",{attrs:{round:"",type:"danger",color:"#0c34ba"}},[t._v("默认")]):t._e()]},proxy:!0},{key:"label",fn:function(){return[s("div",{staticClass:"context"},[t._v(t._s(e.province)+t._s(e.city)+t._s(e.county)+t._s(e.addressDetail))])]},proxy:!0},{key:"right-icon",fn:function(){return[s("van-icon",{staticClass:"Ricon",attrs:{name:"edit",size:"25"},on:{click:function(s){return t.isEdit(e.aid)}}})]},proxy:!0}],null,!0)})})),1)])])])},o=[],d={name:"AddressItem",props:["AddressData"],methods:{isEdit(t){this.$router.push({name:"NewAddress",query:{aid:t}})}}},l=d,c=e(3736),u=(0,c.Z)(l,i,o,!1,null,"477d9a8c",null),f=u.exports,p={name:"AddressView",components:{NavBarTav:n.Z,AddressItem:f},data(){return{MyAddress:[]}},methods:{getMyAddress(){const t=sessionStorage.getItem("userToken");this.$toast.loading({message:"加载中……",forbidClick:!0,duration:0}),this.axios({method:"GET",url:"/findAddress",params:{appkey:this.appkey,tokenString:t}}).then((t=>{this.$toast.clear(),this.MyAddress=t.data.result}),(t=>{console.log(t)}))},goPage(){this.$router.push({name:"NewAddress"})}},beforeMount(){this.getMyAddress()}},v=p,h=(0,c.Z)(v,a,r,!1,null,"559ad49e",null),m=h.exports}}]);
//# sourceMappingURL=955.a3c663c5.js.map