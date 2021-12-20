import { constantRoutes, asyncRoutes } from '@/router'
const state = {
  routes: constantRoutes // 所有的角色都有静态路由
}
const mutations = {
  // 修改state中的路由，将新的路由添加到静态路由里面
  setRoutes(state, newRoutes) {
    state.routes = { ...constantRoutes, ...newRoutes }
  }
}
const actions = {
  // 定义筛选路由的方法
  filterRoutes(context, menus) {
    // menus是userInfo下的数据，
    const routes = []
    menus.forEach(key => { // 遍历menus中的标识
      // 筛选asyncRoutes中与标识相等的的name，最后添加到routes这个数组上，routes就是满足权限的路由
      routes.push(...asyncRoutes.filter(item => item.name === key))
    })
    // 修改state中的routes
    context.commit('setRoutes', routes) // 返回的routes是给左侧菜单栏循环用
    console.log('当前用户所拥有的路由route=====>', routes)
    return routes // commit的routes 是给后面的addRoutes用
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
