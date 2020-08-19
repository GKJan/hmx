import request from '../request'
import qs from 'qs'

export default {
  getzsCategoryPage (params) {
    return request({
      url: '/zsCategory/page',
      method: 'get',
      params: params
    })
  },

  getzsCategoryList (params) {
    return request({
      url: '/zsCategory/list',
      method: 'get',
      params: params
    })
  },

  savezsCategory (params) {
    return request({
      url: '/zsCategory/save',
      method: 'post',
      data: qs.stringify(params)
    })
  },

  updatezsCategory (params) {
    return request({
      url: '/zsCategory/update',
      method: 'post',
      data: qs.stringify(params)
    })
  },

  delzsCategory (params) {
    return request({
      url: '/zsCategory/del',
      method: 'get',
      params: params
    })
  }
}