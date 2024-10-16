import FileModel from '../models/File'

class FileController {
    async addFile (ctx) {
        const { parentId, title, type } = ctx.request.body
        const res = await FileModel.createFile({ parentId, title, type }).catch((err) => {
            console.log('err', err)
        })
        ctx.body = {
            code: 200,
            data: res,
            success: true,
            mgs: 'create successfully'
        }
    }
}

const fileController = new FileController()

export default fileController