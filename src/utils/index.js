import axios from 'axios'
const service = axios.create() // 创建一个axios的实例
service.interceptors.request.use() // 请求拦截器
service.interceptors.response.use() // 响应拦截器
export default service // 导出axios实例

export function transListToTreeData(list, rootValue) {
  var arr = []
  list.forEach(item => {
    if (item.pid === rootValue) {
      // 找到之后 就要去找 item 下面有没有子节点
      const children = transListToTreeData(list, item.id)
      if (children.length) {
        // 如果children的长度大于0 说明找到了子节点
        item.children = children
      }
      arr.push(item) // 将内容加入到数组中
    }
  })
  return arr
}
