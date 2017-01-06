// var fs = require('fs')
// var path = require('path')
// var isCI = require('is-ci')
// var husky = require('husky')

// if (isCI) {
//   console.log('\033[4;36m%s\033[0m', 'husky')
//   console.log('CI detected, skipping Git hooks installation')
//   return
// }

// console.log('\033[4;36m%s\033[0m', 'husky')
// console.log('setting up hooks')

// var huskyDir = path.join(__dirname, '..')
// husky.installFrom(huskyDir)


// git init && npm install https://github.com/yangjiqiao86/git-hooks.git\#v1.0.0 --force




'use strict';

var fs = require('fs');
var path = require('path');
var fsUtils = require("nodejs-fs-utils");
var hooksDir = path.join(__dirname, '../');
var projectDir = path.join(__dirname, '../../../');

// __dirname: /Users/liyongkai/Workspace/github.com/yangjiqiao86/git-hooks-test/node_modules/git-hooks/bin
// __filename: /Users/liyongkai/Workspace/github.com/yangjiqiao86/git-hooks-test/node_modules/git-hooks/bin/install.js
// console.log('__dirname: ' + __dirname + '');
// console.log('__filename: ' + __filename + '');

// hooksDir: /Users/liyongkai/Workspace/github.com/yangjiqiao86/git-hooks-test/node_modules/git-hooks/
// projectDir: /Users/liyongkai/Workspace/github.com/yangjiqiao86/git-hooks-test/
console.log('hooksDir: ' + hooksDir + '');
console.log('projectDir: ' + projectDir + '');


// copy file or folders
fsUtils.copy(hooksDir + '/hooks', projectDir, function(err, cache) {
  if (!err) {
    console.log('Copied !');
  } else {
    console.error('Error', err)
  }
});

