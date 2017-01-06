'use strict';

var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var Q = require('q');
var chalk = require('chalk');
var fsUtils = require("nodejs-fs-utils");
var hooksDir = path.join(__dirname, '..');
var projectDir = path.join(__dirname, '..', '..', '..');

/**
 * 复制hooks目录到项目目录
 */
function copyHooks() {
  let deferred = Q.defer();

  fsUtils.copy(hooksDir + '/hooks', projectDir + '/hooks', function(error, cache) { // copy file or folders
    if (!error) {
      console.log(chalk.green('Hooks copied success!'));
      deferred.resolve();
    } else {
      console.log(chalk.red(error));
      deferred.reject(error);
    }
  });

  return deferred.promise;
}

/**
 * 添加Npm scripts
 */
function addNpmScripts() {
  let pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

  pkg.scripts = pkg.scripts || {};
  pkg.scripts.applypatchmsg = 'node ./hooks/applypatch-msg.js' + (pkg.scripts.applypatchmsg ? ' && ' + pkg.scripts.applypatchmsg : '');
  pkg.scripts.commitmsg = 'node ./hooks/commit-msg.js' + (pkg.scripts.commitmsg ? ' && ' + pkg.scripts.commitmsg : '');
  pkg.scripts.postapplypatch = 'node ./hooks/post-applypatch.js' + (pkg.scripts.postapplypatch ? ' && ' + pkg.scripts.postapplypatch : '');
  pkg.scripts.postcheckout = 'node ./hooks/post-checkout.js' + (pkg.scripts.postcheckout ? ' && ' + pkg.scripts.postcheckout : '');
  pkg.scripts.postcommit = 'node ./hooks/post-commit.js' + (pkg.scripts.postcommit ? ' && ' + pkg.scripts.postcommit : '');
  pkg.scripts.postmerge = 'node ./hooks/post-merge.js' + (pkg.scripts.postmerge ? ' && ' + pkg.scripts.postmerge : '');
  pkg.scripts.postreceive = 'node ./hooks/post-receive.js' + (pkg.scripts.postreceive ? ' && ' + pkg.scripts.postreceive : '');
  pkg.scripts.postrewrite = 'node ./hooks/post-applypatch.js' + (pkg.scripts.postrewrite ? ' && ' + pkg.scripts.postrewrite : '');
  pkg.scripts.postupdate = 'node ./hooks/post-applypatch.js' + (pkg.scripts.postupdate ? ' && ' + pkg.scripts.postupdate : '');
  pkg.scripts.preapplypatch = 'node ./hooks/post-applypatch.js' + (pkg.scripts.preapplypatch ? ' && ' + pkg.scripts.preapplypatch : '');
  pkg.scripts.preautogc = 'node ./hooks/post-applypatch.js' + (pkg.scripts.preautogc ? ' && ' + pkg.scripts.preautogc : '');
  pkg.scripts.precommit = 'node ./hooks/post-applypatch.js' + (pkg.scripts.precommit ? ' && ' + pkg.scripts.precommit : '');
  pkg.scripts.prepush = 'node ./hooks/post-applypatch.js' + (pkg.scripts.prepush ? ' && ' + pkg.scripts.prepush : '');
  pkg.scripts.prerebase = 'node ./hooks/post-applypatch.js' + (pkg.scripts.prerebase ? ' && ' + pkg.scripts.prerebase : '');
  pkg.scripts.prereceive = 'node ./hooks/post-applypatch.js' + (pkg.scripts.prereceive ? ' && ' + pkg.scripts.prereceive : '');
  pkg.scripts.preparecommitmsg = 'node ./hooks/post-applypatch.js' + (pkg.scripts.preparecommitmsg ? ' && ' + pkg.scripts.preparecommitmsg : '');
  pkg.scripts.pushtocheckout = 'node ./hooks/post-applypatch.js' + (pkg.scripts.pushtocheckout ? ' && ' + pkg.scripts.pushtocheckout : '');
  pkg.scripts.update = 'node ./hooks/post-applypatch.js' + (pkg.scripts.update ? ' && ' + pkg.scripts.update : '');

  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
}

copyHooks()
  .then(addNpmScripts)
  .catch((error) => {
    // console.log(chalk.red(error));
  });
