import { DBNAME, DBPORT, DBUSER } from '@/const/database'
import { getEnvMode } from '@/utils/process'
import env from '@/core/env'

export const dbConfig = {
    dbName: DBNAME,
    host: getEnvMode() ? DBHOST : 'localhost',
    port: DBPORT,
    user: DBUSER,
    password: env.DATABASE_PASSWORD
}