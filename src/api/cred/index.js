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
      url: '/zsInfo/pageApp',
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
  }
}