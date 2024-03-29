'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env');
const { assetsSubDirectory, assetsPublicPath } = config.build;

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: [
      ...utils.styleLoaders({
        sourceMap: config.build.productionSourceMap,
        extract: true,
        usePostCSS: true
      }),
      {
        test: /\.ftl$/i,
        loader: 'ffitm-fpr-loader'
      }
    ]
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: path.join(config.build.assetsRoot, 'resources', config.build.area),
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? {safe: true, map: {inline: false}}
        : {safe: true}
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    /*new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),*/
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    /*new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),*/
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    /*new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),*/
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'app',
    //   async: 'vendor-async',
    //   children: true,
    //   minChunks: 3
    // }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dll/vendor-manifest.json'),
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dll/fi-manifest.json'),
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dll/workflow-manifest.json'),
    }),
    new AddAssetHtmlPlugin([
      {
        filepath: path.resolve(__dirname, '../dll/workflow/static/js/*.workflow.js'),
        publicPath: `${assetsPublicPath}static/js`,
        outputPath: `${assetsSubDirectory}/js`,
        includeSourcemap: false
      }
    ]),
    new AddAssetHtmlPlugin([
      {
        filepath: path.resolve(__dirname, '../dll/workflow/static/css/*.workflow.css'),
        publicPath: `${assetsPublicPath}static/css`,
        outputPath: `${assetsSubDirectory}/css`,
        typeOfAsset: 'css',
        includeSourcemap: false
      }
    ]),
    new AddAssetHtmlPlugin([
      {
        filepath: path.resolve(__dirname, '../dll/fi/static/js/*.fi.js'),
        publicPath: `${assetsPublicPath}static/js`,
        outputPath: `${assetsSubDirectory}/js`,
        includeSourcemap: false
      }
    ]),
    new AddAssetHtmlPlugin([
      {
        filepath: path.resolve(__dirname, '../dll/fi/static/css/*.fi.css'),
        publicPath: `${assetsPublicPath}static/css`,
        outputPath: `${assetsSubDirectory}/css`,
        typeOfAsset: 'css',
        includeSourcemap: false
      }
    ]),
    new AddAssetHtmlPlugin([
      {
        filepath: path.resolve(__dirname, '../dll/vendor/static/js/*.vendor.js'),
        publicPath: `${assetsPublicPath}static/js`,
        outputPath: `${assetsSubDirectory}/js`,
        includeSourcemap: false
      }
    ]),
    new AddAssetHtmlPlugin([
      {
        filepath: path.resolve(__dirname, '../dll/vendor/static/css/*.vendor.css'),
        publicPath: `${assetsPublicPath}static/css`,
        outputPath: `${assetsSubDirectory}/css`,
        typeOfAsset: 'css',
        includeSourcemap: false
      }
    ]),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['ueditor1_4_3_3/{**/*,*}', '.*']
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../dll/vendor/static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../dll/fi/static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../dll/workflow/static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new webpack.ProvidePlugin({  //引入Jquery
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery':'jquery'
    })

  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
