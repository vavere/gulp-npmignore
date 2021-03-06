'use strict';

var through = require('through2');
var gulpmatch = require('gulp-match');

var DIRS = [
'.*',
'test',
'tests',
'support',
'doc',
'docs',
'screenshots',
'example',
'examples',
'benchmark',
'benchmarks',
'completion'
].map(function (g) {return '**/{' + g + ',' + g +'/**}';});

var FILES = [
'.*',
'appveyor.yml',
'component.json',
'composer.json',
'bower.json',
'cakefile',
'makefile',
'makefile.dryice.js',
'gruntfile.js',
'test.js',
'example.js',
'authors',
'changelog',
'contributors',
'*.sh',
'*.ls',
'*.coffee',
'*.svg',
'*.py',
'*.gz',
'*.css',
'*.txt',
'*.html',
'*.md',
'*.markdown',
'*.min.js',
'*.properties',
'*.map',
'*.patch'
].map(function (g) {return  '**/' + g;})
.concat([
'license.*',
'readme.*'
].map(function (g) {return  '!**/' + g;})
);
  
module.exports = function () {
  var dirs = [];

  function inDirs(file) {
    var relative = file.relative;
    return dirs.some(function (d) { 
      return relative.substr(0, d.relative.length) == d.relative; 
    });
  }

  return through.obj(function (file, enc, cb) {

    if (file.stat.isDirectory() && gulpmatch(file, DIRS, {nocase: true})) {
      if (!inDirs(file)) dirs.push(file);
      return cb();
    }
    
    if (!file.stat.isDirectory() && gulpmatch(file, FILES, {nocase: true}))
      return cb(null, inDirs(file) ? null : file);

    cb();
  }, function (cb) {
    dirs.forEach(function(d) {this.push(d)}, this);
    cb();
  });
  
};
