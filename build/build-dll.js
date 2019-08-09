'use strict'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const type = process.argv.slice(2)[0];
const dll = require('./webpack.dll.vendor.conf')
const fi = require('./webpack.dll.fi.conf')
const wui = require('./webpack.dll.workflow.conf')
const webpackConfig = require('./webpack.dll.'+type+'.conf');

const spinner = ora('building for dll...')
spinner.start()

rm(path.join(__dirname, '..', 'dll/'+type), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: true,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
  })
})
