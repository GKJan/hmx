import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
const service = axios.create({
  // 设置超时时间
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  baseURL: process.env.VUE_APP_baseApi
})
// post请求的时候，我们需要加上一个请求头，所以可以在这里进行一个默认的设置
// 即设置post的请求头为application/x-www-form-urlencoded;charset=UTF-8
// service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
service.interceptors.request.use(config => {
  if (config.method === 'upload') {
    config.method = 'post'
    config.headers.post['Content-Type'] = 'multipart/form-data'
  }

  if (localStorage.getItem('userInfo')) {
    config.headers['Authorization'] = JSON.parse(localStorage.getItem('userInfo')).authorization
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
/**
 * 请求响应拦截
 * 用于处理需要在请求返回后的操作
 */
service.interceptors.response.use(response => {
  const responseCode = response.status
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  if (responseCode === 200) {
    if (response.data.success === false) {
        if (response.data.msg) {
          Message.error(response.data.msg)
        } else {
          Message.error('系统错误，请联系管理员')
        }
    }
    return Promise.resolve(response.data)
  } else {
    return Promise.reject(response.data)
  }
}, error => {
  // 断网 或者 请求超时 状态
  if (!error.response) {
    // 请求超时状态
    if (error.message.includes('timeout')) {
      console.log('超时了')
      Message.error('请求超时，请检查网络是否连接正常')
    } else {
      // 可以展示断网组件
      console.log('断网了')
      Message.error('请求失败，请检查网络是否已连接')
    }
    return
  }
  // 服务器返回不是 2 开头的情况，会进入这个回调
  // 可以根据后端返回的状态码进行不同的操作
  const responseCode = error.response.status
  switch (responseCode) {
    // 401：未登录
    case 401:
      Message.error('请先登录')
      // 跳转登录页
      router.replace({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
      break
    // 403: token过期
    case 403:
      // 弹出错误信息
      Message.error('登录信息已过期，请重新登录')
      // 清除token
      localStorage.removeItem('userInfo')
      // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
      // setTimeout(() => {
      if (window.isPhone()) {
        router.replace({
          path: '/wx/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      } else {
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      }
      // }, 500)
      break
    // 404请求不存在
    case 404:
      Message.error('网络请求不存在')
      break
    // 其他错误，直接抛出错误提示
    default:
      if (error.response.data.msg) {
        Message.error(error.response.data.msg)
      }
  }
  return Promise.reject(error)
})

export default service
