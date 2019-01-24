/**
 * Copyright (c) 2017, able99
 * All rights reserved.
 *
 * This source code is licensed under MIT.
 */

'use strict';
const fs = require('fs-extra');
const path = require('path');
const spawn = require('cross-spawn');
const argv = require('yargs')
  .options({
    'template': {
      alias: 't',
      default: 'base',
      describe: 'select template',
    },
    'local': {
      alias: 'l',
      type: 'boolean',
      describe: 'install local bnorth',
    },
  })
  .help()
  .argv;

const appName = argv._[0]||path.basename(process.cwd());
const templatePath = `${__dirname}/../templates`;


// welcome
// -----------------------
console.log('------------welcome to bnoth----------------');
console.log(`bnorth app name=${appName} template=${argv.template} local=${argv.local}`);
console.log();


// project
// -----------------------
console.log('------------init project----------------');
let appPath = process.cwd();
if(argv._[0]){
  console.log('* create folder...');
  fs.mkdirSync(appName);
  process.chdir(appName);
  appPath = process.cwd();
  console.log('* OK');
  console.log();
}

console.log('* generating project file...');
fs.copySync(path.join(templatePath, `project_${argv.template}`), '.');
fs.copySync(path.join(templatePath, `project_${argv.template}`, '.gitignore'), './.gitignore');
let appPackage = require(`${appPath}/package.json`);
appPackage.name = appName;
fs.writeFileSync(path.join('package.json'), JSON.stringify(appPackage, null, 2));
console.log('* OK');
console.log();

console.log('* generating src file...');
fs.copySync(path.join(templatePath, `src_${argv.template}`), '.');
console.log('* OK');
console.log();

console.log('* run npm install...');
var proc = spawn.sync('npm', ['install', 
  argv.local?(path.join(__dirname,'..','..','build')):'@bnorth/build',
  argv.local?(path.join(__dirname,'..','..','core')):'@bnorth/core', 
], {stdio: 'inherit'});
if (proc.status !== 0) {
  console.log('* ERROR:'+proc.status);
}else{
  console.log('* OK');
}
console.log();

// installed
// -----------------------
console.log('------------bnoth installed----------------');
let str = fs.readFileSync(path.join('README.md')).toString();
console.log(str);
console.log();