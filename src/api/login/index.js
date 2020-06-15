import request from '../request'

export default {
  login (params) {
    return request({
      url: '/member/login',
      method: 'post',
      params: params
    })
  }
}