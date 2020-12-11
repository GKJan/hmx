import Vue from 'vue'
import Router from 'vue-router'
import menuRouter from './menu'
import wxRouter from './wx'

Vue.use(Router)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/cred/img2',
    name: 'CredImg2',
    component: () => import('@/views/menu/cred-img2.vue')
  },
  ...wxRouter,
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/index.vue'),
    children: [
      ...menuRouter,
    ]
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
