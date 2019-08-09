'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  USE_MOCK: process.env.USE_MOCK,
  UEDITOR_PATH: '"/static/"'
})
