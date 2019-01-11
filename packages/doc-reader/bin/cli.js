#!/usr/bin/env node
/**
 * Copyright (c) 2017, able99
 * All rights reserved.
 *
 * This source code is licensed under MIT.
 */

'use strict';
const {spawnSync} = require('child_process');
const {join} = require('path');
const {copySync, readFileSync, writeFileSync, existsSync} = require('fs-extra');

const ownMoudles = join(__dirname, '..', 'node_modules');
const ownMoudlesBin = join(__dirname, '..', 'node_modules', '.bin');
process.env.NODE_PATH = process.env.NODE_PATH?(process.env.NODE_PATH+':'+ownMoudles):ownMoudles;
process.env.PATH = process.env.PATH?(process.env.PATH+':'+ownMoudlesBin):ownMoudlesBin;

let srcPath = process.argv[2]||'./src';
let desPath = process.argv[3]||'./docs';
let srcPackagePath = process.argv[4]||'./package.json';
let srcReadmePath = process.argv[5]||'./README.md';
let configPath = join(__dirname, '..', 'jsdoc', 'conf.json');
let templatePath = join(__dirname, '..', 'dist/');
console.log('!startin1 doc', 'srcPath='+srcPath, 'desPath='+desPath, existsSync(srcPackagePath), existsSync(srcReadmePath));

let packageObj;
let readmeStr;
let result = spawnSync('jsdoc', [srcPath, '-c', configPath, '-r', '-X']);
if(existsSync(srcPackagePath)) packageObj = JSON.parse(readFileSync(srcPackagePath).toString()||'{}');
if(existsSync(srcReadmePath)) readmeStr = readFileSync(srcReadmePath).toString();
copySync(templatePath, desPath);
result.error&&console.log(result.error.toString());
console.log(result.stderr.toString());

let obj = JSON.parse(result.stdout.toString());
obj = obj.filter(v=>!v.undocumented&&v.kind!=='package');
obj.forEach(v=>{
  delete v.comment;
  delete v.meta;
})
writeFileSync(join(desPath, 'docs.json'), JSON.stringify({
  package: packageObj&&{
    "name": packageObj.name,
    "version": packageObj.version,
    "description": packageObj.description,
    "keywords": packageObj.keywords,
    "author": packageObj.author,
    "homepage": packageObj.homepage,
    "license": packageObj.license,
  },
  readme: readmeStr,
  doclets: obj,
}, null, 2));