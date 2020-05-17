const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin =require('copy-webpack-plugin')
let { resolve } = require('./utils')
module.exports = {
  entry: {
    app: ['./src/main.js']
  },
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    path: resolve('dist'),
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@': resolve('src'),
      '_c': resolve('src/components')
    },
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      /* config.optimization.minimizer('terser') */
      new TerserPlugin(
        {
          terserOptions: {
            compress: {
              arrows: false,
              collapse_vars: false,
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true
            },
            mangle: {
              safari10: true
            }
          },
          sourceMap: true,
          cache: true,
          parallel: true,
          extractComments: false
        }
      )
    ]
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // 图片处理
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 4,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      // svg处理
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      // 字体处理
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 4,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      // js处理
      {
        test: /\.m?jsx?$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    // 设置全局环境变量，在package命令中添加cross-env NODE_ENV=development设置环境变量 
    // 需要安装cross-env 解决跨平台设置，不然window会报错
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BASE_URL: '"/"'
      }
    }),
    // 这个插件是必须的！ 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。
    // 例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [
        { from: resolve('public'), to: resolve('dist'), toType: 'dir' },
      ]
    })
  ]
}