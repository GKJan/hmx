import request from '../request'
import qs from 'qs'

export default {
  getXxReportPage (params) {
    return request({
      url: '/xxItem/getPage',
      method: 'get',
      params: params
    })
  },

  getXxDataPage (params) {
    return request({
      url: '/xxItem/getDataPage',
      method: 'get',
      params: params
    })
  },

  getXxWxReport (params) {
    return request({
      url: '/xxItem/getData',
      method: 'get',
      params: params
    })
  },

  exportXxData (params) {
    return request({
      url: '/xxItem/export',
      method: 'get',
      responseType: 'blob',
      params: params
    })
  },

  editXxData (params) {
    return request({
      url: '/xxItem/update',
      method: 'post',
      data: qs.stringify(params)
    })
  },

  delXxData (params) {
    return request({
      url: '/xxItem/del',
      method: 'get',
      params: params
    })
  },

  getXxDetail (params) {
    return request({
      url: '/xxItem/detail',
      method: 'get',
      params: params
    })
  },

  getXxTemplate (params) {
    return request({
      url: '/xxItem/downloadFile',
      method: 'get',
      params: params
    })
  },

  addXxReport (params) {
    return request({
      url: '/xxItem/save',
      method: 'post',
      data: qs.stringify(params)
    })
  },

  importXxReport (params) {
    return request({
      url: '/xxItem/import',
      method: 'upload',
      data: params
    })
  },

  getXxShare (params) {
    return request({
      url: '/xxItem/share',
      method: 'post',
      data: qs.stringify(params)
    })
  }
}
