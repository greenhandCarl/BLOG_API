const baseWebpackConfig = require('./webpack.config.base')
const { merge } = require('webpack-merge')

const webpackConfig = merge(
    baseWebpackConfig,
    {
        devtool: 'eval-source-map',
        mode: 'development',
        stats: { children: false }
    }
)

module.exports = webpackConfig