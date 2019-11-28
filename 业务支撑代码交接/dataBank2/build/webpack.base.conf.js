var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

var config = {
  entry: {
    app: [
      "es6-promise/auto",
      './src/main.js'
    ],
    common: [
      'vue-i18n',
      'jquery',
      'highcharts',
      'moment'
    ]
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  cache: true,
  resolve: {
    extensions: ['.js', '.vue', '.json', 'css', 'scss'],
    alias: {
      vue: 'vue/dist/vue.esm.js',
      vue$: 'vue/dist/vue.esm.js',
      src: resolve('src'),
      modules: resolve('src/views/modules'),
      views: resolve('src/views'),
      utils: resolve('src/utils'),
      highchartUtil: resolve('src/utils/highchartUtil.js'),
    }
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory=true',
        include: [
          resolve('src'),
        ],
        exclude: /node_modules/,
        // query: {
        //   presets: ['es2015'],
        //   plugins: [
        //     'transform-es2015-spread',
        //     'transform-runtime',
        //     'transform-class-properties',
        //     ["component", [
        //       {
        //         "libraryName": "element-ui",
        //         "styleLibraryName": "theme-default"
        //       }
        //     ]]
        //   ]
        // }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        // options: {
        //   limit: 10000,
        //   name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        // }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      TweenMax: 'gsap/TweenMax.js',
      Utils: 'utils',
      $: 'jquery',
      jQuery: 'jquery',
      moment: 'moment',
      highchartUtil: 'highchartUtil',
      Highcharts: 'highcharts',
      Api: 'src/services/api'
    })
  ]
}

module.exports = config