/**
 * Git-hooks
 */

'use strict';

var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var Q = require('q');
var chalk = require('chalk');
var fsUtils = require("nodejs-fs-utils");
var hooksDir = path.join(__dirname, '..');
var projectDir = path.join(__dirname, '..', '..', '..');

// Hooks Map
// Git hook | Npm script
var hooksMap = {
  applypatchmsg: 'applypatch-msg',
  commitmsg: 'commit-msg',
  postapplypatch: 'post-applypatch',
  postcheckout: 'post-checkout',
  postcommit: 'post-commit',
  postmerge: 'post-merge',
  postreceive: 'post-receive',
  postrewrite: 'post-rewrite',
  postupdate: 'post-update',
  preapplypatch: 'pre-applypatch',
  preautogc: 'pre-auto-gc',
  precommit: 'pre-commit',
  prepush: 'pre-push',
  prerebase: 'pre-rebase',
  prereceive: 'pre-receive',
  preparecommitmsg: 'prepare-commit-msg',
  pushtocheckout: 'push-to-checkout',
  update: 'update',
};

/**
 * 复制hooks目录至项目目录
 */
function copyHooks() {
  let deferred = Q.defer();

  fsUtils.copy(hooksDir + '/hooks', projectDir + '/hooks', function(error, cache) { // copy file or folders
    if (!error) {
      console.log(chalk.cyan('Hooks copied!'));
      deferred.resolve();
    } else {
      deferred.reject(error);
    }
  });

  return deferred.promise;
}

/**
 * 添加Npm scripts
 */
function addNpmScripts() {
  let deferred = Q.defer();

  if (fs.existsSync('package.json')) {
    let pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

    pkg.scripts = pkg.scripts || {};

    for (let key in hooksMap) {
      if (hooksMap.hasOwnProperty(key)) {
        pkg.scripts[key] = 'node ./hooks/' + hooksMap[key] + '.js' + (pkg.scripts[key] ? ' && ' + pkg.scripts[key] : '');
      }
    }

    fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));

    deferred.resolve();
  } else {
    deferred.reject('Could not find package.json!');
  }

  return deferred.promise;
}

// node ./node_modules/git-hooks/bin/install.js
// git init && npm install https://github.com/yangjiqiao86/git-hooks.git\#v1.0.0 --force
copyHooks()
  .then(addNpmScripts)
  .then(() => {
    console.log(chalk.green('Hooks install success!'));
  })
  .catch((error) => {
    console.log(chalk.red(error));
  });
