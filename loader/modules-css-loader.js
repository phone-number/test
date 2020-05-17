let loaderUtils = require('loader-utils')
let cssLoader = require('css-loader')
function loader(content, map, meta) {
  if (/node_modules.*\.css$/.test(this.resourcePath)) {
    const loaderContext = Object.assign({}, this, {
      query: {}
    })
    return cssLoader.call(loaderContext, content, map, meta)
  }else {
    // console.log('===============' + this.resourceQuery + '====================')
    // console.log('===============' + loaderUtils.getCurrentRequest(this) + '====================')
    let fallback = loaderUtils.getOptions(this).fallback
    const fallbackLoaderContext = Object.assign({}, this, {
      query: fallback.options
    })
    return require(fallback.loader).call(fallbackLoaderContext, content, map, meta)
  }
}
module.exports = loader