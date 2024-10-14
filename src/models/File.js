import { Datatypes, Model } from 'sequelize'
import sequelize from '../core/db'
import { FOLDER } from '../const/database'

const { INTEGER, UUID, UUIDV4, String } = Datatypes

class File extends Model {

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
            type: String,
            defaultValue: ''
        },
        type: {
            type: String,
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