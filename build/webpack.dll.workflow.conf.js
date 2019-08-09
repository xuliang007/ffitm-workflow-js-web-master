'use strict'
const webpack = require('webpack');
const path = require('path');
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const outputPath = path.join(__dirname, '../dll/workflow/static/js');
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  entry: {
    workflow: [
      'ffitm-workflow-ui',
      'ffitm-workflow-ui/dist/workflow-ui.css'
    ]
  },
  output: {
    path: outputPath,
    filename: '[chunkhash:7].[name].js',
    library: "[name]"
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dll/vendor-manifest.json'),
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dll/fi-manifest.json'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': require('../config/prod.env')
    }),
    new webpack.DllPlugin({
      path: path.join(__dirname, '../dll','workflow-manifest.json'),
      name: '[name]',
      context: __dirname
    }),
    new ExtractTextPlugin('../css/[contenthash:7].[name].css'),
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true, map: { inline: false } }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.css/,
        use:ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('../fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('../img/[name].[hash:7].[ext]')
        }
      }]
  }
};
