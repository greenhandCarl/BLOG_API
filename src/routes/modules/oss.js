import oss from '@/controller/Oss'
import Router from 'koa-router'

const router = new Router()

router.prefix('/api/oss')

router.post('/uploadImg', oss.uploadImg)

export default router
