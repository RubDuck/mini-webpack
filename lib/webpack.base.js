const  { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  entry: 'index.js',
  output: {
    filename: '[name].js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html', //打包后的文件名
      minify: {
          removeAttributeQuotes: false, //是否删除属性的双引号
          collapseWhitespace: false, //是否折叠空白
      },
  }),
  new FriendlyErrorsWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /.js$/,
        use: ['babel-loader']
      },
      {
        test: /.less$/,
        use: [{
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              require('autoprefixer')({
                overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
              })
            ]
          }
        }, 'css-loader', 'less-loader']
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
  status: 'errors-only'
}