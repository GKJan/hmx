import request from '../request'
import qs from 'qs'

export default {
  getReportPage (params) {
    return request({
      url: '/item/getPage',
      method: 'get',
      params: params
    })
  },

  getDataPage (params) {
    return request({
      url: '/item/getDataPage',
      method: 'get',
      params: params
    })
  },

  getWxReport (params) {
    return request({
      url: '/item/getData',
      method: 'get',
      params: params
    })
  },

  exportData (params) {
    return request({
      url: '/item/export',
      method: 'get',
      responseType: 'blob',
      params: params
    })
  },

  getDetail (params) {
    return request({
      url: '/item/detail',
      method: 'get',
      params: params
    })
  },

  getTemplate (params) {
    return request({
      url: '/item/downloadFile',
      method: 'get',
      params: params
    })
  },

  addReport (params) {
    return request({
      url: '/item/save',
      method: 'post',
      data: qs.stringify(params)
    })
  },

  importReport (params) {
    return request({
      url: '/item/import',
      method: 'upload',
      data: params
    })
  },

  getShare (params) {
    return request({
      url: '/item/share',
      method: 'post',
      data: qs.stringify(params)
    })
  }
}
