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
  }
}