export default [
  {
    path: '/wx',
    name: 'WX',
    component: () => import('@/views/wx/index.vue'),
    meta: { title: '报告详情' }
  },
  {
    path: '/wx/primaryReport',
    name: 'WXPrimaryReport',
    component: () => import('@/views/wx/primary-report.vue'),
    meta: { title: '报告详情' }
  },
  {
    path: '/wx/basketReport',
    name: 'WXBasketReport',
    component: () => import('@/views/wx/basket-report.vue'),
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
    meta: { title: '报告查询' }
  },
  {
    path: '/wx/record',
    name: 'WxRecord',
    component: () => import('@/views/wx/record.vue'),
    meta: { title: '录入数据' }
  },
  {
    path: '/wx/primaryRecord',
    name: 'wxPrimaryRecord',
    component: () => import('@/views/wx/primary-record.vue'),
    meta: { title: '录入数据' }
  },
  {
    path: '/wx/apply',
    name: 'WxCredApply',
    component: () => import('@/views/wx/apply.vue'),
    meta: { title: '证书申请' }
  },
  {
    path: '/wx/cred/search',
    name: 'WxCredSearch',
    component: () => import('@/views/wx/cred-search.vue'),
    meta: { title: '证书查询' }
  },
  {
    path: '/wx/cred',
    name: 'WxCred',
    component: () => import('@/views/wx/cred.vue'),
    meta: { title: '证书详情' }
  }
]
