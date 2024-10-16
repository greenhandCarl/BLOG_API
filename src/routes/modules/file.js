import fileController from '@/controller/File'

const Router = require('koa-router')

const router = new Router()

router.prefix('/api')

router.put('/file', fileController.addFile)

export default router