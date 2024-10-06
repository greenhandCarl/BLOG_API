import sequelize from '../core/db'
import { DataTypes, Model, Op } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'

const { INTEGER, STRING, UUID, UUIDV4, TEXT } = DataTypes

class Article extends Model {
    static getArticles = async (page, size) => {
        const { count, rows } =  await Article.scope('iu').findAndCountAll({
            order: [
                ['updatedAt', 'DESC']
            ],
            where: {
                deleted: {
                    [Op.ne]: 1,
                }                
            },
            offset: (Number(page) - 1) * size,
            limit: Number(size)
        })
        return { count, rows }
    }
    
    static findArticle = async (id) => {
        const res =  await Article.scope('iu').findOne({
            where: { id: Number(id) }
        })
        return res
    }
    
    static updateArticle = async ({ id, content, title, imgs }) => {
		const uuid = uuidv4()
        const res =  await Article.update({
            imgs: imgs.join(';'),
            content,
            title,
            uuid
        }, {
            where: {
                id: Number(id)
            }
        })
        return res
    }

    static createArticle = async ({ content, title, imgs = [] }) => {
		const uuid = uuidv4()
        const res = await Article.create({
            imgs: imgs.join(';'),
            content,
            title,
            uuid,
        })
        return res
    }

    static delArticle = async (id) => {
        const res =  await Article.update(
            { deleted: 1 },
            { where: { id: Number(id) }  }
        )
        return res
    }
}

Article.init(
    {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        uuid: {
            type: UUID,
            defaultValue: UUIDV4,
        },
        content: {
            type: TEXT('long'),
            default: '',
        },
        title: {
            type: STRING,
            default: '',
        },
        imgs: {
            type: TEXT('long'),
        },
        deleted: {
            type: INTEGER,
            defaultValue: 0,
        }
    },
    {
        sequelize,
        tableName: 'article',
        scopes: {
            bh: {
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'deletedAt']
                }
            },
            iu: {
                attributes: {
                    exclude: ['createdAt', 'deletedAt']
                }
            }
        }
    }
)

export default Article