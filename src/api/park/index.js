import request from '../request'
import qs from 'qs'

export default {
  getParkPage (params) {
    return request({
      url: '/area/getPage',
      method: 'get',
      params: params
    })
  },

  getParkList (params) {
    return request({
      url: '/area/list',
      method: 'get',
      params: params
    })
  },

  addPark (params) {
    return request({
      url: '/area/save',
      method: 'get',
      params: params
    })
  },

  editPark (params) {
    return request({
      url: '/area/update',
      method: 'get',
      params: params
    })
  },

  delPark (params) {
    return request({
      url: '/area/delete',
      method: 'get',
      params: params
    })
  },

  getArea (params) {
    return request({
      url: '/sys/sysArea/list',
      method: 'get',
      params: params
    })
  }
}