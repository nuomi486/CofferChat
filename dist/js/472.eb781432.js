"use strict";(self["webpackChunkrx"]=self["webpackChunkrx"]||[]).push([[472],{8459:function(t,e,s){s.d(e,{Z:function(){return l}});var a=function(){var t=this,e=t._self._c;return e("van-nav-bar",{attrs:{title:t.title,"left-text":"返回","left-arrow":"",fixed:"",placeholder:""},on:{"click-left":t.onClickLeft}})},i=[],o={name:"NvaBarTav",props:["title"],methods:{onClickLeft(){this.$router.go(-1)}}},n=o,c=s(3736),r=(0,c.Z)(n,a,i,!1,null,"1181aa63",null),l=r.exports},3472:function(t,e,s){s.r(e),s.d(e,{default:function(){return h}});var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"bag-box"},[e("van-nav-bar",{attrs:{title:"购物袋",fixed:"",placeholder:""},on:{"click-right":function(e){t.isEdit=!t.isEdit}},scopedSlots:t._u([{key:"right",fn:function(){return[e("div",{directives:[{name:"show",rawName:"v-show",value:t.bagData.length>0,expression:"bagData.length > 0"}],staticStyle:{color:"#1a73e8"}},[t._v(" "+t._s(t.isEdit?"完成":"编辑")+" ")])]},proxy:!0}])}),t._m(0),t.bagData.length>0?e("div",{staticClass:"shoppbag-box"},[t._l(t.bagData,(function(s,a){return e("van-swipe-cell",{key:a,scopedSlots:t._u([{key:"right",fn:function(){return[e("van-button",{staticClass:"delete-button",attrs:{square:"",text:"删除",type:"danger"},on:{click:function(e){return t.onDelete(s.sid)}}})]},proxy:!0}],null,!0)},[e("div",{staticClass:"shippList"},[e("div",{staticClass:"item"},[e("div",{staticClass:"checked-box"},[e("van-checkbox",{model:{value:s.checked,callback:function(e){t.$set(s,"checked",e)},expression:"item.checked"}})],1),e("div",{staticClass:"img-box"},[e("img",{attrs:{src:s.small_img,alt:""}})]),e("div",{staticClass:"info-box"},[e("div",{staticClass:"info"},[e("div",{staticClass:"name"},[e("div",[t._v(t._s(s.name))]),e("div",[t._v(t._s(s.rule))])]),e("div",{staticClass:"enname"},[t._v(t._s(s.enname))])]),e("div",{staticClass:"count"},[e("div",{staticClass:"price fl"},[t._v("￥"+t._s(s.price))]),e("van-stepper",{staticClass:"fr",attrs:{theme:"round","button-size":"22","disable-input":""},on:{change:function(e){return t.onChanges(s.sid,s.count)}},model:{value:s.count,callback:function(e){t.$set(s,"count",e)},expression:"item.count"}})],1)])])])])})),t.isEdit?e("van-submit-bar",{attrs:{"button-text":"删除商品"},on:{submit:t.onDelete}},[e("van-checkbox",{model:{value:t.isChecked,callback:function(e){t.isChecked=e},expression:"isChecked"}},[t._v("全选")])],1):e("van-submit-bar",{attrs:{price:t.getprice,"button-text":"提交订单"},on:{submit:t.onSubmit}},[e("van-checkbox",{model:{value:t.isChecked,callback:function(e){t.isChecked=e},expression:"isChecked"}},[t._v("全选")])],1)],2):e("div",[e("van-empty",{attrs:{image:"https://unpkg.com/@vant/assets/custom-empty-image.png","image-size":"80",description:"你的购物袋空空如也"}},[e("van-button",{staticClass:"bottom-button",attrs:{round:"",type:"danger",color:"#1A73E8"},on:{click:t.goPage}},[t._v("去逛一逛")])],1)],1)],1)},i=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"shoppbag-bg"},[e("img",{staticClass:"auto_img",attrs:{src:s(6700),alt:""}})])}],o=s(8459),n={name:"ShopBagView",data(){return{bagData:[],isEdit:!1,checked:!1}},computed:{BagLogin(){const t=sessionStorage.getItem("userToken");return!t},getprice(){let t=0;for(const e of this.bagData)if(e.checked){let s=e.count*e.price;t+=s}return 100*t},isChecked:{get(){let t=[];for(const e of this.bagData)1==e.checked&&t.push(e.checked);return t.length==this.bagData.length},set(t){this.checked=t,this.checkAll()}}},methods:{getBag(){this.$toast.loading({message:"加载中……",forbidClick:!0,duration:0}),this.axios({method:"GET",url:"/findAllShopcart",params:{appkey:this.appkey,tokenString:sessionStorage.getItem("userToken")}}).then((t=>{this.$toast.clear(),5e3==t.data.code&&(t.data.result.map((t=>{t.checked=!1})),this.bagData=t.data.result)}),(t=>{console.log(t)}))},back(){this.$router.go(-1)},goPage(){this.$router.push({name:"Home"}),sessionStorage.setItem("indexName","Home"),this.$store.commit("SetIndexName","Home")},checkAll(){for(const t of this.bagData)t.checked=this.checked},onSubmit(){let t=[];this.bagData.forEach((e=>{1==e.checked&&t.push(e.sid)})),t.length>0?(sessionStorage.setItem("sidKeys",JSON.stringify(t)),this.$router.push({name:"Pay"})):this.$toast("请选择下单的商品！")},onChanges(t,e){this.axios({method:"POST",url:"/modifyShopcartCount",data:{appkey:this.appkey,tokenString:sessionStorage.getItem("userToken"),sid:t,count:e}}).then((t=>{6e3!=t.data.code&&6001!=t.data.code||this.$toast(t.data.msg)}),(t=>{console.log(t)}))},onDelete(...t){for(const e of this.bagData)e.checked&&t.push(e.sid);this.axios({method:"POST",url:"/removeShopcart",data:{appkey:this.appkey,tokenString:sessionStorage.getItem("userToken"),sids:JSON.stringify(t)}}).then((t=>{7e3==t.data.code&&(this.getBag(),this.$toast(t.data.msg))}),(t=>{console.log(t)}))}},beforeMount(){this.getBag()},components:{NavBarTav:o.Z}},c=n,r=s(3736),l=(0,r.Z)(c,a,i,!1,null,"73830c5c",null),h=l.exports},6700:function(t,e,s){t.exports=s.p+"img/shopbag_bg.e5b6cb81.png"}}]);
//# sourceMappingURL=472.eb781432.js.map