/* jshint esnext: true */
/* eslint-disable-next-line */
/* eslint-disable */

(function() {
  'use strict';
  const merge = require('webpack-merge');
  const prodEnv = require('./prod.env');

  module.exports = merge(prodEnv, {
    NODE_ENV: '"development"'
  });

})();
