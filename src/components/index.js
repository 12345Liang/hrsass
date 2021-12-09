import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
export default {
  install(Vue) {
    //  注册全局的通用栏组件对象
    Vue.component('PageTools', PageTools) // 头部公用组件
    Vue.component('UploadExcel', UploadExcel) // 导入Excel组件
  }
}
