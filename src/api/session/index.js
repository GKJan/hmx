import request from '../request'
import qs from 'qs'

export default {
  getSessionPage (params) {
    return request({
      url: '/sport/getDataPage',
      method: 'get',
      params: params
    })
  },

  getSessionList (params) {
    return request({
      url: '/sport/getList',
      method: 'get',
      params: params
    })
  },

  getWxSessionList (params) {
    return request({
      url: '/item/getList',
      method: 'get',
      params: params
    })
  },


  addSession (params) {
    return request({
      url: '/sport/save',
      method: 'post',
      data: qs.stringify(params)
    })
  },

  delSession (params) {
    return request({
      url: '/sport/delete',
      method: 'get',
      params: params
    })
  }
}