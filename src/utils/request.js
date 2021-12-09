import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // 注入token，请求头统一在请求拦截器里写
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  // 一定要返回config，否则就没有config
  return config
}, error => {
  return Promise.reject(error)
})
// 相应拦截器
service.interceptors.response.use(response => {
  const { success, message, data } = response.data
  //   要根据success的成功与否决定下面的操作
  //   axios里默认有一层data,接口中都有success,message,data
  //   当返回success时，才能继续获取data数据
  if (success) {
    return data
  } else {
    // 业务已经错误了 还能进then ? 不能 ！ 应该进catch
    Message.error(message) // 提示错误消息
    // 返回值中没有error对象，需要new一个error对象
    return Promise.reject(new Error(message))
  }
}, error => {
  Message.error(error.message)
  return Promise.reject(error)
  // promise 里的reject对象
})

export default service
