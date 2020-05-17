const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  module: {
    rules: [
      // css处理
      {
        test: /\.css$/,
        oneOf: [
          // 处理vue 文件中的<tyle module>
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              }
            ]
          },
          // 处理普通的css，类名不做改变
          {
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}