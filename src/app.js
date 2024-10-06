import Koa from 'koa'
import path from 'path'
import koaBody from 'koa-body'
import koaJwt from 'koa-jwt'
import koaStatic from 'koa-static'
import koaCors from '@koa/cors'
import KoaJson from 'koa-json'
import koaHelmet from 'koa-helmet'
import compose from 'koa-compose'
import errorHandle from './common/errorHandle'
import routers from './routes/routers'
import { JWT_SECRET } from './config'

const app = new Koa()

const isProdMode = process.env.NODE_ENV === 'production'

const jwt = koaJwt({ secret: JWT_SECRET }).unless({ path: [/^\/static/, /^\/a/] })

// 使用koa-compose集成中间件
const middware = compose([
    koaBody({
        multipart: true,
        formidable: {
            keepExtensions: true,
            maxFieldsSize: 5 * 1024 * 1024
        },
        onError: err => console.log('koaBody err', err)
    }),
    koaStatic(path.join(__dirname, '../static')),
    koaCors(),
    KoaJson({ pretty: false, param: 'pretty' }),
    koaHelmet(),
    errorHandle,
    jwt
])

const port = isProdMode ? 12005 : 3080

app.use(middware)
app.use(routers())

app.listen(port, () => {
    console.log(`server is running at port ${port}...`)
})
