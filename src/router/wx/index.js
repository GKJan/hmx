export default [
  {
    path: '/wx',
    name: 'WX',
    component: () => import('@/views/wx/index.vue'),
    meta: { title: '报告详情' }
  },
  {
    path: '/wx/login',
    name: 'WxLogin',
    component: () => import('@/views/wx/login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/wx/personal',
    name: 'WxPersonal',
    component: () => import('@/views/wx/personal.vue'),
    meta: { title: '个人中心' }
  },
  {
    path: '/wx/search',
    name: 'WxSearch',
    component: () => import('@/views/wx/search.vue'),
    meta: { title: '报告搜索' }
  },
  {
    path: '/wx/record',
    name: 'WxRecord',
    component: () => import('@/views/wx/record.vue'),
    meta: { title: '录入数据' }
  }
]
