import Vue from 'vue'
import Router from 'vue-router'
import store from  '../store' 
Vue.use(Router)
export const childrenRoute = [

  {
    path: '/menu',
    component: () => import("../view/menu/mangermenu.vue"),
    name: '菜单管理'
  },
  {
    path: '/role',
    component: () => import("../view/role/mangerrole.vue"),
    name: '角色管理'
  },
  {
    path: '/manger',
    component: () => import("../view/manger/mangermanger.vue"),
    name: '管理员管理'
  },
  {
    path: '/goodclass',
    component: () => import("../view/goodclass/goodclass.vue"),
    name: '商品分类'
  },
  {
    path:'/specs',
    component:() => import('../view/specs/mangerspecs.vue'),
    name:'商品规格'
  },
  {
    path:'/goods',
    component:() => import('../view/goods/mangergoods.vue'),
    name:'商品管理'
  },
  {
    path:'/member',
    component:() => import('../view/member/mangermember.vue'),
    name:'会员管理'
  },
  {
    path:'/banner',
    component:() => import('../view/banner/mangerbanner.vue'),
    name:'轮播图'
  },
  {
    path:'/seckadd',
    component:() => import('../view/seck/mangerseck'),
    name:'限时秒杀'
  }
]

for(let item of childrenRoute){
  item.beforeEnter = (to, from, next) => {
    if(store.getters.get_userinfo_.menus_url.indexOf(item.path) === -1){
      next(from.path)
    }else{next()}
  }
}

const router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import("../page/login.vue")
    },
    {
      path: '/index',
      component: () => import("../page/index.vue"),
      children: [
        {
          path: '/home',
          component: () => import("../view/home.vue"),
          name: '首页'
        },
        ...childrenRoute,
        {
          path: '',
          redirect: '/home'
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ],

})
//全局导航守卫之登录拦截
/* router.beforeEach((to, from, next) => {
  //如果你去的是登录就 next
  if (to.path == '/login') {
    next()
    return;
  }
  //如果你有登录状态就next
  if (window.sessionStorage.getItem('userinfo')) {
    next()
    return;
  }
  //都没有就强制跳转回登录页
  next('/login')
}) */

export default router
