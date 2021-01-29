import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: () => import('../page/index.vue'),
      children: [
        {
          path: '/home',
          component: () => import('../view/home.vue')
        },
        {
          path: '/sort',
          component: () => import('../view/sort.vue')
        },
        {
          path: '/cart',
          component: () => import('../view/cart.vue')
        },
        {
          path: '/mine',
          component: () => import('../view/mine.vue')
        },
        {
          path: '',
          redirect: '/home'
        },
      ]
    },
    {
      path: '/goodslist/:id',
      component: () => import('../page/goodslist.vue')
    },
    {
      path: '/detail/:id',
      component: () => import('../page/goodsdetail.vue')
    },
    {
      path: '/login',
      component: () => import('../page/login.vue')
    },
    {
      path: '/register',
      component: () => import('../page/register.vue')
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
