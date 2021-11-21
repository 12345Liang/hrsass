import { login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
const state = {
  // 初始化的时候从缓存中读取状态 并赋值到初始化的状态上
  token: getToken()
  // 设置token初始状态   token持久化 => 放到缓存中
  // Vuex和前端缓存相结合实现Vuex的持久化
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
  }
}
const actions = {
  async login(context, data) {
    const result = await login(data)
    context.commit('setToken', result)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
