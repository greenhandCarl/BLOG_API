const isProd = process.env.NODE_ENV === 'production'

export const JWT_SECRET = '&V05k2TlJ5Mn2y!u'

export const dbConfig = {
    dbName: 'blog',
    host: isProd ? '47.94.59.49' : 'localhost',
    port: 3306,
    user: 'root',
    password: isProd ? 'hero511252519' : '3971eb1e-f900-4880-b76b-8f4ed8967fa1'
}