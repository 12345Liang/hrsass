import { login, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
const state = {
  // 初始化的时候从缓存中读取状态 并赋值到初始化的状态上
  token: getToken(),
  // 设置token初始状态   token持久化 => 放到缓存中
  // Vuex和前端缓存相结合实现Vuex的持久化
  userInfo: {} // 定义一个空的对象 不是null 因为后边我要开发userInfo的属性给别人用  userInfo.name
}
const mutations = {
  setToken(state, token) {
    state.token = token// 设置token  只是修改state的数据  123 => 1234
    // vuex变化 => 缓存数据
    // vuex和 缓存数据的同步
    setToken(token)
  },
  removeToken(state) {
    state.token = null// 删除vuex的token
    removeToken()// 先清除 vuex  再清除缓存 vuex和 缓存数据的同步
  },
  setUserInfo(state, userInfo) {
    state.userInfo = { ...userInfo } // 用 浅拷贝的方式去赋值对象 因为这样数据更新之后，才会触发组件的更新
  },
  // 删除用户信息
  reomveUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async login(context, data) {
    const result = await login(data)
    context.commit('setToken', result)
  },
  async getUserInfo(context) {
    const result = await getUserInfo() // 获取返回值
    context.commit('setUserInfo', result) // 将整个的个人信息设置到用户的vuex数据中
    return result // 这里为什么要返回 为后面埋下伏笔
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
