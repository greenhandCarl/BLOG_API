const baseWebpackConfig = require('./webpack.config.base')
const { merge } = require('webpack-merge')

const TerserWebpackPlugin = require('terser-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  // stats: { children: false, warning: false },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          compress: {
            warnings: false,
            // 是否注释掉console
            drop_console: false,
            dead_code: true,
            drop_debugger: true
          },
          output: {
            comments: false,
            beautify: false
          },
          mangle: true,
          sourceMap: false
        },
        parallel: true,
      })
    ]
  }
})

module.exports = webpackConfig