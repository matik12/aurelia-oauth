var path = require('path');

var appRoot = 'src/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.ts',
  html: appRoot + '**/*.html',
  style: 'styles/**/*.css',
  output: 'dist/',
  doc:'./doc',
  dtsSrc: [
    'typings/**/*.ts', 
    'custom_typings/**/*.ts', 
    './jspm_packages/**/*.d.ts'
  ]
};
