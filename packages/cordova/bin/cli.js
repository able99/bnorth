#!/usr/bin/env node
/**
 * Copyright (c) 2017, able99
 * All rights reserved.
 *
 * This source code is licensed under MIT.
 */
'use strict';
const path = require('path');
const fs = require('fs-extra');
const xml2js = require('xml2js');
let spawn = require('cross-spawn');

let appPackage;
try{appPackage = require(path.join(process.cwd(),'package.json'))}catch(e){};
let descPath = path.join(process.cwd(), 'cordova');
let templatePath = path.join(__dirname, '..', 'templates');
let srcWWWPath = (appPackage&&appPackage.bnorth&&appPackage.bnorth.outputPath)||'dist';
let templateConfigJson = path.join(templatePath, 'package.json');
let templateConfigXml = path.join(templatePath, 'config.xml');
let templateConfigBuild = path.join(templatePath, 'build.json');
let descWWWPath = path.join(descPath, 'www');
let descPlatformsPath = path.join(descPath, 'platforms');
let descPluginsPath = path.join(descPath, 'plugins');
let descModulesPath = path.join(descPath, 'node_modules');
let descConfigJson = path.join(descPath, 'package.json');
let descConfigXml = path.join(descPath, 'config.xml');
let descConfigBuild = path.join(descPath, 'build.json');
let ownMoudles = path.join(__dirname, '..', 'node_modules');
let ownMoudlesBin = path.join(__dirname, '..', 'node_modules', '.bin');

function runCordova(argv=[], config) {
  process.env.NODE_PATH = process.env.NODE_PATH?(ownMoudles+':'+process.env.NODE_PATH):ownMoudles;
  process.env.PATH = process.env.PATH?(ownMoudlesBin+':'+process.env.PATH):ownMoudlesBin;

  if(argv[0]==='clientbuild'||argv[0]==='clientrun') {
    if(!argv[1]) {console.log('! need waiting server addr'); return 1}
    console.log('# building debug client and client waiting for ' + argv[1]);
    fs.writeFileSync(path.join(descWWWPath, (config.widget.content[0]&&config.widget.content[0].$.scr)||'index.html'), '<html><header><meta http-equiv="refresh" content="0; url='+argv[1]+'" /></header><body></body></html>');
    let result = spawn.sync('npx', ['cordova', argv[0].replace('client',''), ...(argv.slice(2))], { stdio: 'inherit', cwd: descPath });
    if(result===0) console.log('# build up, pls run npx bnorth-cordova serve [port] for debug');
    return result.status;
  } else if(argv[0]==='reset') {
    fs.removeSync(descWWWPath);
    fs.removeSync(descPlatformsPath);
    fs.removeSync(descPluginsPath);
    fs.removeSync(descModulesPath);
    console.log('# reset cordova');
    return 0;
  } else {
    let result = spawn.sync('npx', ['cordova', ...argv], { stdio: 'inherit', cwd: descPath });
    return result.status;
  }
}

function checkCordovaProject(argv) {
  if(!fs.existsSync(descPath)) fs.mkdirSync(descPath);
  fs.removeSync(descWWWPath);
  fs.existsSync(srcWWWPath)&&argv[0]!=='clientrun'&&argv[0]!=='clienbuild'?fs.copySync(srcWWWPath, descWWWPath):fs.mkdirSync(descWWWPath);
  if(!fs.existsSync(descConfigJson)) fs.copySync(templateConfigJson, descConfigJson);
  if(!fs.existsSync(descConfigXml)) fs.copySync(templateConfigXml, descConfigXml);
  if(!fs.existsSync(descConfigBuild)) fs.copySync(templateConfigBuild, descConfigBuild);
  
  let cordovaPackage;
  try{cordovaPackage = require(descConfigJson)}catch(e){};
  if(!cordovaPackage||!cordovaPackage.cordova||!cordovaPackage.cordova.plugins||!cordovaPackage.cordova.plugins['cordova-plugin-whitelist']) runCordova(['plugin', 'add', 'cordova-plugin-whitelist']);

  let parser = new xml2js.Parser();
  let builder = new xml2js.Builder();
  let strConfigXml = fs.readFileSync(descConfigXml).toString();
  let config;
  parser.parseString(strConfigXml, function (err, result) {
    if(err||!result) { console.log('! error', err); return }
    result.widget.$.id = appPackage.id||`able99.bnorth.${appPackage.name}`;
    result.widget.$.version = appPackage.version;
    result.widget.name = appPackage.displayName||appPackage.name;
    result.widget.description = appPackage.description||'';
    result.widget.author = { $: { href: appPackage.homepage||'', email: appPackage.email||'' }, _: appPackage.author||'' }
    if(appPackage.icon) result.widget.icon = { $: { src: path.join('..', appPackage.icon) } }
    result.widget['allow-navigation'] = { $: { href: '*' } }
    fs.writeFileSync(descConfigXml, builder.buildObject(result));
    config = result;
  });

  return config;
}

function run() {
  console.log('# bnroth cordova');
  if(!appPackage) { console.log('!error no npm project'); return -1 }
  let argv = process.argv.slice(2);
  console.log('# bnroth cordova run: ' + argv);
  return runCordova(argv, checkCordovaProject(argv));
}

process.exit(run());
