const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin')
module.exports = {
  mode: 'production',
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
                loader: MiniCssExtractPlugin.loader,
                options: {
                  // hmr: false,
                  publicPath: '../'
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
                loader: MiniCssExtractPlugin.loader,
                options: {
                  // hmr: false,
                  publicPath: '../'
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
      template: './public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true,
        removeScriptTypeAttributes: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    new OptimizeCssnanoPlugin(
      {
        sourceMap: false,
        cssnanoOptions: {
          preset: [
            'default',
            {
              mergeLonghand: false,
              cssDeclarationSorter: false
            }
          ]
        }
      }
    ),
  ]
}