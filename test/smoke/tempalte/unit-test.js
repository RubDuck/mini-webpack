
const glob = require('glob-all')

console.log('冒烟测试开始')

describe('Checking generated html files', () => {
  it('should generate css js files', (done) => {
    const files = glob.sync([
      './dist/index.html'
    ])
    if (files.length > 0) {
      done()
    } else {
      throw new Error('no html!!!!')
    }
  })
})