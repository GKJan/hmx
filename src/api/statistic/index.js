import request from '../request'

export default {
  countSex (params) {
    return request({
      url: '/count/countSex',
      method: 'get',
      params: params
    })
  },

  countTotal (params) {
    return request({
      url: '/count/countTotal',
      method: 'get',
      params: params
    })
  },

  countType (params) {
    return request({
      url: '/count/countType',
      method: 'get',
      params: params
    })
  },

  getItemCount (params) {
    return request({
      url: '/count/getItemCount',
      method: 'get',
      params: params
    })
  },

  getXxItemCount (params) {
    return request({
      url: '/count/getXxItemCount',
      method: 'get',
      params: params
    })
  },

  countYxz (params) {
    return request({
      url: '/count/yxz',
      method: 'get',
      params: params
    })
  }
}