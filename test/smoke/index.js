const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');

process.chdir(path.join(__dirname, 'tempalte'))

const mocha = new Mocha({
  timeout: '10000ms'
})

rimraf('./dist', () => {
  const prodConfig = require('../../lib/webpack.base');
  webpack(prodConfig, (err, status) => {
    if (err) {
      console.error(err)
      process.exit(2)
    }
    console.log('创建成功')
    mocha.addFile(path.join(__dirname, 'tempalte/unit-test.js'))
    mocha.run()
  })
})
