import request from '../request'

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

  delPark (params) {
    return request({
      url: '/area/delete',
      method: 'get',
      params: params
    })
  }
}