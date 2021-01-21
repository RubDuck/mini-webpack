const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack5-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const entries = require('./multiplePage');
const glob = require('glob');

const path = require('path');
const webpackProd = require('./webpack.prod');
const webpack = require('webpack');

const PATHS = {
  src: path.join(__dirname, 'src')
}

const Page = entries.multiplePage();

const processRoot = process.cwd();
const smp = new SpeedMeasurePlugin()

module.exports = smp.wrap({
  entry: Page.entry,
  output: {
    path: path.resolve(processRoot, 'dist'),
    filename: '[name]_[chunkhash:8].js',
  },
  // optimization: {
  //   minimizer: [new TerserPlugin()]
  // },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename:  'css/[name]_[chunkhash:8].css'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled', // 不启动展示打包报告的HTTP服务器 也可以启动 直接可以看效果
      generateStatsFile: true // 要生成stats.json文件
    }),
    // new webpack.DllReferencePlugin({
    //   manifest: require('./build/library/library.json')
    // }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
    }),
  ].concat(Page.htmlTemplate),
  module: {
    rules: [
      {
        test: /\.js|\.jsx$/,
        use: [{
          loader: 'thread-loader',
          options: {
            workers: 2
          }
        },'babel-loader']
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
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
              // limit: 10,
              // fallback: {
              //   loader: 'file-loader',
              //   options: {
              //     name: '[name]_[conenthash:8].[ext]'
              //   }
              // }
            }
          }
        ]
      }
    ]
  },
  // resolve: {
  //   // alias: {},
  //   extension: ['.js'],
  // }
})