import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'index',
    component: _=>import("../views/index.vue"),
    children:[
      {path:'/',redirect:'/home'} , //redirect 设置的是显示默认路由  意思就是在index页面默认显示的是 home组件
      {path:'/home',name:'home',component:_=>import("../views/home.vue")},
      {path:'/orderForm',component:_=>import("../views/orderForm.vue")},
      {path:'/user',component:_=>import("../views/user.vue")},
      {path:'/address',name:'address',component:_=>import("../views/address.vue")},
      {path:'/citylist',component:_=>import("../views/cityList.vue")}

    ]
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path:'/searchProduct',
    name:'searchProduct',
    component: _ =>import('../views/searchProduct.vue')
  },
  {
    path:'/shopDetails',
    name:'shopdetails',
    
    component:_=>import('../views/shops/shopDetails.vue'),
    children:[
      {
        path:'/shopDetails',
        redirect:'/order'
      },
      {
        path:'/order',
        name:'order',
        component:_=>import('../views/shops/order.vue')
      },
      {
        path:'/comments',
        name:'comments',
        component:_=>import('../views/shops/comments.vue')
      },
      {
        path:'/seller',
        name:'seller',
        component:_=>import('../views/shops/seller.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

//路由守卫 
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  const isLogin = localStorage.ele_login ? true : false;
  //下面是判断不管 在url中输入什么 都会跳转到登陆界面的路由
  if(to.path == '/login'){
    next()
  }else {
    //判断是否在登陆界面
    isLogin ? next() : next('/login')
  }
})
export default router
