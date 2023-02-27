import Vue from 'vue'
import App from './App.vue'
import router from './router'
//在main.js引入lib-flexible
import 'lib-flexible/flexible'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

import {
  Tabbar,
  TabbarItem,
  NavBar,
  Search,
  Swipe,
  SwipeItem,
  Toast,
  Stepper,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Icon,
  Notify,
  Overlay,
  Form,
  Field,
  CellGroup,
  Button,
  Popup,
  Cell,
  Empty,
  SwipeCell,
  Uploader,
  Tab,
  Tabs,
  Tag,
  AddressEdit,
  Divider,
  SubmitBar,
  Checkbox,
  CheckboxGroup,
  Card,
  AddressList,
  RadioGroup,
  Radio,
  Dialog,
} from 'vant';

import store from './store'

//全局注册组件
Vue
  .use(Tabbar)
  .use(TabbarItem)
  .use(Search)
  .use(NavBar)
  .use(Swipe)
  .use(SwipeItem)
  .use(Toast)
  .use(Stepper)
  .use(GoodsAction,)
  .use(GoodsActionIcon,)
  .use(GoodsActionButton)
  .use(Icon)
  .use(Notify)
  .use(Overlay)
  .use(Form)
  .use(Field)
  .use(CellGroup)
  .use(Button)
  .use(Popup)
  .use(Cell)
  .use(Empty)
  .use(SwipeCell)
  .use(Uploader)
  .use(Tab)
  .use(Tabs)
  .use(Tag)
  .use(AddressEdit)
  .use(Divider)
  .use(SubmitBar)
  .use(Checkbox, CheckboxGroup)
  .use(Card)
  .use(AddressList)
  .use(RadioGroup)
  .use(Radio)
  .use(Dialog)

//设置Vue原型属性
Vue.prototype.appkey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=';

//配置请求基础路径
axios.defaults.baseURL = 'http://www.kangliuyong.com:10002';

//axios拦截器，在发起请求之前执行
axios.interceptors.request.use(config => {

  //处理post请求参数, 进行参数序列化
  if (config.method == 'post') {

    //序列化post请求参数
    let paramsString = '';
    for (let key in config.data) {
      paramsString += `${key}=${config.data[key]}&`;
    }

    //重新赋值config.data
    config.data = paramsString.slice(0, -1);
  }
  //必须返回config
  return config;
})



//定义全局过滤器
//保留小数
Vue.filter('decimal', (v, n = 2) => {
  return v.toFixed(n);
})

//格式化日期
Vue.filter('formatDate', (v, format) => {

  //创建日期对象
  let date = new Date(v);

  //格式化年份
  let year = date.getFullYear().toString();
  // 
  if (/(y+)/.test(format)) {
    //获取匹配组的内容
    var content = RegExp.$1;
    // 
    format = format.replace(content, year.slice(year.length - content.length));
  }

  //格式化月份、日份、时、分、秒
  let o = {
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds()
  };

  for (let key in o) {
    //创建动态正则表达式
    let reg = new RegExp(`(${key}+)`);
    // 

    if (reg.test(format)) {
      //获取组匹配的内容
      let groupContent = RegExp.$1;

      format = format.replace(groupContent, o[key] >= 10 ? o[key] : groupContent.length == 2 ? '0' + o[key] : o[key]);
      // 
    }
  }
  return format;
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')