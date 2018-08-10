/**
 * Copyright (c) 2017, able99
 * All rights reserved.
 *
 * This source code is licensed under MIT.
 */

'use strict';
'use strict';
var fs = require('fs-extra');
var path = require('path');
var spawn = require('cross-spawn');
var argv = require('yargs')
  .options({
    'init': {
      describe: 'init bnorth app',
    },
    'project': {
      describe: 'template with bnorth components',
    },
    'src': {
      describe: 'set src path, default src'
    },
    'force': {
      describe: 'set src path, default src'
    },
  })
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


if(appPackage.bnorth===true) {
  console.log('is bnorth lib, exit');
  process.exit(0);
}
var isBnorthProject = appPackage.bnorth;


// welcome
//=====================================================
console.log(`------------welcome to bnoth----------------`);
console.log(`bnorth app name=${appName} apppath=${appPath}`);
console.log(`--------------------------------------------`);

// project
//=====================================================
if((argv.init||argv.project)&&(argv.force||!isBnorthProject)){
  console.log(`* generating project file...`);

  // project file
  fs.copySync(path.join(bnorthPath, 'templates', 'project_base'), path.join(appPath));

  // package file
  appPackage.bnorth = {};
  appPackage["bnorth_dev"] = {};
  appPackage["bnorth_proc"] = {};
  appPackage.devDependencies = Object.assign(appPackage.devDependencies||{}, {
    "babel-plugin-add-module-exports": "^0.2.1",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "babel-preset-react-app": "^3.1.1",
    "babel-preset-stage-0": "^6.24.1",
    "babel-preset-stage-1": "^6.24.1",
  });
  appPackage.scripts = {
    "start": "bnorth server",
    "build": "bnorth build",
    "bnorth": "bnorth",
  };
  appPackage.babel = appPackage.babel || {
    "presets": [ "react", "es2015", "stage-0", "stage-1" ],
    "plugins": [
      [ "transform-runtime", { "polyfill": false, "regenerator": true } ],
      "babel-plugin-add-module-exports"
    ]
  };
  appPackage.eslintConfig = appPackage.eslintConfig || {
    "extends": "react-app"
  };
  fs.writeFileSync(
    path.join(appPath, 'package.json'),
    JSON.stringify(appPackage, null, 2)
  );

  // npm install
  console.log(`* npm run...`);
  var proc = spawn.sync('npm', ['i'], {stdio: 'inherit'});
  if (proc.status !== 0) {
    console.error('error!');
    return;
  }
}

// src
//=====================================================
if((argv.init||argv.src)&&(argv.force||!isBnorthProject)){
  console.log(`* generating src file...`);

  // project file
  fs.copySync(path.join(bnorthPath, 'templates', 'src_base'), path.join(appPath));
}

// help
//=====================================================
let str = fs.readFileSync(path.join(bnorthPath, 'templates', 'project_base', 'README.md')).toString();
console.log(`------------bnoth installed-------------`);
console.log(str);
console.log(`----------------------------------------`);
