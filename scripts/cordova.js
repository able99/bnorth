/**
 * Copyright (c) 2017, able99
 * All rights reserved.
 *
 * This source code is licensed under MIT.
 */

'use strict';
var fs = require('fs-extra');
var path = require('path');
var spawn = require('cross-spawn');

var argv = require('yargs')
  .options({
    'init': {
      describe: 'support cordova build',
    },
    'id': {
      describe: 'package id for app',
    },
    'name': {
      describe: 'package name for app',
    },
  })
  .implies('init', 'id')
  .implies('init', 'name')
  .help()
  .argv;


var bnorthInPath = path.join('','node_modules','bnorth');
var appPath = process.cwd();
if(appPath.indexOf(bnorthInPath)>=0) {
   process.chdir('../../');
   appPath = process.cwd();
}
var appPackage = require(path.join(appPath,'package.json'));
var appName = appPackage.name;
var bnorthPath = path.join(appPath, bnorthInPath);


if(argv.init) {
  // cordova file
  console.log(`* copy cordova file...`);
  fs.copySync(path.join(bnorthPath, 'templates', 'cordova_project_base'), path.join(appPath));
  var str = fs.readFileSync(path.join(appPath, 'config.xml'));
  str.replace(/{id}/g,argv.id);
  str.replace(/{name}/g,argv.name);
  fs.writeFileSync( path.join(appPath, 'config.xml'), str);

  // package file
  console.log(`* config package...`);
  appPackage.devDependencies = Object.assign(appPackage.devDependencies||{}, {
    "cordova": "^8.0.0",
  });
  appPackage.scripts = Object.assign(appPackage.scripts, {
    "cordova": "cordova",
  });
  fs.writeFileSync(
    path.join(appPath, 'package.json'),
    JSON.stringify(appPackage, null, 2)
  );

  // run 
  console.log(`* npm run...`);
  var proc = spawn.sync('npm', ['i'], {stdio: 'inherit'});
  if (proc.status !== 0) {
    console.error('error!');
    return;
  }
  console.log(`* cordova requirements...`);
  var proc = spawn.sync('npm', ['run', 'cordova', 'requirements'], {stdio: 'inherit'});
  if (proc.status !== 0) {
    console.error('error!');
    return;
  }
}

// show cordova usage
console.log('website: https://cordova.apache.org/');
console.log(`cordova config: config.xml`);
console.log(`cordova build config: build.json`);
console.log();
console.log(`cordova android platform: npm run cordova platform add android`);
console.log(`cordova ios platform: npm run cordova platform add ios`);
console.log(`cordova build: npm run cordova build [android|ios|xxx] [--release]`);
console.log(`cordova run: npm run cordova run [android|ios|xxx] [--device]`);
console.log();
console.log('plugins:');
console.log(`crosswalk : npm run cordova plugin add cordova-plugin-crosswalk-webview`);
console.log(`more : https://cordova.apache.org/plugins/`);
console.log();
console.log('code sign:');
console.log('build.json');
console.log();
console.log('handy plugins');
console.log(`
geo[c]: https://www.npmjs.com/package/cordova-plugin-bmap-geolocation
7niu[c]: https://www.npmjs.com/package/cordova-plugin-qiniu
clearcache[c]: https://www.npmjs.com/package/cordova-plugin-cache
hotfix[c]: https://github.com/nordnet/cordova-hot-code-push
imagepicker[c]: https://www.npmjs.com/package/cordova-plugin-china-picker
`);