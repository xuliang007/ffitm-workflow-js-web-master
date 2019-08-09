'use strict'
const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MODULE_PATH = path.resolve(__dirname, '../src/flows');
const merge = require('webpack-merge');
const isProd = process.env.NODE_ENV === 'production';
const buildConfig = require('../config').build;

let params;
if (isProd) {
  params = process.argv.slice(2)[0];
} else {
  const p = process.argv[process.argv.length - 1];
  const module = p.match(/^--env.m=(.+)/);
  params = module ? module[1] : undefined;
}
console.log(`${isProd ? "打包" : "启动"}：`, params === undefined ? ' 全量' : ` 模块：${params}`);

exports.entries = () => {
  const entries = {};
  const entryPaths = params === undefined ?  '*/index.js' : `${params}/index.js`;
  glob.sync(entryPaths, {cwd:MODULE_PATH}).forEach((entryPath,a,b,c) => {
    const pathArr = entryPath.split('/');
    const key = pathArr[pathArr.length - 2];
    entries[key] = ['babel-polyfill', path.join(MODULE_PATH, entryPath)];
  });
  return entries;
};

exports.htmlPlugin = () => {
  const templateList = [];
  const templatePaths = params === undefined ? '*/index.ftl' : `${params}/index.ftl`;

  glob.sync(templatePaths, {cwd:MODULE_PATH}).forEach((templatePath) => {
    const match = templatePath.match(/(([\w-]+)\/([\w-]+))\.ftl/);
    const filename = `${match[1]}.${isProd ? 'ftl' : 'html'}`;
    const chunkName = match[2];
    let config = {
      template:  path.join(MODULE_PATH, templatePath),
      filename: isProd ? path.posix.join(buildConfig.assetsRoot, buildConfig.area, filename) : filename,
      chunks: ['vendor', 'fi' , 'workflow', chunkName],
      inject: true
    };
    if (isProd) {
      config = merge(config, {
        chunksSortMode: 'dependency'
      });
    }
    templateList.push(new HtmlWebpackPlugin(config));
  });
  return templateList;
};
