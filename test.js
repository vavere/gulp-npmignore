
var gulp = require('gulp');
var debug = require('gulp-debug');
var vinylPaths = require('vinyl-paths');
var del = require('del');
var npmignore = require('./');

var stream = gulp.src('node_modules/**', {read: false})
  .pipe(npmignore())
  .pipe(debug({title: 'del'}))
  .pipe(vinylPaths(del))
stream.on('end', function () {
  console.log('done');
})
stream.resume();