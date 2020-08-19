export default [
  {
    path: '/park',
    name: 'Park',
    component: () => import('@/views/menu/park.vue'),
    meta: { title: '园区管理' }
  },
  {
    path: '/session',
    name: 'Session',
    component: () => import('@/views/menu/session.vue'),
    meta: { title: '场次管理' }
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import('@/views/menu/report.vue'),
    meta: { title: '信息报告(幼儿园)' }
  },
  {
    path: '/primaryReport',
    name: 'PrimaryReport',
    component: () => import('@/views/menu/primary-report.vue'),
    meta: { title: '信息报告(小学)' }
  },
  {
    path: '/basketReport',
    name: 'BasketReport',
    component: () => import('@/views/menu/basket.vue'),
    meta: { title: '信息报告(篮球)' }
  },
  {
    path: '/report/primaryDetail',
    name: 'PrimaryDetail',
    component: () => import('@/views/detail/primary-detail.vue'),
    meta: { title: '报告详情(小学)' }
  },
  {
    path: '/report/detail',
    name: 'ReportDetail',
    component: () => import('@/views/detail/detail.vue'),
    meta: { title: '报告详情(幼儿园)' }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/sys/user.vue'),
    meta: { title: '普通用户管理' }
  },
  {
    path: '/certificateUser',
    name: 'CertificateUser',
    component: () => import('@/views/sys/c-user.vue'),
    meta: { title: '证书用户管理' }
  },
  {
    path: '/log',
    name: 'Log',
    component: () => import('@/views/sys/log.vue'),
    meta: { title: '日志管理' }
  },
  {
    path: '/cred',
    name: 'Cred',
    component: () => import('@/views/menu/cred.vue'),
    meta: { title: '证书管理' }
  },
  {
    path: '/audit',
    name: 'Audit',
    component: () => import('@/views/menu/audit.vue'),
    meta: { title: '证书审核管理' }
  },
  {
    path: '/certificate',
    name: 'Certificate',
    component: () => import('@/views/menu/certificate.vue'),
    meta: { title: '证书类型管理' }
  },
  {
    path: '/statistic',
    name: 'Statistic',
    component: () => import('@/views/menu/statistic.vue'),
    meta: { title: '数据统计' }
  }
]