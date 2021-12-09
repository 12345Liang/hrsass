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
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
      }
      next()
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
