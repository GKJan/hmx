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

  // updateCertificate (params) {
  //   return request({
  //     url: '/zsCategory/update',
  //     method: 'post',
  //     data: qs.stringify(params)
  //   })
  // },

  // delCertificate (params) {
  //   return request({
  //     url: '/zsCategory/del',
  //     method: 'get',
  //     params: params
  //   })
  // }
}