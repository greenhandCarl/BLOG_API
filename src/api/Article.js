
import ArticleModel from '../models/Article'

class Article {
	async getArticles (ctx) {
		const { page, size } = ctx.query;
		if (!page || !size) {
			return ctx.body = {
				code: 200,
				data: null,
				success: false,
				msg: '参数不正确'
			}
		}
		try {
			const res = await ArticleModel.getArticles(page, size)
			const data = {
				count: res.count,
				rows: res.rows.map(item => ({
					...item.toJSON(),
					imgs: item.imgs.split(';')
				}))
			}
			ctx.body = {
				code: 200,
				data: data,
				success: true,
				msg: '查询成功'
			}
		} catch (err) {
			console.log('getArticles err', err)
		}
	}

	async findArticle (ctx) {
		const { id } = ctx.query;
		const res = await ArticleModel.findArticle(id)
		ctx.body = {
			code: 200,
			data: res,
			success: true,
			msg: '查询成功'
		}
	}

	async updateArticle (ctx) {
		const { id, content, title, imgs } = ctx.request.body
		console.log('updateArticle')
		await ArticleModel.updateArticle({ id, content, title, imgs })
		ctx.body = {
			code: 200,
			data: null,
			success: true,
			msg: '修改成功'
		}
	}
	

	async createArticle (ctx) {
		const { content, title, imgs } = ctx.request.body
		await ArticleModel.createArticle({ content, title, imgs })
		ctx.body = {
			data: null,
			success: true,
			msg: '创建成功'
		}
	}

	async delArticle (ctx) {
		const { id } = ctx.request.body
		await ArticleModel.delArticle(id)
		ctx.body = {
			code: 200,
			data: null,
			success: true,
			msg: '删除成功'
		}
	}
}


const article = new Article()

export default article