import request from '../request'
import qs from 'qs'

export default {
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
  }
}