/* jshint esnext: true */
/* eslint-disable-next-line */
/* eslint-disable */

(function(){
  'use strict';
  const path = require('path');
  const config = require('../config');
  const ExtractTextPlugin = require('extract-text-webpack-plugin');
  const packageConfig = require('../package.json');

  // Add
  const glob = require('glob');
  // 功能: 生成html文件及js文件并把js引入html
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  // 页面的路径, 比如这里views, 那么后面私服加入的文件监控器会从src下面开始监控文件
  const pagePath = path.resolve(__dirname, '../src/views/');
  // End

  exports.assetsPath = function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory;

    return path.posix.join(assetsSubDirectory, _path);
  };

  exports.cssLoaders = function (options) {
    options = options || {};

    const cssLoader = {
      loader: 'css-loader',
      options: {
        sourceMap: options.sourceMap
      }
    };

    const postcssLoader = {
      loader: 'postcss-loader',
      options: {
        sourceMap: options.sourceMap
      }
    };

    // generate loader string to be used with extract text plugin
    function generateLoaders (loader, loaderOptions) {
      const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];

      if (loader) {
        loaders.push({
          loader: loader + '-loader',
          options: Object.assign({}, loaderOptions, {
            sourceMap: options.sourceMap
          })
        });
      }

      // Extract CSS when that option is specified
      // (which is the case during production build)
      if (options.extract) {
        return ExtractTextPlugin.extract({
          use: loaders,
          fallback: 'vue-style-loader'
        });
      } else {
        return ['vue-style-loader'].concat(loaders);
      }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
      css: generateLoaders(),
      postcss: generateLoaders(),
      less: generateLoaders('less'),
      sass: generateLoaders('sass', { indentedSyntax: true }),
      scss: generateLoaders('sass'),
      stylus: generateLoaders('stylus'),
      styl: generateLoaders('stylus')
    };
  };

  // Generate loaders for standalone style files (outside of .vue)
  exports.styleLoaders = function (options) {
    const output = [];
    const loaders = exports.cssLoaders(options);

    for (const extension in loaders) {
      const loader = loaders[extension];
      output.push({
        test: new RegExp('\\.' + extension + '$'),
        use: loader
      });
    }

    return output;
  };

  exports.createNotifierCallback = () => {
    const notifier = require('node-notifier');

    return (severity, errors) => {
      if (severity !== 'error') return;

      const error = errors[0];
      const filename = error.file && error.file.split('!').pop();

      notifier.notify({
        title: packageConfig.name,
        message: severity + ': ' + error.name,
        subtitle: filename || '',
        icon: path.join(__dirname, 'logo.png')
      });
    };
  };
})();
