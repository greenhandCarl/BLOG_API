import Sequelize from 'sequelize'
import { dbConfig } from '../config'

const { dbName, host, port, user, password } = dbConfig

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: console.log,
    timezone: '+08:00',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    define: {
        timestamps: true, // 设置是否生产表中默认字段createAt updateAt
        paranoid: true, // 设置是否生产表中默认字段deleteAt
        underscored: false, // 是否把驼峰转化成下划线形式
    },
})

sequelize.sync({
    alter: true,
    force: false
})

export default sequelize