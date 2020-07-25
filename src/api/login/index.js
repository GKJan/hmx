import request from '../request'
import qs from 'qs'

export default {
  login (params) {
    return request({
      url: '/member/login',
      method: 'post',
      data: qs.stringify(params)
    })
  }
}