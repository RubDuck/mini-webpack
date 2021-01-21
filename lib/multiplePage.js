const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.multiplePage = () => {
  const entry = {};
  const htmlTemplate = [];
  const entryFiles = glob.sync(path.join(__dirname, '../src/*/index.js'));
  Object.keys(entryFiles).map(res => {
    const currnetPath = entryFiles[res];
    const pathName = currnetPath.match(/src\/(.*)\/index\.js/)[1];
    entry[pathName] = currnetPath;
    htmlTemplate.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `../src/${pathName}/index.html`),
        filename: `${pathName}.html`,
        chunks: [pathName],
      })
    )
  })
  return {
    entry,
    htmlTemplate
  }
}


