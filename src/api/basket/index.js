import request from '../request'
import qs from 'qs'

export default {
  getBasketReportPage (params) {
    return request({
      url: '/baskItem/getPage',
      method: 'get',
      params: params
    })
  },

  getBasketDataPage (params) {
    return request({
      url: '/baskItem/getDataPage',
      method: 'get',
      params: params
    })
  },

  getBasketWxReport (params) {
    return request({
      url: '/baskItem/getData',
      method: 'get',
      params: params
    })
  },

  exportBasketData (params) {
    return request({
      url: '/baskItem/export',
      method: 'get',
      responseType: 'blob',
      params: params
    })
  },

  editBasketData (params) {
    return request({
      url: '/baskItem/update',
      method: 'post',
      data: qs.stringify(params)
    })
  },

  delBasketData (params) {
    return request({
      url: '/baskItem/del',
      method: 'get',
      params: params
    })
  },

  getBasketDetail (params) {
    return request({
      url: '/baskItem/detail',
      method: 'get',
      params: params
    })
  },

  getBasketTemplate (params) {
    return request({
      url: '/baskItem/downloadFile',
      method: 'get',
      params: params
    })
  },

  addBasketReport (params) {
    return request({
      url: '/baskItem/save',
      method: 'post',
      data: qs.stringify(params)
    })
  },

  importBasketReport (params) {
    return request({
      url: '/baskItem/import',
      method: 'upload',
      data: params
    })
  },

  getBasketShare (params) {
    return request({
      url: '/baskItem/share',
      method: 'post',
      data: qs.stringify(params)
    })
  }
}
