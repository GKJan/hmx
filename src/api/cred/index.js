import request from '../request'
import qs from 'qs'

export default {
  getCredPage (params) {
    return request({
      url: '/zsInfo/page',
      method: 'get',
      params: params
    })
  },

  getWxCredPage (params) {
    return request({
      url: '/zsPersonal/getName',
      method: 'get',
      params: params
    })
  },

  getWxCredAudit (params) {
    return request({
      url: '/zsPersonal/getAuditName',
      method: 'get',
      params: params
    })
  },

  updatePersonCredWx (params) {
    return request({
      url: '/zsPersonal/wechatUpdate',
      method: 'post',
      data: qs.stringify(params)
    })
  },

  updateOrganCredWx (params) {
    return request({
      url: '/zsDept/wechatUpdate',
      method: 'post',
      data: qs.stringify(params)
    })
  },

  getWxOrganCredAudit (params) {
    return request({
      url: '/zsDept/getAuditName',
      method: 'get',
      params: params
    })
  },

  getWxOrganCredPage (params) {
    return request({
      url: '/zsDept/getName',
      method: 'get',
      params: params
    })
  },

  getCredDetail (params) {
    return request({
      url: '/zsInfo/detail',
      method: 'get',
      params: params
    })
  },

  getAuditCredPage (params) {
    return request({
      url: '/zsInfo/getAuditPage',
      method: 'get',
      params: params
    })
  },

  toAudit (params) {
    return request({
      url: '/zsInfo/audit',
      method: 'get',
      params: params
    })
  },

  saveCerd (params) {
    return request({
      url: '/zsInfo/save',
      method: 'post',
      data: qs.stringify(params)
    })
  },

  wxSaveCerd (params) {
    return request({
      url: '/zsInfo/wechatSave',
      method: 'post',
      data: qs.stringify(params)
    })
  },

  updateCerd (params) {
    return request({
      url: '/zsInfo/update',
      method: 'post',
      data: qs.stringify(params)
    })
  },

  delCerd (params) {
    return request({
      url: '/zsInfo/del',
      method: 'get',
      params: params
    })
  },

  getZsCount (params) {
    return request({
      url: '/zsInfo/countInfo',
      method: 'get',
      params: params
    })
  },

  getZsRegionCount (params) {
    return request({
      url: '/zsInfo/countArea',
      method: 'get',
      params: params
    })
  },

  getZsSexCount (params) {
    return request({
      url: '/zsInfo/countSex',
      method: 'get',
      params: params
    })
  },

  getZsYearCount (params) {
    return request({
      url: '/zsInfo/countLx',
      method: 'get',
      params: params
    })
  },

  getPersonCredPage (params) {
    return request({
      url: '/zsPersonal/page',
      method: 'get',
      params: params
    })
  },

  savePersonCred (params) {
    return request({
      url: '/zsPersonal/save',
      method: 'post',
      data: qs.stringify(params)
    })
  },

  updatePersonCred (params) {
    return request({
      url: '/zsPersonal/update',
      method: 'post',
      data: qs.stringify(params)
    })
  },

  savePersonCredWx (params) {
    return request({
      url: '/zsPersonal/wechatSave',
      method: 'post',
      data: qs.stringify(params)
    })
  },

  delPersonCred (params) {
    return request({
      url: '/zsPersonal/del',
      method: 'get',
      params: params
    })
  },

  auditPersonCred (params) {
    return request({
      url: '/zsPersonal/audit',
      method: 'get',
      params: params
    })
  },

  getPersonCredCode (params) {
    return request({
      url: '/zsCategory/getAcCode',
      method: 'get',
      params: params
    })
  },

  getPersonCredCodeWx (params) {
    return request({
      url: '/zsCategory/getWxAcCode',
      method: 'get',
      params: params
    })
  },

  getOrganCredPage (params) {
    return request({
      url: '/zsDept/page',
      method: 'get',
      params: params
    })
  },

  getOrganCredAuditPage (params) {
    return request({
      url: '/zsDept/auditPage',
      method: 'get',
      params: params
    })
  },

  auditOrganCred (params) {
    return request({
      url: '/zsDept/audit',
      method: 'get',
      params: params
    })
  },

  saveOrganCred (params) {
    return request({
      url: '/zsDept/save',
      method: 'post',
      data: qs.stringify(params)
    })
  },

  updateOrganCred (params) {
    return request({
      url: '/zsDept/update',
      method: 'post',
      data: qs.stringify(params)
    })
  },

  saveOrganCredWx (params) {
    return request({
      url: '/zsDept/wechatSave',
      method: 'post',
      data: qs.stringify(params)
    })
  },

  // delPersonCred (params) {
  //   return request({
  //     url: '/zsPersonal/del',
  //     method: 'get',
  //     params: params
  //   })
  // },

  // getPersonCredCode (params) {
  //   return request({
  //     url: '/zsCategory/getAcCode',
  //     method: 'get',
  //     params: params
  //   })
  // },
}
