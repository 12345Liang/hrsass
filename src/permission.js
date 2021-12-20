import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/login', '/404']
// 路由前置守卫
// 里面返回的函数有三个参数
router.beforeEach(async function(to, from, next) {
  NProgress.start()
  // 如果有token
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 用户没有id,获取用户的信息，调用getUserInfo函数
      if (!store.getters.userId) {
        // async函数return的东西，可以用await接收
        const { roles } = await store.dispatch('user/getUserInfo')
        // 调用filterRouters方法，并且传参（roles.menus）
        const routes = await store.dispatch('permission/filterRoutes', roles.menus)
        router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }]) // 将routes添加到路由表
        // console.log(routes)
        next(to.path)
      } else {
        next()
      }
    }
  } else { // 如果没token
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  NProgress.done()
})
// 路由后置守卫
router.afterEach(function() {
  NProgress.done()
})
