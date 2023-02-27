import Vue from 'vue'
import VueRouter from 'vue-router'




Vue.use(VueRouter)

const routes = [
  //  一级路由
  {
    path: "/main",
    name: "main",
    // redirect:'/main',
    component: () => import("../views/main.vue"),
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "menu",
        name: "Menu",
        component: () => import("../views/MenuView.vue"),
      },
      {
        path: "shopbag",
        name: "Shopbag",
        component: () => import("../views/ShopBagView.vue"),
      },
      {
        path: "my",
        name: "My",
        component: () => import("../views/MyView.vue"),
        meta: {
          // isAuth: true
        }
      },
    ]
  },
  {
    path: '*',
    redirect: {
      name: 'Home'
    }
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import("../views/ShopInfoView.vue"),
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import("../views/SearchView.vue"),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import("../views/MyPageOption/AccountView.vue"),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import("../views/MyPageOption/OrderView.vue"),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/like',
    name: 'Like',
    component: () => import("../views/MyPageOption/LikeView.vue"),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import("../views/MyPageOption/AddressView.vue"),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/secure',
    name: 'Secure',
    component: () => import("../views/MyPageOption/SecureView.vue"),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/record',
    name: 'Record',
    component: () => import("../views/MyPageOption/RecordView.vue"),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/newaddress',
    name: 'NewAddress',
    component: () => import("../views/NewAddressView.vue"),
  },
  {
    path: '/pay',
    name: 'Pay',
    component: () => import("../views/PayView.vue"),
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: () => import("../views/ForGotView.vue"),
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, _, next) => {
  if (to.meta.isAuth) {
    if (!sessionStorage.getItem("userToken")) {
      // this.$notify({ message: '靓仔，您尚未登录',position: 'bottom',});
      // alert("未登录")
      next({name:'Login'})
    } else {
      next()
    }
  } else {
    document.title = to.name
    next()
  }
})

export default router
