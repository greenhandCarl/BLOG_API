const utils = require('./utils')
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpackConfig = {
    target: 'node',
    entry: {
        server: path.join(utils.APP_PATH, 'app.js')
    },
    resolve: {
        ...utils.getWebpackResolveConfig()
    },
    output: {
        filename: '[name].bundle.js',
        path: utils.DIST_PATH
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: [path.join(utils.APP_PATH, '../mode_modules')]
            }
        ]
    },
    externals: [nodeExternals()],
    plugins: [
        new CleanWebpackPlugin()
    ]
}

module.exports = webpackConfig