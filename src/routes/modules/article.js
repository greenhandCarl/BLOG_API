import article from '@/controller/Article'

const Router = require('koa-router')

const router = new Router()

router.prefix('/api/article')



router.get('/getArticles', article.getArticles)

router.get('/findArticle', article.findArticle)

router.post('/updateArticle', article.updateArticle)

router.post('/delArticle', article.delArticle)

router.post('/createArticle', article.createArticle)


export default router