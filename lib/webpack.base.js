const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');


const processRoot = process.cwd();

console.log('当前目录', processRoot, '测试资源目录', path.resolve(processRoot, 'src/index.js'))

module.exports = {
  entry: path.resolve(processRoot, 'src/index.js'),
  output: {
    path: path.resolve(processRoot, 'dist'),
    filename: '[name]_[chunkhash:8].js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(processRoot, 'public/index.html'),
      minify: {
          removeAttributeQuotes: false, //是否删除属性的双引号
          collapseWhitespace: false, //是否折叠空白
        },
    }),
    new MiniCssExtractPlugin({
      filename:  'css/[name]_[chunkhash:8].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js|\.jsx$/,
        use: ['babel-loader']
      },
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /.less$/,
        use: [ MiniCssExtractPlugin.loader ,'css-loader', 'less-loader', {
          loader: "postcss-loader"
        }],
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 102400,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: '[name]_[conenthash:8].[ext]'
                }
              }
            }
          }
        ]
      }
    ]
  },
}