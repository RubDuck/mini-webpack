const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'production',
  plugins: [

  ],
  devServer: {
    ccontentBase: './dist',
    hot: true,
    status: 'errors-only'
  },
  devtool: 'cheap-source-map'
}

module.exports = merge(baseConfig, devConfig)