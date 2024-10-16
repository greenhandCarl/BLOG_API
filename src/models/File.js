import { DataTypes, Model } from 'sequelize'
import sequelize from '../core/db'
import { FOLDER } from '../const/database'
import { v4 as uuidv4 } from 'uuid'

const { INTEGER, UUID, UUIDV4, STRING } = DataTypes

class File extends Model {
    static async createFile (params) {
        const { parentId, title, type } = params
        if (parentId) {
            const parentRes = await File.findOne({
                where: { uuid: parentId }
            })
            if (!parentRes) return Promise.reject('not find the parent file')
        }
        const uuid = uuidv4()
        const contentId = uuidv4()
        const data = {
            uuid,
            parentId,
            title,
            contentId,
            type,
        }
        const res = await File.create(data)
        return res
    }
}

File.init(
    {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        uuid: {
            type: UUID,
            defaultValue: UUIDV4
        },
        parentId: {
            type: UUID,
            defaultValue: null
        },
        contentId: {
            type: UUID,
            defaultValue: null
        },
        title: {
            type: STRING,
            defaultValue: ''
        },
        type: {
            type: STRING,
            defaultValue: FOLDER
        },
        deleted: {
            type: INTEGER,
            defaultValue: 0
        }
    },
    {
        sequelize,
        tableName: 'file'
    }
)

export default File