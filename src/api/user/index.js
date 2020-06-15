import request from '../request'

export default {
  getMemberPage (params) {
    return request({
      url: '/member/getPage',
      method: 'get',
      params: params
    })
  },

  addUser (params) {
    return request({
      url: '/member/save',
      method: 'post',
      params: params
    })
  },

  editUser (params) {
    return request({
      url: '/member/update',
      method: 'post',
      params: params
    })
  },

  exportUser (params) {
    return request({
      url: '/member/export',
      method: 'get',
      responseType: 'blob',
      params: params
    })
  },

  updatePassWord (params) {
    return request({
      url: '/member/updatePassWord',
      method: 'get',
      params: params
    })
  }
}