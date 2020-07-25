import request from '../request'
import qs from 'qs'

export default {
  getLogPage (params) {
    return request({
      url: '/sysLog/getPage',
      method: 'get',
      params: params
    })
  },

  getLogDetail (params) {
    return request({
      url: '/sysLog/getId',
      method: 'get',
      params: params
    })
  },


  exportLog (params) {
    return request({
      url: '/sysLog/export',
      method: 'get',
      responseType: 'blob',
      params: params
    })
  },

  getCertificateList (params) {
    return request({
      url: '/zsCategory/page',
      method: 'get',
      params: params
    })
  },

  saveCertificate (params) {
    return request({
      url: '/zsCategory/save',
      method: 'post',
      data: qs.stringify(params)
    })
  },

  updateCertificate (params) {
    return request({
      url: '/zsCategory/update',
      method: 'post',
      data: qs.stringify(params)
    })
  },

  delCertificate (params) {
    return request({
      url: '/zsCategory/del',
      method: 'get',
      params: params
    })
  },

  getDictList (params) {
    return request({
      url: '/sysDict',
      method: 'get',
      params: params
    })
  }
}