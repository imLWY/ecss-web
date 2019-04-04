/* jshint esnext: true */
/* eslint-disable-next-line */
/* eslint-disable */

(function() {
  'use strict';
  const merge = require('webpack-merge');
  const devEnv = require('./dev.env');

  module.exports = merge(devEnv, {
    NODE_ENV: '"testing"'
  });

})();
