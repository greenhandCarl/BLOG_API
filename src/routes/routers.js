import combineRoutes from 'koa-combine-routers'

// 加载目录中的router中间件 还支持多级
const moduleFiles = require.context('./modules', true, /\.js$/)

// reduce拼接koa-combina-routers所需的数据结构 Object[]
const modules = moduleFiles.keys().reduce((items, next) => {
  const value = moduleFiles(next)
  items.push(value.default)
  return items
}, [])

export default combineRoutes(modules)