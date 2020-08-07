import request from '../request'
import qs from 'qs'

export default {
  login (params) {
    return request({
      url: '/member/login',
      method: 'post',
      data: qs.stringify(params)
    })
  },

  getDictList (params) {
    return request({
      url: '/sysDict',
      method: 'get',
      params: params
    })
  },

  getRegionList (params) {
    return request({
      url: '/area/regionList',
      method: 'get',
      params: params
    })
  }
}