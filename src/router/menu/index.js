export default [
  {
    path: '/park',
    name: 'Park',
    component: () => import('@/views/park/index.vue')
  },
  {
    path: '/session',
    name: 'Session',
    component: () => import('@/views/park/session.vue')
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import('@/views/park/report.vue')
  },
  {
    path: '/report/detail',
    name: 'ReportDetail',
    component: () => import('@/views/park/detail.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/user/index.vue')
  },
  {
    path: '/log',
    name: 'Log',
    component: () => import('@/views/user/log.vue')
  }
]