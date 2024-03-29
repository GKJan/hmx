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
    meta: { title: '幼儿体质测查' }
  },
  {
    path: '/primaryReport',
    name: 'PrimaryReport',
    component: () => import('@/views/menu/primary-report.vue'),
    meta: { title: '小学生体质测查' }
  },
  {
    path: '/basketReport',
    name: 'BasketReport',
    component: () => import('@/views/menu/basket.vue'),
    meta: { title: '篮球专项测查' }
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
    component: () => import('@/views/detail/new-detail.vue'),
    meta: { title: '报告详情(幼儿园)' }
  },
  {
    path: '/report/basketDetail',
    name: 'ReportBasketDetail',
    component: () => import('@/views/detail/basket-detail.vue'),
    meta: { title: '报告详情(篮球)' }
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
    meta: { title: '机构证书' }
  },
  {
    path: '/cred/audit',
    name: 'CredAudit',
    component: () => import('@/views/menu/cred-audit.vue'),
    meta: { title: '机构证书审核' }
  },
  {
    path: '/cred-person',
    name: 'CredPerson',
    component: () => import('@/views/menu/cred-person.vue'),
    meta: { title: '个人证书' }
  },
  {
    path: '/cred/img',
    name: 'CredImg',
    component: () => import('@/views/menu/cred-img.vue'),
    meta: { title: '证书预览' }
  },
  {
    path: '/audit',
    name: 'Audit',
    component: () => import('@/views/menu/audit.vue'),
    meta: { title: '个人证书审核' }
  },
  {
    path: '/cred/class',
    name: 'CredClass',
    component: () => import('@/views/menu/cred-class.vue'),
    meta: { title: '证书分类管理' }
  },
  {
    path: '/cred/tj',
    name: 'CredTj',
    component: () => import('@/views/menu/cred-tj.vue'),
    meta: { title: '证书数据统计' }
  },
  {
    path: '/statistic',
    name: 'Statistic',
    component: () => import('@/views/menu/statistic.vue'),
    meta: { title: '数据统计' }
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('@/views/sys/message.vue'),
    meta: { title: '系统消息' }
  }
]