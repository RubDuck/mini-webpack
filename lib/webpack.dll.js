const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    library: [
      'react',
      'react-dom',
    ]
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, 'build/library'),
    library: '[name]' // 文件名称
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, 'build/library/[name].json')
    })
  ]
}